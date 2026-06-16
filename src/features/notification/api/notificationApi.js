const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getNotifications() {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`${BACKEND_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('알림 조회 실패');
    }

    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function readNotifications(id) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${BACKEND_URL}/notifications/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('알림 읽음 실패');
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
    throw new Error('알림 전체 읽음 실패');
  }

  return response.json();
}
