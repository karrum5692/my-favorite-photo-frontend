'use client';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useNotifications } from '../hooks/useNotifications';

export default function NotificationModal({ onClose }) {
  const { notifications, isLoading, isError, error, handleClick, markAllRead } =
    useNotifications();

  return (
    <div className="notifications-overlay fixed inset-0 z-50" onClick={onClose}>
      <div
        className="notifications-modal absolute right-4 top-16 w-[300px] max-h-[353px] flex flex-col bg-[#161616] border border-gray-500 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-[20px] text-[14px] text-gray-300">로딩중...</div>
          ) : isError ? (
            <div className="p-[20px] text-[14px] text-red-500">
              알림을 불러올 수 없습니다: {error?.message}
            </div>
          ) : notifications.length === 0 ? (
            <p className="p-[20px] text-[14px] text-gray-300">
              알림이 없습니다.
            </p>
          ) : (
            notifications.map((noti) => (
              <button
                key={noti.id}
                onClick={() => handleClick(noti)}
                className={`w-full text-left p-[20px] border-b border-gray-500 transition-colors hover:bg-[#1f1f1f] ${
                  noti.isRead ? 'opacity-50' : 'opacity-100'
                }`}
              >
                <p className="text-[14px] font-normal leading-normal text-white">
                  {noti.message}
                </p>
                <span className="notification-time mt-[10px] block text-gray-400 text-[12px]">
                  {formatDistanceToNow(new Date(noti.createdAt), {
                    locale: ko,
                    addSuffix: true,
                  })}
                </span>
              </button>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-500 bg-[#161616]">
            <button
              onClick={markAllRead}
              className="text-[12px] text-gray-300 hover:text-white transition-colors"
            >
              모두 읽음
            </button>
            <a
              href="/notifications"
              className="text-[12px] text-main hover:underline"
            >
              전체보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
