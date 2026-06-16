'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getNotifications,
  readNotifications,
  readAllNotifications,
} from '../api/notificationApi';
import { getNotificationRoute } from '../api/notificationRoute';

export function useNotifications() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 10000, // SSE 도입 전까지 폴링 유지
    staleTime: 9000,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 알림 클릭: 읽음 처리(즉시 반영) → 관련 페이지로 이동
  const handleClick = useCallback(
    async (noti) => {
      try {
        if (!noti.isRead) {
          await readNotifications(noti.id);
          queryClient.setQueryData(['notifications'], (old = []) =>
            old.map((n) => (n.id === noti.id ? { ...n, isRead: true } : n))
          );
        }
      } catch (e) {
        // 읽음 실패해도 이동은 진행
      } finally {
        router.push(getNotificationRoute(noti));
      }
    },
    [queryClient, router]
  );

  // 전체 읽음
  const markAllRead = useCallback(async () => {
    try {
      await readAllNotifications();
      queryClient.setQueryData(['notifications'], (old = []) =>
        old.map((n) => ({ ...n, isRead: true }))
      );
    } catch (e) {
      // 실패 시 다음 refetch에서 동기화
    }
  }, [queryClient]);

  return {
    notifications,
    unreadCount,
    isLoading,
    isError,
    error,
    handleClick,
    markAllRead,
    refetch,
  };
}
