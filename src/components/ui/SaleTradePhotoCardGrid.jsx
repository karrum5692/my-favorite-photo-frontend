'use client';

import PhotoCardItem from '@/components/ui/PhotoCardItem';

// onCardClick을 props로 추가합니다.
export default function PhotoCardGrid({ cards = [], onCardClick }) {
  return (
    <div
      className="
        grid grid-cols-2
        gap-[10px]
        md:gap-[20px]
        lg:gap-[40px]
        justify-center
        w-full
        max-w-[1480px]
        mx-auto
      "
    >
      {cards.map((card) => (
        <PhotoCardItem
          key={card.id}
          {...card}
          onClick={() => onCardClick?.(card)} // 여기서 클릭 이벤트를 연결합니다.
        />
      ))}
    </div>
  );
}
