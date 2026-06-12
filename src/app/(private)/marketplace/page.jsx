'use client';

import React, { useState, useEffect, useRef } from 'react';
import FilterBar from '../../../features/marketplace/components/FilterBar';
import { useMarketplace } from '../../../features/marketplace/hooks/useMarketplace';
import '../../../styles/market.css';
import Button from '@/components/ui/Button';
import PhotoCardGrid from '../../../features/marketplace/components/PhotoCardGrid';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('latest');
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });

  const handleResetMarketplace = () => {
    setSearch('');
    setOrderBy('latest');
    setActiveFilter({ type: '', value: '' });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMarketplace({ search, activeFilter, orderBy, limit: 9 });

  const loadMoreRef = useRef(null);

  // 💡 [수정] 무한 스크롤 첫 페이지 데이터 등에서 백엔드가 내려준 전체 갯수 통계(filterCounts)를 안전하게 추출합니다.
  const filterCounts = data?.pages?.[0]?.filterCounts || {
    grade: {},
    genre: {},
    status: {},
  };

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = loadMoreRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allCards = data?.pages.flatMap((page) => page.list || []) || [];

  const formattedCards = allCards.map((card) => ({
    ...card,
    nickname: card.sellerNickname,
    quantity: card.remainQuantity,
    totalQuantity: card.totalQuantity,
  }));

  return (
    <div className="marketplace-container">
      <main className="marketplace-content">
        <section className="marketplace-header-section">
          <h1
            className="marketplace-title cursor-pointer select-none hover:opacity-80 transition-opacity"
            onClick={handleResetMarketplace}
          >
            최애의포토
          </h1>
          <div className="space-y-2">
            <div className="marketplace-sell-btn">
              <Button variant="primary" height="60">
                나의 포토카드 판매하기
              </Button>
            </div>
          </div>
        </section>

        <section className="marketplace-controls">
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            search={search}
            onSearchChange={setSearch}
            orderBy={orderBy}
            onOrderByChange={setOrderBy}
            filterCounts={filterCounts} // 👈 [추가] 백엔드에서 받은 카운트 데이터를 주입합니다.
          />
        </section>

        {/* 📦 백엔드 실시간 연동 포토카드 그리드 판 구역 */}
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

        {/* 🔄 무한스크롤 관찰 센서 인디케이터 */}
        <div
          ref={loadMoreRef}
          className="infinite-scroll-trigger py-10 text-center text-sm text-gray-500"
        >
          {isFetchingNextPage
            ? '더 많은 포토카드 불러오는 중...'
            : hasNextPage
              ? '스크롤하여 더 보기'
              : '모든 카드를 불러왔습니다.'}
        </div>
      </main>
    </div>
  );
}
