const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const getProfile = async function () {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error('프로필 조회 실패');
  return res.json();
};

export const patchProfile = async function (nickname, profileImageUrl) {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json', // ✅ 무조건 작성!
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      nickname,
      profileImageUrl,
    }),
  });
  if (!res.ok) throw new Error('수정에 실패하였습니다.');
  return res.json();
};
