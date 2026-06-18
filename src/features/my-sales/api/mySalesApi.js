import axios from '@/lib/axios';

export async function getMySalesCards(params = {}) {
  const { search, grade, genre, soldOut, page = 1, limit = 9 } = params;

  const query = new URLSearchParams();
  if (search) query.append('search', search);
  if (grade) query.append('grade', grade);
  if (genre) query.append('genre', genre);
  if (soldOut) query.append('soldOut', soldOut);
  query.append('page', page);
  query.append('limit', limit);

  const accessToken = localStorage.getItem('accessToken');

  const response = await axios.get(`/users/sales?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
