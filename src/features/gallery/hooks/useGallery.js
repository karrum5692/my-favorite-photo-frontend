import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMyCard, getMyCards } from '../api/galleryApi';

export function useMyCards(filters) {
  return useQuery({
    queryKey: ['myCards', filters],
    queryFn: function () {
      return getMyCards(filters);
    },
    placeholderData: (prev) => prev,
    staleTime: 1000 * 30,
  });
}

export const useCreateMyCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: function (cardData) {
      return createMyCard(cardData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCards'] });
    },
  });
};
