'use client';
import { getProfile, patchProfile } from '../api/userApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useProfile() {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: function () {
      return getProfile();
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: function (formData) {
      return patchProfile(formData);
    },
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: function (error) {
      alert(`수정 실패:${error.message}`);
    },
  });
}
