'use client';

import { useState } from 'react';
import { useMySales } from '../../../features/my-sales/hooks/useMySales';
import MySalesGrid from '../../../features/my-sales/components/MySalesGrid';
import MySalesFilterBar from '../../../features/my-sales/components/MySalescardFilterBar';
import '../../../styles/mysale.css';

const GRADE_OPTIONS = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];

const GRADE_COLOR = {
  COMMON: '#EFFF04',
  RARE: '#29C9F9',
  SUPER_RARE: '#A77EFF',
  LEGENDARY: '#FF2A6A',
};

const GRADE_LABEL = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER RARE',
  LEGENDARY: 'LEGENDARY',
};

export default function MySalesPage() {
  const {
    cards,
    allCounts,
    gradeCount,
    totalPages,
    isLoading,
    error,
    filters,
    updateFilter,
    setPage,
    nickname,
    resetFilters,
  } = useMySales();

  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilter('search', searchInput);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-gray-400">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="my-sales-container">
      <main className="my-sales-content">
        <section>
          {/* PAGE TITLE */}
          <h1 className="my-sales-title" onClick={resetFilters}>
            나의 판매 포토카드
          </h1>
          <div className="my-sales-divider" />

          {/* SUMMARY */}
          <div className="my-sales-summary">
            <p className="my-sales-summary-text">
              {nickname || '유저'}님이 보유한 포토카드{' '}
              <strong>({allCounts}장)</strong>
            </p>

            {/* GRADE BADGES */}
            <div className="my-sales-grade-badges">
              {GRADE_OPTIONS.map(
                (g) =>
                  gradeCount[g] > 0 && (
                    <span
                      key={g}
                      className="my-sales-grade-badge"
                      style={{
                        color: GRADE_COLOR[g],
                        borderColor: GRADE_COLOR[g],
                      }}
                    >
                      {GRADE_LABEL[g]} {gradeCount[g]}장
                    </span>
                  )
              )}
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <MySalesFilterBar
          filters={filters}
          updateFilter={updateFilter}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />

        {/* CARD GRID */}
        <MySalesGrid cards={cards} isLoading={isLoading} />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="my-sales-pagination">
            <button
              onClick={() => setPage(Math.max(1, filters.page - 1))}
              disabled={filters.page === 1}
              className="my-sales-page-btn"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`my-sales-page-btn ${p === filters.page ? 'active' : ''}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(Math.min(totalPages, filters.page + 1))}
              disabled={filters.page === totalPages}
              className="my-sales-page-btn"
            >
              다음
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
