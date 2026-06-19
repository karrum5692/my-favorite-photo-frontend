'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile, getPointHistory } from '../api/profileApi';

// 프로필 조회
export function useProfile() {
  return useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
    staleTime: 1000 * 60,
  });
}

// 프로필 수정
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(['user'], (prev) => ({ ...prev, ...updated }));
    },
  });
}

// 포인트 내역
export function usePointHistory() {
  return useQuery({
    queryKey: ['pointHistory'],
    queryFn: getPointHistory,
    staleTime: 1000 * 30,
  });
}
