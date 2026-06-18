'use client';

import { useState, useEffect, useCallback } from 'react';
import { getMySalesCards } from '../api/mySalesApi';

export function useMySales() {
  const [cards, setCards] = useState([]);
  const [allCounts, setAllCounts] = useState(0);
  const [nickname, setNickname] = useState('');
  const [gradeCount, setGradeCount] = useState({
    COMMON: 0,
    RARE: 0,
    SUPER_RARE: 0,
    LEGENDARY: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    grade: '',
    genre: '',
    soldOut: '',
    page: 1,
    limit: 9,
  });

  // [수정] 외부 fetchCards 함수를 삭제하고, useEffect 내부에서 직접 데이터를 호출하도록 통합했습니다.
  useEffect(() => {
    let isCancelled = false; // 클린업 플래그 (이전 요청 취소용)

    async function fetchCards() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMySalesCards(filters);

        // 컴포넌트가 언마운트되었거나 요청 도중 filters가 바뀌었다면 state 업데이트를 차단합니다.
        if (!isCancelled) {
          setCards(data.salesCard || []);
          setAllCounts(data.allCounts || 0);
          setNickname(data.nickname || '');
          setGradeCount(
            data.gradeCount || {
              COMMON: 0,
              RARE: 0,
              SUPER_RARE: 0,
              LEGENDARY: 0,
            }
          );
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchCards();

    // 클린업 함수: 사용자가 필터를 연속으로 빠르게 클릭했을 때 데이터가 꼬이는 현상을 방지합니다.
    return () => {
      isCancelled = true;
    };
  }, [filters]); // 주석 없이도 ESLint가 완벽하게 통과하는 정석 구조입니다.

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      grade: '',
      genre: '',
      soldOut: '',
      page: 1,
      limit: 9,
    });
  }, []);

  return {
    cards,
    allCounts,
    gradeCount,
    totalPages,
    isLoading,
    error,
    filters,
    updateFilter,
    setPage,
    resetFilters,
    nickname,
  };
}
