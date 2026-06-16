'use client';

import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../api/notificationApi.js';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function NotificationModal({ onClose }) {
  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 10000,
    staleTime: 9000,
  });

  if (isLoading) {
    return (
      <div className="notification bg-[#161616] p-[20px] w-[300px] h-[107px] border-b border-gray-400">
        로딩중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        알림을 불러올 수 없습니다:{error.message}
      </div>
    );
  }

  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div
        className="notifications-modal notification bg-[#161616] p-[20px] w-[300px] h-[107px] border-b border-gray-400"
        onClick={(e) => e.stopPropagation()}
      >
        {notifications.length === 0 ? (
          <p className="text-[14px] font-normal italic-none leading-normal">
            알림이 없습니다.
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification bg-[#161616] p-[20px] w-[300px] h-[107px] border-b border-gray-400"
            >
              <p className="text-[14px] font-normal italic-none leading-normal">
                {notification.message}
              </p>

              <span className="notification-time mt-[10px] text-gray-400 block">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  locale: ko,
                  addSuffix: true,
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
