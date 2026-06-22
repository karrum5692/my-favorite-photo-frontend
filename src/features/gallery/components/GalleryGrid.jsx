// GalleryGrid.jsx
import Image from 'next/image';

export default function GalleryGrid({ cards }) {
  const gradeColorMap = {
    COMMON: '#EFFF04',
    RARE: '#29C9F9',
    SUPER_RARE: '#A77EFF',
    LEGENDARY: '#FF2A6A',
  };
  return (
    <div className="grid grid-cols-3 gap-[20px] w-full">
      {cards?.map((card) => (
        <div
          key={card.id}
          className="w-full max-w-[440px] h-auto flex flex-col bg-[#161616] rounded-[2px] border border-solid border-[rgba(255,255,255,0.10)] p-[24px] md:p-[40px] overflow-hidden"
        >
          <div className="w-full aspect-square relative rounded-[4px] overflow-hidden">
            <Image
              src={card.imageUrl}
              alt={card.title}
              width={360}
              height={360}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-[var(--white-white,#FFF)] font-['Noto_Sans_KR'] text-[22px] font-[700] leading-normal mt-[12px]">
            {card.title}
          </p>

          <div className="flex justify-between items-center w-full mt-[10px]">
            <div className="flex items-center gap-[10px]">
              <span
                className="text-[16px] font-[600]"
                style={{ color: gradeColorMap[card.grade] }}
              >
                {card.grade}
              </span>
              <span className="text-[var(--gray-gray400,#5A5A5A)] font-['Noto_Sans_KR'] text-[16px] font-[400] leading-normal select-none">
                |
              </span>
              <span className="text-gray-300 text-[16px]">{card.genre}</span>
            </div>

            <div>
              <span className="text-[var(--white-white,#FFF)] text-right font-['Noto_Sans_KR'] text-[16px] font-[400] leading-normal underline decoration-solid">
                {card.nickname}
              </span>
            </div>
          </div>

          <hr className="border-gray-400 my-[12px] mt-[20px]" />

          <div className="flex justify-between text-white text-[14px] mt-[10px]">
            <span className="text-gray-400">가격</span>
            <span>{card.price} P</span>
          </div>
          <div className="flex justify-between text-white text-[14px] mt-[6px]">
            <span className="text-gray-400">수량</span>
            <span>{card.quantity}</span>
          </div>

          <div className="mt-[40px] hidden md:flex justify-center">
            <Image src="/images/logo.png" alt="logo" width={99} height={18} />
          </div>
        </div>
      ))}
    </div>
  );
}
