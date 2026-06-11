'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OAuthSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
    }

    window.location.replace('/');
  }, [searchParams]);

  return <div>로그인 처리 중...</div>;
}
