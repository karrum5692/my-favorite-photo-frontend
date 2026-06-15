'use client';

import PhotoCardItem from './PhotoCardItem';
import { useRouter } from 'next/navigation';

export default function PhotoCardGrid({ cards = [], onUnauthorizedClick }) {
  const router = useRouter();

  const isLoggedIn =
    typeof window !== 'undefined' &&
    !!(localStorage.getItem('accessToken') || localStorage.getItem('token'));

  const handleCardClick = (cardId) => {
    if (!isLoggedIn) {
      onUnauthorizedClick?.();
      return;
    }
    router.push(`/marketplace/${cardId}`);
  };

  return (
    <div
      className="
        grid 
        grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        gap-[12px]
        md:gap-[24px]
        lg:gap-[40px]
        w-full
        max-w-[1480px]
        mx-auto
      "
    >
      {cards.map((card) => (
        <PhotoCardItem
          key={card.id}
          {...card}
          isClickable={isLoggedIn}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}
