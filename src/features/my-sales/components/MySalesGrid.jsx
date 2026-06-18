'use client';

import MySalesCardItem from './MySalescardItem';

export default function MySalesGrid({ cards = [], isLoading, onCardClick }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-gray-500 text-base">
        <p>판매 중인 포토카드가 없습니다.</p>
      </div>
    );
  }

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
      {cards.map((card, index) => (
        <MySalesCardItem key={index} salesCard={card} />
      ))}
    </div>
  );
}
