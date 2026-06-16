'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectIfLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.replace('/marketplace');
    }
  }, [router]);

  return null;
}
