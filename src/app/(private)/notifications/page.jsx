'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TimeAgo from '@/features/notification/components/TimeAgo';
import { useNotifications } from '@/features/notification/hooks/useNotifications';
import {
  getCategory,
  CATEGORY_META,
} from '@/features/notification/api/notificationCategory';

const TABS = [
  { key: 'all', label: '전체' },
  { key: 'trade', label: '거래' },
  { key: 'buy', label: '구매' },
  { key: 'sell', label: '판매' },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, isLoading, isError, error, handleClick, markAllRead } =
    useNotifications();
  const [tab, setTab] = useState('all');

  const filtered =
    tab === 'all'
      ? notifications
      : notifications.filter((n) => getCategory(n.type) === tab);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-[920px] px-4 md:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              aria-label="뒤로 가기"
              className="md:hidden text-2xl leading-none text-white hover:text-main"
            >
              &lt;
            </button>
            <h1 className="text-[20px] md:text-[22px] font-bold">알림</h1>
          </div>
          <button
            onClick={markAllRead}
            className="text-[13px] text-gray-300 hover:text-white transition-colors"
          >
            모두 읽음
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-6 border-b border-gray-400 mb-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative pb-2.5 text-[14px] transition-colors ${
                tab === t.key ? 'text-main' : 'text-gray-300 hover:text-white'
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-main" />
              )}
            </button>
          ))}
        </div>

        {/* 목록 */}
        <div>
          {isLoading ? (
            <p className="py-10 text-center text-[14px] text-gray-300">
              로딩중...
            </p>
          ) : isError ? (
            <p className="py-10 text-center text-[14px] text-red-500">
              알림을 불러올 수 없습니다: {error?.message}
            </p>
          ) : filtered.length === 0 ? (
            <p className="py-16 text-center text-[14px] text-gray-400">
              알림이 없습니다.
            </p>
          ) : (
            filtered.map((noti) => {
              const cat = getCategory(noti.type);
              const meta = CATEGORY_META[cat];
              return (
                <button
                  key={noti.id}
                  onClick={() => handleClick(noti)}
                  className={`w-full text-left py-4 md:py-[18px] px-1 border-b border-[#2a2a2a] transition-colors hover:bg-gray-500 ${
                    noti.isRead ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <p className="text-[14px] leading-relaxed text-white mb-1.5">
                    <span
                      className="inline-block text-[11px] px-2 py-0.5 rounded mr-2 align-middle"
                      style={{ color: meta.color, backgroundColor: meta.bg }}
                    >
                      {meta.label}
                    </span>
                    {noti.message}
                  </p>
                  <TimeAgo
                    date={noti.createdAt}
                    className="text-[12px] text-gray-400"
                  />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
