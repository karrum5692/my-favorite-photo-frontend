'use client';

import Image from 'next/image';

export default function PhotoCardItem({
  title,
  grade,
  genre,
  nickname,
  price,
  quantity, // 남은 수량 (remainQuantity)
  totalQuantity, // 전체 수량 (totalQuantity)
  imageUrl,
  status,
  onClick,
  isClickable = true,
}) {
  const gradeColorMap = {
    COMMON: '#EFFF04',
    RARE: '#29C9F9',
    SUPER_RARE: '#A77EFF',
    LEGENDARY: '#FF2A6A',
  };

  const gradeColor = gradeColorMap[grade] || '#fff';

  const isSoldOut = quantity === 0 || status === 'SOLD';

  return (
    <article
      onClick={onClick}
      className={`
      bg-[#1E1E1E]
      border border-gray-800
      rounded-lg
      overflow-hidden
      flex flex-col
      w-full
      ${isClickable ? 'cursor-pointer hover:border-gray-500' : 'cursor-default'}
      transition-colors
      h-auto
    `}
    >
      {/* IMAGE AREA */}
      <div className="px-[12px] pt-[12px] md:px-[30px] lg:px-[40px] md:pt-[30px] lg:pt-[40px]">
        <div
          className="
            relative w-full bg-[#2A2A2A] rounded-sm overflow-hidden
            h-[112px]
            md:h-[227px]
            lg:h-[270px]
          "
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          )}

          {/* 🚨 SOLD OUT 오버레이 */}
          {isSoldOut && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div className="relative w-[50px] h-[50px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]">
                <Image
                  src="/images/soldout.png"
                  alt="SOLD OUT"
                  fill
                  sizes="(max-width: 768px) 50px, (max-width: 1200px) 120px, 160px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📝 CONTENT AREA */}
      <div
        className="
          flex flex-col flex-1
          px-[12px] pb-[16px] pt-[10px]
          md:px-[30px] md:pb-[30px] md:pt-[16px]
          lg:px-[40px] lg:pb-[40px]
        "
      >
        {/* TITLE */}
        <h3 className="text-white font-bold text-[13px] md:text-[20px] lg:text-[22px] leading-tight truncate">
          {title}
        </h3>

        {/* 🎯 GRADE / GENRE / NICKNAME 구역 수정 */}
        <div className="flex justify-between items-center mt-[4px] md:mt-[6px] text-[10px] md:text-[14px] leading-none">
          {/* 왼쪽: 등급 | 장르 */}
          <div className="flex items-center gap-[4px] flex-shrink-0">
            <span style={{ color: gradeColor }} className="font-bold">
              {grade}
            </span>
            <span className="text-[#A4A4A4]">| {genre}</span>
          </div>

          {/* 오른쪽 끝: 유저 닉네임 (기존 포인트 마크는 삭제) */}
          <span className="text-white underline whitespace-nowrap text-right max-w-[100px] md:max-w-[180px] truncate ml-2">
            {nickname}
          </span>
        </div>

        {/* 얇은 경계선 구분 구역 */}
        <div className="border-t border-gray-800 my-[10px] md:my-[20px]" />

        {/* PRICE & QUANTITY INFOS (하단 포인트 정보는 그대로 보존) */}
        <div className="flex flex-col gap-[4px] md:gap-[8px]">
          {/* PRICE */}
          <div className="flex justify-between text-[11px] md:text-[15px] lg:text-[16px]">
            <span className="text-gray-500 font-medium">가격</span>
            <span className="text-white font-semibold">
              {price?.toLocaleString()} P
            </span>
          </div>

          {/* QUANTITY */}
          <div className="flex justify-between text-[11px] md:text-[15px] lg:text-[16px]">
            <span className="text-gray-500 font-medium">잔여</span>
            <div className="text-white font-semibold">
              <span>{quantity}</span>
              <span className="text-gray-600 font-normal mx-[2px]">/</span>
              <span className="text-gray-400 font-normal">
                {totalQuantity || quantity}
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM LOGO */}
        <div className="mt-[16px] md:mt-[24px] lg:mt-auto hidden md:flex justify-center">
          <Image
            src="/images/logo64.png"
            alt="logo"
            width={64}
            height={20}
            className="h-auto w-auto"
          />
        </div>
      </div>
    </article>
  );
}
