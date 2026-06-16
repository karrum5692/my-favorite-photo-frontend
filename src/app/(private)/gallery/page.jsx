'use client';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { useMyCards } from '@/features/gallery/hooks/useGallery';

export default function GalleryPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });
  const [page, setPage] = useState(1);

  const filters = {
    search,
    grade: activeFilter.type === 'grade' ? activeFilter.value : '',
    genre: activeFilter.type === 'genre' ? activeFilter.value : '',
    page,
    limit: 9,
  };

  const { data, isLoading, error } = useMyCards(filters);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러남</div>;

  return (
    <div className="mx-auto min-height-[100vh] max-w-[120rem] bg-[var(--color-black)] px-[16px] pt-[1.5rem] pb-[10rem] text-[var(--color-white)] relative md:max-[1500px]:px-[24px] md:max-[1500px]:pt-[3.75rem] md:max-[1500px]:pb-[8.75rem] min-[1500px]:px-[13.75rem] min-[1500px]:pt-[3.75rem] min-[1500px]:pb-[8.75rem]">
      <main className="p-0 min-[1500px]:py-[3rem] min-[1500px]:px-[2.5rem]">
        <section className="hidden md:flex justify-between items-center border-b-[2px] border-solid border-[var(--color-white)] pb-[1.5rem] mb-[2rem]">
          <h1 className="text-[var(--color-white)] font-['BR_B'] text-[3.875rem] font-[400] italic-none tracking-[-0.11625rem] cursor-pointer select-none hover:opacity-80">
            마이 갤러리
          </h1>
          <div className="w-[320px] hidden md:block">
            <Button variant="primary" height="60">
              포토카드 생성하기
            </Button>
          </div>
        </section>

        <section className="flex flex-col items-start gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <span className="text-[var(--gray-gray200,#DDD)] text-[24px] font-[700] leading-normal font-['Noto_Sans_KR']">
              {data?.card?.[0]?.nickname}님이 보유하신 포토카드
            </span>
            <span className="text-[var(--gray-gray300,#A4A4A4)] text-[20px] font-[400] leading-normal font-['Noto_Sans_KR']">
              ({data?.allCounts}장)
            </span>
          </div>

          <div className="flex items-start gap-[10px]">
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[var(--main-main,#EFFF04)] bg-[var(--black-black,#0F0F0F)] text-[var(--main-main,#EFFF04)] font-['Noto_Sans_KR'] text-[14px] font-[500] whitespace-nowrap">
              COMMON {data?.gradeCount?.COMMON}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#3DFFC3] bg-[var(--black-black,#0F0F0F)] text-[#3DFFC3] font-['Noto_Sans_KR'] text-[14px] font-[500] whitespace-nowrap">
              RARE {data?.gradeCount?.RARE}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#8C52FF] bg-[var(--black-black,#0F0F0F)] text-[#8C52FF] font-['Noto_Sans_KR'] text-[14px] font-[500] whitespace-nowrap">
              SUPER RARE {data?.gradeCount?.SUPER_RARE}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#FF4D4D] bg-[var(--black-black,#0F0F0F)] text-[#FF4D4D] font-['Noto_Sans_KR'] text-[14px] font-[500] whitespace-nowrap">
              LEGENDARY {data?.gradeCount?.LEGENDARY}장
            </div>
          </div>
        </section>

        <hr className="border-t border-solid border-gray-700 w-full mt-[1.5rem] mb-[2rem]" />

        <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-[12px] mb-[1.5rem] md:mb-[2.5rem] w-full">
          <div className="relative shrink-0 w-full pb-[15px] border-b border-solid border-[var(--color-white)] md:w-[320px] md:pb-0 md:border-b-0">
            <input
              type="text"
              placeholder="검색"
              className="w-full h-[44px] bg-[var(--color-black)] border border-solid border-[var(--color-white)] pl-[14px] pr-[40px] text-[14px] text-[var(--color-white)] focus:outline-none focus:border-[var(--color-white)] placeholder-[var(--color-gray-300)]"
            />
            <div className="absolute top-[22px] md:top-1/2 right-[14px] -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <Image
                src="/images/search.png"
                alt="포토카드"
                width={19}
                height={19}
                className="rounded-sm w-auto h-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-[12px] w-full md:flex-1 md:justify-start">
            <div className="flex gap-[16px] items-center">
              <div className="dropdown-container pc-filter-dropdown hidden md:inline-block"></div>
            </div>
          </div>
          <div>
            {data?.card?.map((card) => (
              <div key={card.id}>{card.title}</div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
