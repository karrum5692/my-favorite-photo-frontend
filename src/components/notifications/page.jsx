'use client';

import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '../../features/notification/api/notificationApi.js';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function NotificationModal({ onClose }) {
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 10000,
  });

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="notifications-overlay" onClick={onClose}>
      <div className="notifications-modal" onClick={(e) => e.stopPropagation()}>
        {notifications.length === 0 ? (
          <p>알림이 없습니다.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="notification bg-[#161616] p-[20px] w-[300px] h-[107px] gap-[10px]"
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
