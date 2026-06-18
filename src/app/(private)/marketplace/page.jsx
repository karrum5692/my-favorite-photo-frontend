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

  // 🎯 [수정] 카드 클릭 핸들러에서 매진 상태 확인 후 이동 방어
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

    // 3. 정상 이동
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
            /* 🎯 Grid 내부에 클릭 인터셉트 함수와 상태 플래그를 안정적으로 주입합니다. */
            <PhotoCardGrid
              cards={formattedCards.map((card) => ({
                ...card,
                // 매진되었으면 마우스 커서 스타일도 비활성화 처리되도록 밸류 조정
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
