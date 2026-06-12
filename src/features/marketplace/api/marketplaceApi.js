import client from '@/lib/axios';

/**
 * 마켓플레이스 판매 카드 목록 조회 API
 * @param {Object} params - 검색, 필터, 정렬, 페이지네이션 파라미터
 */
export const getMarketCards = async ({
  search,
  grade,
  genre,
  status,
  orderBy,
  page = 1,
  limit = 9,
}) => {
  const query = new URLSearchParams();

  if (search) query.append('search', search);
  if (grade) query.append('grade', grade);
  if (genre) query.append('genre', genre);
  if (status) query.append('status', status); // SELLING 또는 SOLD
  if (orderBy) query.append('orderBy', orderBy);

  query.append('page', page);
  query.append('limit', limit);

  const response = await client.get(`/market/cards?${query.toString()}`);
  return response.data; // { success: true, data: [...], meta: {...} }
};
