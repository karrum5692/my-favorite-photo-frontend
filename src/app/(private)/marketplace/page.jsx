'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
// 🚀 1. TanStack Query에서 useQueryClient 임포트 추가
import { useQueryClient } from '@tanstack/react-query';
import FilterBar from '../../../features/marketplace/components/FilterBar';
import { useMarketplace } from '../../../features/marketplace/hooks/useMarketplace';
import '../../../styles/market.css';
import Button from '@/components/ui/Button';
import PhotoCardGrid from '../../../features/marketplace/components/PhotoCardGrid';
import LoginRequiredModal from '../../../features/marketplace/components/LoginRequiredModal';
import SaleModal from '../../../features/marketplace/components/SaleModal';

export default function MarketplacePage() {
  const router = useRouter();
  const queryClient = useQueryClient(); // 🚀 2. queryClient 인스턴스 생성
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });
  // 로그인 안내
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // 판매 등록 모달 상태
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);

  // 🚀 3. 상세 페이지를 갔다가 돌아온 경우에만 콕 집어서 새로고침(프리즈마 DB 재요청)하는 로직
  useEffect(() => {
    const cameFromDetail = sessionStorage.getItem('visitedDetail');

    if (cameFromDetail === 'true') {
      // 2분 캐시 타이머를 깨부수고 무조건 최신 데이터를 새로 가져옵니다.
      queryClient.invalidateQueries({ queryKey: ['marketCards'] });

      // 재방문 무한 루프 방지를 위해 확인된 티켓은 즉시 삭제합니다.
      sessionStorage.removeItem('visitedDetail');
    }
  }, [queryClient]);

  // 판매하기 버튼 클릭 핸들러
  const handleSellButtonClick = () => {
    const currentToken =
      localStorage.getItem('accessToken') || localStorage.getItem('token');

    if (!currentToken) {
      setIsLoginModalOpen(true);
      setIsSaleModalOpen(false);
    } else {
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

  // 🎯 카드의 상태를 포맷팅할 때 매진 여부(isSoldOut) 조건식도 미리 정의합니다.
  const formattedCards = allCards.map((card) => {
    const isSoldOut = card.remainQuantity === 0 || card.status === 'SOLD';
    return {
      ...card,
      nickname: card.sellerNickname,
      quantity: card.remainQuantity,
      totalQuantity: card.totalQuantity,
      isSoldOut, // Grid 내부로 넘겨줄 플래그 추가
    };
  });

  // 🎯 카드 클릭 핸들러 수정
  const handleCardClick = (card) => {
    // 1. 매진되었거나 SOLD 상태라면 클릭 이벤트를 완전히 무시합니다.
    if (card.isSoldOut) return;

    // 2. 비로그인 유저인 경우 로그인 모달 표시
    const isLoggedIn =
      typeof window !== 'undefined' &&
      !!(localStorage.getItem('accessToken') || localStorage.getItem('token'));

    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    // 🚀 4. [수정] 정상 이동 직전에 "나 상세페이지 간다!" 티켓 발급
    sessionStorage.setItem('visitedDetail', 'true');
    router.push(`/marketplace/${card.id}`);
  };

  // IntersectionObserver 무한 스크롤 트리거 로직
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const currentTarget = loadMoreRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, formattedCards.length]);

  return (
    <div className="marketplace-container">
      <main className="marketplace-content">
        {/* PC/태블릿 상단 타이틀 구역 */}
        <section className="marketplace-header-section">
          <h1 className="marketplace-title" onClick={handleResetMarketplace}>
            마켓플레이스
          </h1>

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

        {/* 검색 및 필터 바 */}
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

        {/* 포토카드 그리드 리스트 판 구역 */}
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
            <PhotoCardGrid
              cards={formattedCards.map((card) => ({
                ...card,
                isClickable: !card.isSoldOut,
                onClick: () => handleCardClick(card),
              }))}
              onUnauthorizedClick={() => setIsLoginModalOpen(true)}
            />
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

        {/* 모바일 하단 sticky 고정형 판매 버튼 구역 */}
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

        {/* 로그인 성공 시 열리는 진짜 판매 등록 모달 */}
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
