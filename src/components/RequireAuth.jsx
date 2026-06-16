'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 로그인이 필요한 영역을 감싸는 가드.
 * - localStorage에 토큰이 없으면 /login 으로 보낸다.
 */

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [hasToken] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  });

  useEffect(() => {
    if (!hasToken) {
      router.replace('/login');
    }
  }, [hasToken, router]);

  // 토큰 없으면 페이지 숨김
  if (!hasToken) {
    return <div className="min-h-screen bg-black" aria-hidden="true" />;
  }

  return children;
}
