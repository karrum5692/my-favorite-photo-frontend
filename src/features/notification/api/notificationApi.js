const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// 알림 목록 조회
export async function getNotifications() {
  const res = await fetch(`${BASE_URL}/notifications`, {
    headers: authHeader(),
  });
  if (!res.ok) throw new Error('알림 조회 실패');
  return res.json();
}
