'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OAuthSuccessInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('accessToken', token);
      window.location.replace('/');
      return;
    }

    window.location.replace('/login');
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      로그인 처리 중...
    </div>
  );
}

export default function OAuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          로그인 처리 중...
        </div>
      }
    >
      <OAuthSuccessInner />
    </Suspense>
  );
}
