const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getNotifications() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BACKEND_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('알림 조회 실패');
  }

  return response.json();
}

export async function readNotifications() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BACKEND_URL}/notifications/:id`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new HttpError(404, '알림이 없습니다.');
  }

  return response.json();
}

export async function readAllNotifications() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BACKEND_URL}/notifications/read-all`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new HttpError(404, '알림이 없습니다.');
  }

  return response.json();
}
