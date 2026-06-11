'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
      router.replace('/');
      return;
    }

    router.replace('/login');
  }, [router]);

  return <div>로그인 처리 중...</div>;
}
