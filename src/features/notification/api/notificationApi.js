const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

const authHeader = () => {
  const token = getToken();

  return {
    'Content-Type': 'application/json',
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

// 알림 목록 조회
export async function getNotifications() {
  try {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: authHeader(),
    });

    if (res.status === 401) {
      localStorage.removeItem('accessToken');

      alert('로그인이 만료되었습니다.');
      window.location.href = '/login';

      return;
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      throw new Error(
        errorData.message || `알림 조회 실패 (${res.status}: ${res.statusText})`
      );
    }

    return res.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('네트워크 연결 오류');
    }
    throw error;
  }
}
