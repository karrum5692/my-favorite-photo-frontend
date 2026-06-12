'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getMarketCards } from '../api/marketplaceApi';

export function useMarketplace(params) {
  const { search, orderBy, activeFilter, limit = 9 } = params || {};

  // 백엔드 구조에 맞게 activeFilter 분해 (단일 필터 보장)
  const grade = activeFilter?.type === 'grade' ? activeFilter.value : undefined;
  const genre = activeFilter?.type === 'genre' ? activeFilter.value : undefined;
  const status =
    activeFilter?.type === 'status' ? activeFilter.value : undefined;

  return useInfiniteQuery({
    // 🌟 쿼리 키 동기화: 백엔드 파라미터 구조와 1:1 매칭
    queryKey: ['marketCards', { search, grade, genre, status, orderBy, limit }],

    queryFn: ({ pageParam = 1 }) =>
      getMarketCards({
        search,
        grade,
        genre,
        status,
        orderBy,
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    // 백엔드 서비스 리턴 스펙({ list, totalCount, hasNextPage }) 동기화
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage = lastPage?.hasNextPage;
      return hasNextPage ? allPages.length + 1 : undefined;
    },

    staleTime: 1000 * 60 * 2, // 2분간 fresh 상태 유지
  });
}
