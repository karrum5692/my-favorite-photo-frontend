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
      className="
        bg-[#1E1E1E]
        border border-gray-800
        rounded-lg
        overflow-hidden
        flex flex-col

        w-[170px] h-[234px]
        md:w-[342px] md:h-[517px]
        lg:w-[440px] lg:h-[600px]
      "
    >
      {/* IMAGE */}
      <div className="px-[20px] md:px-[30px] lg:px-[40px] pt-[20px] md:pt-[30px] lg:pt-[40px]">
        <div
          className="
            relative w-full bg-[#2A2A2A] rounded-sm overflow-hidden

            h-[112px]
            md:h-[227px]
            lg:h-[270px]
          "
        >
          {imageUrl && (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className="
          flex flex-col flex-1

          px-[20px]
          md:px-[30px]
          lg:px-[40px]

          pt-[10px]
        "
      >
        {/* TITLE */}
        <h3 className="text-white font-bold text-[14px] md:text-[22px] leading-tight">
          {title}
        </h3>

        {/* GRADE / GENRE / NICKNAME */}
        <div
          className="
            flex justify-between items-start

            text-[10px]
            md:text-[14px]

            mt-1
          "
        >
          {/* LEFT */}
          <div className="flex flex-col leading-none gap-[2px]">
            <span
              style={{ color: gradeColor }}
              className="font-bold leading-none"
            >
              {grade}
            </span>

            <span className="text-[#A4A4A4] leading-none">| {genre}</span>
          </div>

          {/* RIGHT - NICKNAME */}
          <span
            className="
              text-white underline
              leading-none
              whitespace-nowrap
            "
          >
            {nickname}
          </span>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-[20px]" />

        {/* PRICE */}
        <div className="flex justify-between text-white text-[12px] md:text-[16px]">
          <span className="text-gray-400">가격</span>
          <span>{price?.toLocaleString()} P</span>
        </div>

        <div className="h-[10px]" />

        {/* QUANTITY */}
        <div className="flex justify-between text-white text-[12px] md:text-[16px]">
          <span className="text-gray-400">수량</span>
          <span>{quantity}</span>
        </div>

        {/* LOGO */}
        <div className="mt-auto flex justify-center pb-[20px] md:pb-[30px] lg:pb-[40px]">
          <Image src="/images/logo64.png" alt="logo" width={64} height={20} />
        </div>
      </div>
    </article>
  );
}
