'use client';
import { getProfile, patchProfile } from '../api/userApi';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

export function useProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: function () {
      return getProfile();
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: function ({ nickname, profileImageUrl }) {
      return patchProfile(nickname, profileImageUrl);
    },
    onSuccess: function () {
      QueryClient.invalidateQueries({ queryKey: ['myProfile'] });
      alert('프로필이 정상적으로 수정되었습니다.');
    },
    onError: function (error) {
      alert(`수정 실패:${error.message}`);
    },
  });
}
