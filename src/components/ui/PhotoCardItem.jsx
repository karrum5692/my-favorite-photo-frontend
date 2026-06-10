'use client';
import Image from 'next/image';

export default function PhotoCardItem({
  title,
  grade,
  genre,
  nickname,
  price,
  quantity,
  imageUrl,
  onClick, // [추가] 클릭 핸들러
}) {
  const gradeColorMap = {
    COMMON: '#EFFF04',
    RARE: '#29C9F9',
    SUPER_RARE: '#A77EFF',
    LEGENDARY: '#FF2A6A',
  };
  const gradeColor = gradeColorMap[grade] || '#fff';

  return (
    <article
      onClick={onClick} // [추가]
      className="bg-[#1E1E1E] border border-gray-800 rounded-lg overflow-hidden flex flex-col w-[170px] h-[234px] md:w-[342px] md:h-[517px] lg:w-[440px] lg:h-[600px] cursor-pointer hover:border-gray-500 transition-colors"
    >
      {/* ... (이전과 동일한 내부 코드) ... */}
      <div className="px-[12px] pt-[12px] md:px-[30px] lg:px-[40px] md:pt-[30px] lg:pt-[40px]">
        <div className="relative w-full bg-[#2A2A2A] rounded-sm overflow-hidden h-[112px] md:h-[227px] lg:h-[270px] mb-[6px]">
          {imageUrl && (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 px-[12px] md:px-[30px] lg:px-[40px] pt-[2px]">
        <h3 className="text-white font-bold text-[11px] md:text-[22px] leading-tight truncate">
          {title}
        </h3>
        <div className="flex justify-between items-center mt-[2px] text-[9px] md:text-[16px] leading-none">
          <div className="flex items-center gap-1">
            <span style={{ color: gradeColor }} className="font-bold">
              {grade}
            </span>
            <span className="text-[#A4A4A4]">| {genre}</span>
          </div>
          <span className="text-white underline whitespace-nowrap">
            {nickname}
          </span>
        </div>
        <div className="border-t border-gray-700 my-[8px]" />
        <div className="flex flex-col gap-[2px]">
          <div className="flex justify-between text-white text-[10px] md:text-[16px]">
            <span className="text-gray-400">가격</span>
            <span>{price?.toLocaleString()} P</span>
          </div>
          <div className="flex justify-between text-white text-[10px] md:text-[16px]">
            <span className="text-gray-400">수량</span>
            <span>{quantity}</span>
          </div>
        </div>
        <div className="mt-auto hidden md:flex justify-center pb-[30px] lg:pb-[40px]">
          <Image src="/images/logo64.png" alt="logo" width={64} height={20} />
        </div>
      </div>
    </article>
  );
}
