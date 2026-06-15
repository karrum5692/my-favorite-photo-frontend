'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import FilterBar from '../../../features/marketplace/components/FilterBar';
import { useMarketplace } from '../../../features/marketplace/hooks/useMarketplace';
import '../../../styles/market.css';
import Button from '@/components/ui/Button';
import PhotoCardGrid from '../../../features/marketplace/components/PhotoCardGrid';
import LoginRequiredModal from '../../../features/marketplace/components/LoginRequiredModal';
import SaleModal from '../../../features/marketplace/components/SaleModal';

export default function MarketplacePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });
  // 로그인 안내
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // 판매 등록 모달 상태
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // 판매하기 버튼 클릭 핸들러
  const handleSellButtonClick = () => {
    const currentToken = localStorage.getItem('accessToken');

    if (!currentToken) {
      // 로그아웃되어 토큰이 없다면 즉시 "로그인 필요 모달"
      setIsLoginModalOpen(true);
      setIsSaleModalOpen(false); // 만약 열려있던 판매창이 있다면 닫아주는 방어 코드
    } else {
      // 로그인 상태여서 토큰이 있다면 진짜 "판매 등록 모달"
      setIsSaleModalOpen(true);
    }
  };
  // 로그인이 안되어있으면 확인 누르면 로그인창 띄우기
  const handleGoToLogin = () => {
    setIsLoginModalOpen(false);
    router.push('/login');
  };

  const handleResetMarketplace = () => {
    setSearch('');
    setOrderBy('latest');
    setActiveFilter({ type: '', value: '' });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMarketplace({ search, activeFilter, orderBy, limit: 9 });

  const loadMoreRef = useRef(null);

  const filterCounts = data?.pages?.[0]?.filterCounts || {
    grade: {},
    genre: {},
    status: {},
  };

  const allCards = data?.pages.flatMap((page) => page.list || []) || [];

  const formattedCards = allCards.map((card) => ({
    ...card,
    nickname: card.sellerNickname,
    quantity: card.remainQuantity,
    totalQuantity: card.totalQuantity,
  }));

  //  [수정] IntersectionObserver 무한 스크롤 트리거 로직 최적화
  useEffect(() => {
    // 다음 페이지가 없거나 이미 로딩 중이면 감지 생략
    if (!hasNextPage || isFetchingNextPage) return;

    const currentTarget = loadMoreRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // threshold를 넘어서 화면에 트리거가 노출되는 순간 바로 다음 데이터 요청
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // 브라우저 뷰포트 기준
        threshold: 0.1,
        rootMargin: '100px', //  스크롤이 바닥에 닿기 100px 전에 미리 다음 장을 로드하여 끊김 현상 방지
      }
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
    //  데이터 배열이나 상태가 변경될 때마다 옵저버 위치를 정확하게 리프레시하도록 의존성 주입
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, formattedCards.length]);

  return (
    <div className="marketplace-container">
      <main className="marketplace-content">
        {/*  PC/태블릿 상단 타이틀 구역  */}
        <section className="marketplace-header-section">
          <h1
            className="marketplace-title hover:opacity-80 "
            onClick={handleResetMarketplace}
          >
            마켓플레이스
          </h1>

          {/* PC 우측 상단 판매하기 버튼 배치 */}
          <div className="marketplace-sell-btn pc-only-btn">
            <Button
              variant="primary"
              height="60"
              onClick={handleSellButtonClick}
            >
              나의 포토카드 판매하기
            </Button>
          </div>
        </section>

        {/* 시안 연동 검색 및 드롭다운 필터 바 (테두리 제거 및 인라인 정렬 구역) */}
        <section className="marketplace-controls">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            search={search}
            onSearchChange={setSearch}
            orderBy={orderBy}
            onOrderByChange={setOrderBy}
            filterCounts={filterCounts}
            totalCount={data?.pages?.[0]?.totalCount || 0}
          />
        </section>

        {/*  포토카드 그리드 리스트 판 구역 */}
        <section className="photocard-grid-layout mt-6">
          {status === 'pending' ? (
            <div className="text-center py-20 text-gray-500 w-full col-span-full">
              로딩 중...
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-20 text-red-500 w-full col-span-full">
              데이터 요청 실패 (400/500 에러)
            </div>
          ) : formattedCards.length === 0 ? (
            <div className="text-center py-20 text-gray-500 w-full col-span-full">
              등록된 포토카드가 없습니다.
            </div>
          ) : (
            <PhotoCardGrid cards={formattedCards} />
          )}
        </section>

        {/* 무한스크롤 트리거 센서 구역 */}
        <div
          ref={loadMoreRef}
          className="infinite-scroll-trigger py-14 text-center text-sm text-gray-500"
          style={{ minHeight: '30px', width: '100%' }}
        >
          {isFetchingNextPage ? (
            <span className="animate-pulse">
              더 많은 포토카드 불러오는 중...
            </span>
          ) : hasNextPage ? (
            '스크롤하여 더 보기'
          ) : (
            '모든 카드를 불러왔습니다.'
          )}
        </div>

        {/*  모바일 하단 sticky 고정형 판매 버튼 구역 */}
        <div className="marketplace-sell-btn mobile-only-sticky-btn">
          <Button variant="primary" height="60" onClick={handleSellButtonClick}>
            나의 포토카드 판매하기
          </Button>
        </div>

        {/* 로그인이 필요합니다 안내 모달 */}
        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onConfirm={handleGoToLogin}
        />

        {/*  로그인 성공 시 열리는 진짜 판매 등록 모달 */}
        {isSaleModalOpen && (
          <SaleModal
            isOpen={isSaleModalOpen}
            onClose={() => setIsSaleModalOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
