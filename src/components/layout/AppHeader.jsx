'use client';

import Link from 'next/link';
import Image from 'next/image';
import menuIcon from '@/assets/icons/icon-menu.png';
import alarmIcon from '@/assets/icons/icon-alarm-default.png';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import NotificationModal from '../notifications/page.jsx';

const fetchUser = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    return null;
  }

  return res.json();
};

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.setQueryData(['user'], null);
    queryClient.removeQueries({ queryKey: ['notifications'] });
  };

  return { isLoggedIn: !!user, user, logout };
};

export default function AppHeader() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="w-full bg-black border-b border-gray-500 h-20">
      <div className="w-full h-full flex items-center justify-between relative px-4 md:px-10 xl:px-20 min-[1920px]:px-32">
        <button
          className="block md:hidden p-1 z-10"
          aria-label="메뉴 열기"
          onClick={() => {
            /* TODO: Implement menu toggle */
          }}
        >
          <Image
            src={menuIcon}
            alt="메뉴"
            width={15}
            style={{ height: 'auto' }}
            priority
          />
        </button>

        <Link
          href="/"
          className="flex items-center absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10"
        >
          <div className="relative w-[84px] h-[15px] min-[744px]:w-[111px] min-[744px]:h-[20px] min-[1920px]:w-[139px] min-[1920px]:h-[25px]">
            <Image
              src="/images/logo.png"
              alt="최애의 포토"
              fill
              sizes="(max-width: 743px) 84px, (max-width: 1919px) 111px, 139px"
              priority
              className="object-contain"
            />
          </div>
        </Link>

        <div className="z-10">
          {isLoggedIn ? (
            <LoggedInMenu user={user} logout={logout} />
          ) : (
            <LoggedOutMenu />
          )}
        </div>
      </div>
    </header>
  );
}

function LoggedInMenu({ user, logout }) {
  const [NotificationOpen, setNotificationOpen] = useState(false);

  return (
    <nav className="flex items-center gap-4">
      <span className="text-sm text-white font-bold hidden sm:inline">
        {(user?.point?.balance ?? 0).toLocaleString()} P
      </span>
      <div className="relative">
        <button
          aria-label="알림 열기"
          onClick={() => setNotificationOpen((prev) => !prev)}
        >
          <Image src={alarmIcon} alt="알림" width={24} height={24} />
        </button>

        {NotificationOpen && (
          <div className="absolute right-0 top-8 z-50">
            <NotificationModal onClose={() => setNotificationOpen(false)} />
          </div>
        )}
      </div>

      <Link href="/profile">
        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
          {user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt="프로필"
              width={32}
              height={32}
              className="object-cover"
            />
          ) : (
            <span className="text-xs text-white">👤</span>
          )}
        </div>
      </Link>

      <span className="text-sm text-white hidden md:inline">
        {user ? user.nickname : '로그인을 다시해주세요'}
      </span>
      <span className="text-gray-400 hidden md:inline">|</span>
      <button
        className="text-[14px] text-gray-400 hover:text-white transition-colors"
        onClick={logout}
      >
        로그아웃
      </button>
    </nav>
  );
}

function LoggedOutMenu() {
  return (
    <nav className="flex items-center gap-4 md:gap-6">
      <Link
        href="/login"
        className="text-sm text-gray-200 hover:text-white transition-colors"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="text-sm text-gray-200 hover:text-white transition-colors hidden md:inline-block"
      >
        회원가입
      </Link>
    </nav>
  );
}
