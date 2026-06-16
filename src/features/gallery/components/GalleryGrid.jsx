// GalleryGrid.jsx
import Image from 'next/image';

export default function GalleryGrid({ cards }) {
  return (
    <div className="grid grid-cols-3 gap-[20px] ">
      {cards?.map((card) => (
        <div
          key={card.id}
          className="rounded-[2px] border border-solid border-[rgba(255,255,255,0.10)] p-[40px] bg-[#161616]"
        >
          <Image
            src={card.imageUrl}
            alt={card.title}
            width={360}
            height={360}
            className="object-cover"
          />

          <p className="text-[var(--white-white,#FFF)] font-['Noto_Sans_KR'] text-[22px] font-[700] leading-normal mt-[12px]">
            {card.title}
          </p>

          <div className="flex items-center justify-between mt-[6px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-[13px] font-[600]">{card.grade}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300 text-[13px]">{card.genre}</span>
            </div>
            <span className="text-cyan-400 text-[13px]">{card.nickname}</span>
          </div>

          <hr className="border-gray-700 my-[12px]" />

          <div className="flex justify-between text-white text-[14px]">
            <span className="text-gray-400">가격</span>
            <span>{card.price} P</span>
          </div>
          <div className="flex justify-between text-white text-[14px] mt-[6px]">
            <span className="text-gray-400">수량</span>
            <span>{card.quantity}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
