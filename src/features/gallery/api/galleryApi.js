import client from '@/lib/axios';

/**
 * 마켓플레이스 판매 카드 목록 조회 API
 * @param {Object} params - 검색, 필터, 정렬, 페이지네이션 파라미터
 */
export const getMyCards = async ({
  search,
  grade,
  genre,
  page = 1,
  limit = 9,
}) => {
  const query = new URLSearchParams();

  if (search) query.append('search', search);
  if (grade) query.append('grade', grade);
  if (genre) query.append('genre', genre);

  query.append('page', page);
  query.append('limit', limit);

  const response = await client.get(`/users/me/cards?${query.toString()}`);
  return response.data;
};
