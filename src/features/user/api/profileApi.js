const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function authHeaders() {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function getProfile() {
  const res = await fetch(`${BACKEND_URL}/users/me`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('프로필을 불러오지 못했습니다.');
  return res.json();
}

export async function updateProfile({ nickname, profileImageUrl }) {
  const body = {};
  if (nickname !== undefined) body.nickname = nickname;
  if (profileImageUrl !== undefined) body.profileImageUrl = profileImageUrl;

  const res = await fetch(`${BACKEND_URL}/users/me`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('프로필 수정에 실패했습니다.');
  return res.json();
}

export async function getPointHistory() {
  const res = await fetch(`${BACKEND_URL}/points/me/history`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('포인트 내역을 불러오지 못했습니다.');
  return res.json();
}
