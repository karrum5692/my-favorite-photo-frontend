import client from '@/lib/axios';

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

  const res = await client.get(`/users/me/cards?${query.toString()}`);
  return res.data;
};

export const createMyCard = async (cardData) => {
  const formData = new FormData();
  formData.append('image', cardData.image);
  formData.append('title', cardData.title);
  formData.append('description', cardData.description);
  formData.append('grade', cardData.grade);
  formData.append('genre', cardData.genre);
  formData.append('price', cardData.price);
  formData.append('totalIssued', cardData.totalIssued);

  const res = await client.post('/users/gallery/cards', formData);
  return res.data;
};
