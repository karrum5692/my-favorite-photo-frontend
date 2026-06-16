'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setReady(true);
      } else {
        router.replace('/login');
      }
    });
  }, [router]);

  if (!ready) {
    return <div className="min-h-screen bg-black" aria-hidden="true" />;
  }

  return children;
}
