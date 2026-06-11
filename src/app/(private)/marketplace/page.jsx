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

  // 마켓플레이스 리셋
  const handleResetMarketplace = () => {
    setSearch('');
    setOrderBy('latest');
    setActiveFilter({ type: '', value: '' });
  };

  // 1. 무한 스크롤 데이터 페칭 훅 (activeFilter 객체를 통째로 전달)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMarketplace({ search, activeFilter, orderBy, limit: 9 });

  // 2. 무한 스크롤 트리거 관찰 센서 설정
  const loadMoreRef = useRef(null);

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

  // 3. 백엔드 서비스 응답인 'list' 필드에서 안전하게 추출하여 병합
  const allCards = data?.pages.flatMap((page) => page.list || []) || [];

  // 🌟 백엔드 가공 변수(sellerNickname, remainQuantity)를 UI 규격에 맞게 매핑
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
            마켓플레이스
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
