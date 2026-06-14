'use client';

import PhotoCardItem from './PhotoCardItem';

export default function PhotoCardGrid({ cards = [] }) {
  return (
    <div
      className="
        grid 
        grid-cols-2             /*  모바일: 무조건 한 줄에 2개 정렬 */
        md:grid-cols-2          /*  태블릿: 한 줄에 2개 정렬 유지 */
        lg:grid-cols-3          /*  데스크톱: 한 줄에 3개 배치 */
        
        /* 피그마 레이아웃 비율 연동 간격 */
        gap-[12px]
        md:gap-[24px]
        lg:gap-[40px]
        
        w-full
        max-w-[1480px]          /* 콘텐츠가 노출될 수 있는 최대 바디 폭 조정 */
        mx-auto
      "
    >
      {cards.map((card) => (
        <PhotoCardItem key={card.id} {...card} />
      ))}
    </div>
  );
}
