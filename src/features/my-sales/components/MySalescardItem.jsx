'use client';

import Image from 'next/image';

export default function MySalesCardItem({ salesCard, onClick }) {
  const template = salesCard?.photoCard?.template ?? {};
  const seller = salesCard?.seller ?? {};

  const isSold = salesCard?.status === 'SOLD';
  const hasExchange = !!salesCard?.exchangeGrade;

  const badgeText = hasExchange
    ? '교환 제시 대기 중'
    : isSold
      ? null
      : '판매 중';

  const displayStatus = hasExchange ? 'SELLING' : salesCard?.status;
  const displayQuantity = hasExchange ? 1 : salesCard?.remainQuantity;
  const isSoldOut = displayStatus === 'SOLD' || displayQuantity === 0;

  const gradeColorMap = {
    COMMON: '#EFFF04',
    RARE: '#29C9F9',
    SUPER_RARE: '#A77EFF',
    LEGENDARY: '#FF2A6A',
  };
  const gradeColor = gradeColorMap[template.grade] || '#fff';

  return (
    <article
      onClick={onClick}
      className={`
        bg-gray-500 border border-gray-500 rounded-lg overflow-hidden flex flex-col w-full
        ${onClick ? 'cursor-pointer hover:border-gray-800' : 'cursor-default'}
        transition-colors h-auto
      `}
    >
      {/* IMAGE AREA */}
      <div className="px-[12px] pt-[12px] md:px-[30px] lg:px-[40px] md:pt-[30px] lg:pt-[40px]">
        <div className="relative w-full bg-[#2A2A2A] rounded-sm overflow-hidden h-[112px] md:h-[227px] lg:h-[270px]">
          {template.imageUrl && (
            <Image
              src={template.imageUrl}
              alt={template.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          )}

          {/* 배지 - 이미지 안 왼쪽 상단 */}
          {badgeText && (
            <span
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                zIndex: 20,
                pointerEvents: 'none',
                fontWeight: 400,
                borderRadius: '0.125rem',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: hasExchange ? '#efff04' : '#ffffff',
              }}
              className="text-[11px] md:text-[16px] px-[6px] py-[3px] md:px-[12px] md:py-[6px]"
            >
              {badgeText}
            </span>
          )}

          {/* SOLD OUT 오버레이 */}
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

      {/* CONTENT AREA */}
      <div className="flex flex-col flex-1 px-[12px] pb-[16px] pt-[10px] md:px-[30px] md:pb-[30px] md:pt-[16px] lg:px-[40px] lg:pb-[40px]">
        {/* TITLE */}
        <h3 className="text-white font-bold text-[13px] md:text-[20px] lg:text-[22px] leading-tight truncate">
          {template.title}
        </h3>

        {/* GRADE / GENRE / NICKNAME */}
        <div className="flex justify-between items-center mt-[4px] md:mt-[6px] text-[10px] md:text-[14px] leading-none">
          <div className="flex items-center gap-[4px]">
            <span style={{ color: gradeColor }} className="font-bold">
              {template.grade}
            </span>
            <span className="text-[#A4A4A4]">| {template.genre}</span>
          </div>
          <span className="text-white underline whitespace-nowrap max-w-[60px] md:max-w-[120px] truncate">
            {seller.nickname}
          </span>
        </div>

        <div className="border-t border-gray-800 my-[10px] md:my-[20px]" />

        {/* PRICE & QUANTITY */}
        <div className="flex flex-col gap-[4px] md:gap-[8px]">
          <div className="flex justify-between text-[11px] md:text-[15px] lg:text-[16px]">
            <span className="text-gray-500 font-medium">가격</span>
            <span className="text-white font-semibold">
              {salesCard?.price?.toLocaleString()} P
            </span>
          </div>

          <div className="flex justify-between text-[11px] md:text-[15px] lg:text-[16px]">
            <span className="text-gray-500 font-medium">잔여</span>
            <div className="text-white font-semibold">
              <span>{displayQuantity}</span>
              {!hasExchange && (
                <>
                  <span className="text-gray-600 font-normal mx-[2px]">/</span>
                  <span className="text-gray-400 font-normal">
                    {salesCard?.remainQuantity}
                  </span>
                </>
              )}
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
