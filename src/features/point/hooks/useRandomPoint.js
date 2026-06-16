'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

const COOLDOWN_MS = 60 * 60 * 1000;

function authHeader() {
  if (typeof window === 'undefined') return {};
  const token =
    localStorage.getItem('accessToken') || localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function calcRemain(lastEventAt, now) {
  if (!lastEventAt) return 0;
  const next = new Date(lastEventAt).getTime() + COOLDOWN_MS;
  return Math.max(0, next - now);
}

export function useRandomPoint() {
  const queryClient = useQueryClient();
  const [now, setNow] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ['point', 'me'],
    queryFn: async () => {
      const header = authHeader();
      if (!header.Authorization) return null;
      const res = await api.get('/points/me', { headers: header });
      return res.data;
    },
    staleTime: 1000 * 30,
  });

  const lastEventAt = data?.lastEventAt ?? null;
  const balance = data?.balance ?? 0;

  // 1초마다 now
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remainMs = calcRemain(lastEventAt, now);
  const canClaim = remainMs <= 0;

  const claim = useCallback(async () => {
    setLoading(true);
    try {
      const { data: res } = await api.post(
        '/points/random-box',
        {},
        { headers: authHeader() }
      );
      const updatedPoint = res[0];
      const history = res[1];

      queryClient.setQueryData(['point', 'me'], {
        balance: updatedPoint.balance,
        lastEventAt: updatedPoint.lastEventAt,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });

      return { amount: history.amount, balance: updatedPoint.balance };
    } finally {
      setLoading(false);
    }
  }, [queryClient]);

  return {
    canClaim,
    remainMs,
    balance,
    lastEventAt,
    loading,
    claim,
    sync: refetch,
  };
}

export function formatRemain(ms) {
  const total = Math.ceil(ms / 1000);
  const m = String(Math.floor(total / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${m}분 ${s}초`;
}
