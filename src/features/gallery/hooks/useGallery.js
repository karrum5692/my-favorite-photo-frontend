import { useQuery } from '@tanstack/react-query';
import { getMyCards } from '../api/galleryApi';

export function useMyCards(filters) {
  return useQuery({
    queryKey: ['myCards', filters],
    queryFn: function () {
      return getMyCards(filters);
    },
  });
}
