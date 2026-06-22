'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import menuIcon from '@/assets/icons/icon-menu.png';
import backIcon from '@/assets/icons/icon-back.png';
import alarmDefaultIcon from '@/assets/icons/icon-alarm-default.png';
import alarmActiveIcon from '@/assets/icons/icon-alarm-active.png';
import profileIcon from '@/assets/icons/icon-profile.png';
import NotificationModal from '../../features/notification/components/notificationModal.jsx';
import { getHeaderConfig } from './headerConfig';
import { useNotifications } from '../../features/notification/hooks/useNotifications';
import MobileMenu from './MobileMenu';

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
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
  });
  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.setQueryData(['user'], null);
    queryClient.removeQueries({ queryKey: ['notifications'] });
    router.push('/marketplace');
  };
  return { isLoggedIn: !!user, user, logout };
};

export default function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();
  const config = getHeaderConfig(pathname);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (config.type === 'hidden') return null;

  return (
    <header className="w-full bg-black border-b border-gray-500 h-20">
      <div className="w-full h-full flex items-center justify-between relative px-4 md:px-10 xl:px-20 min-[1920px]:px-32">
        <div className="flex items-center md:hidden z-10">
          {config.type === 'B' ? (
            <button
              onClick={() => router.back()}
              aria-label="뒤로 가기"
              className="p-1"
            >
              <Image
                src={backIcon}
                alt="뒤로"
                width={20}
                style={{ height: 'auto' }}
                priority
              />
            </button>
          ) : (
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="메뉴 열기"
              className="p-1"
            >
              <Image
                src={menuIcon}
                alt="메뉴"
                width={15}
                style={{ height: 'auto' }}
                priority
              />
            </button>
          )}
        </div>

        {config.type === 'B' ? (
          <>
            <span className="md:hidden absolute left-1/2 -translate-x-1/2 text-white text-[16px] font-bold z-0">
              {config.title}
            </span>
            <Logo
              isLoggedIn={isLoggedIn}
              className="hidden md:flex md:static z-10"
            />
          </>
        ) : (
          <Logo
            isLoggedIn={isLoggedIn}
            className="flex absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 z-10"
          />
        )}

        <div className="z-10">
          {config.type === 'B' ? (
            <div className="hidden md:block">
              {isLoggedIn ? (
                <LoggedInMenu user={user} logout={logout} />
              ) : (
                <LoggedOutMenu />
              )}
            </div>
          ) : isLoggedIn ? (
            <LoggedInMenu user={user} logout={logout} />
          ) : (
            <LoggedOutMenu />
          )}
        </div>
      </div>
      {isLoggedIn && (
        <MobileMenu
          open={mobileMenuOpen}
          user={user}
          logout={logout}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}

function Logo({ isLoggedIn, className = '' }) {
  return (
    <Link
      href={isLoggedIn ? '/marketplace' : '/'}
      className={`items-center ${className}`}
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
  );
}

function LoggedInMenu({ user, logout }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <nav className="flex items-center gap-4">
      <span className="text-sm text-white font-bold hidden sm:inline">
        {(user?.point?.balance ?? 0).toLocaleString()} P
      </span>

      <div className="relative">
        <button
          aria-label="알림 열기"
          onClick={() => setNotificationOpen((p) => !p)}
          className="flex items-center"
        >
          <Image
            src={unreadCount > 0 ? alarmActiveIcon : alarmDefaultIcon}
            alt={unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '알림'}
            width={24}
            height={24}
            className="block"
          />
        </button>
        {notificationOpen && (
          <div className="absolute right-0 top-8 z-50">
            <NotificationModal onClose={() => setNotificationOpen(false)} />
          </div>
        )}
      </div>

      <Link href="/profile" aria-label="프로필" className="flex items-center">
        {user?.profileImageUrl ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={user.profileImageUrl}
              alt="프로필"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <Image
              src={profileIcon}
              alt="프로필"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
        )}
      </Link>

      <div className="relative hidden md:block">
        <button
          className="text-sm text-white hover:text-main transition-colors font-display"
          onClick={() => setProfileOpen((p) => !p)}
        >
          {user ? user.nickname : '로그인을 다시해주세요'}
        </button>
        {profileOpen && (
          <ProfileMenu user={user} onClose={() => setProfileOpen(false)} />
        )}
      </div>

      <span className="text-gray-400 hidden md:inline">|</span>
      <button
        className="text-[14px] text-gray-400 hover:text-white transition-colors hidden md:inline"
        onClick={logout}
      >
        로그아웃
      </button>
    </nav>
  );
}

function ProfileMenu({ user, onClose }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute right-0 top-9 z-50 w-[280px] rounded-2xl bg-gray-500 border border-gray-400/40 p-5 shadow-xl">
        <p className="text-white text-lg font-bold font-display">
          안녕하세요, {user?.nickname}님!
        </p>
        <div className="flex items-center justify-between mt-3 pb-4 border-b border-gray-400/40">
          <span className="text-sm text-gray-300">보유 포인트</span>
          <span className="text-main font-bold">
            {(user?.point?.balance ?? 0).toLocaleString()} P
          </span>
        </div>
        <ul className="mt-4 space-y-3">
          <li>
            <Link
              href="/marketplace"
              onClick={onClose}
              className="block text-white font-bold hover:text-main"
            >
              마켓플레이스
            </Link>
          </li>
          <li>
            <Link
              href="/gallery"
              onClick={onClose}
              className="block text-white font-bold hover:text-main"
            >
              마이갤러리
            </Link>
          </li>
          <li>
            <Link
              href="/my-sales"
              onClick={onClose}
              className="block text-white font-bold hover:text-main"
            >
              판매 중인 포토카드
            </Link>
          </li>
        </ul>
      </div>
    </>
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
