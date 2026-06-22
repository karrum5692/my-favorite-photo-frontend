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

    //백엔드가 리턴하는 실제 데이터 구조인 최상위 hasNextPage와 매핑
    getNextPageParam: (lastPage, allPages) => {
      // 백엔드 서비스(findMarketCards)가 return { list, totalCount, hasNextPage } 구조로 직접 주기 때문에
      // meta를 거치지 않고 바로 lastPage.hasNextPage를 읽어야 합니다.
      const hasNextPage = lastPage?.hasNextPage;

      // 다음 페이지가 있다면 현재까지 쌓인 페이지 배열 길이 + 1을 다음 pageParam으로 전달
      return hasNextPage ? allPages.length + 1 : undefined;
    },

    staleTime: 1000 * 2, // 2초 동안만 캐시 유지 (화면 깜빡임 방지용)
  });
}
