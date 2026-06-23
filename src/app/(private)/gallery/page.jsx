'use client';
import Image from 'next/image';
import React, { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import { useMyCards } from '@/features/gallery/hooks/useGallery';
import GalleryGrid from '@/features/gallery/components/GalleryGrid';
import GallerySearch from '@/features/gallery/components/GallerySearch';
import GalleryFilter from '@/features/gallery/components/GalleryFilter';
import Pagination from '@/components/ui/Pagination';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GalleryPage() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const filters = useMemo(
    () => ({
      search,
      grade: gradeFilter,
      genre: genreFilter,
      page,
      limit: 9,
    }),
    [search, gradeFilter, genreFilter, page]
  );

  const handleSearch = function (value) {
    setSearch(value);
    if (value !== search) {
      router.push('?page=1');
    }
  };

  const handleFilter = function (value) {
    setGradeFilter(value);
  };

  const handleFilter2 = function (value) {
    setGenreFilter(value);
  };

  const { data, isLoading, error } = useMyCards(filters);

  if (isLoading && !data) return <div>로딩 중...</div>;
  if (error) return <div>에러남</div>;

  return (
    <div className="mx-auto min-height-[100vh] max-w-[120rem] bg-[var(--color-black)] px-[16px] pt-[1.5rem] pb-[10rem] text-[var(--color-white)] relative md:max-[1500px]:px-[24px] md:max-[1500px]:pt-[3.75rem] md:max-[1500px]:pb-[8.75rem] min-[1500px]:px-[13.75rem] min-[1500px]:pt-[3.75rem] min-[1500px]:pb-[8.75rem]">
      <main className="p-0 min-[1500px]:py-[3rem] min-[1500px]:px-[2.5rem]">
        <section className="hidden md:flex justify-between items-center border-b-[2px] border-solid border-[var(--color-white)] pb-[1.5rem] mb-[2rem]">
          <h1
            style={{ fontFamily: 'var(--font-baskins)' }}
            className="text-[#FFF] font-['BR_B'] text-[62px] font-[400] leading-normal tracking-[-1.86px]text-[var(--color-white)] font-['BR_B'] text-[3.875rem] font-[400] italic-none tracking-[-0.11625rem] "
          >
            마이 갤러리
          </h1>
          <div className="w-[320px] hidden md:block">
            <Link href="/gallery/create" className="w-full">
              <Button variant="primary" height="60">
                포토카드 생성하기
              </Button>
            </Link>
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

          <div className="flex items-start gap-[20px]">
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[var(--main-main,#EFFF04)] bg-[var(--black-black,#0F0F0F)] text-[var(--main-main,#EFFF04)] font-['Noto_Sans_KR'] text-[15px] font-[300] whitespace-nowrap">
              COMMON {data?.gradeCount?.COMMON}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#29C9F9] bg-[var(--black-black,#0F0F0F)] text-[#29C9F9] font-['Noto_Sans_KR'] text-[15px] font-[300] whitespace-nowrap">
              RARE {data?.gradeCount?.RARE}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#A77EFF] bg-[var(--black-black,#0F0F0F)] text-[#A77EFF] font-['Noto_Sans_KR'] text-[15px] font-[300] whitespace-nowrap">
              SUPER RARE {data?.gradeCount?.SUPER_RARE}장
            </div>
            <div className="inline-flex flex-col items-start gap-[20px] h-[40px] px-[20px] py-[8px] border border-solid border-[#FF2A6A] bg-[var(--black-black,#0F0F0F)] text-[#FF2A6A] font-['Noto_Sans_KR'] text-[15px] font-[300] whitespace-nowrap">
              LEGENDARY {data?.gradeCount?.LEGENDARY}장
            </div>
          </div>
        </section>

        <hr className="border-t border-solid border-gray-700 w-full mt-[1.5rem] mb-[2rem]" />
        <section>
          <div className="flex flex-col md:flex-row md:items-center gap-[32px] mb-[1.5rem] md:mb-[2.5rem] w-full">
            <div className="relative shrink-0 w-full pb-[15px] border-b border-solid border-[var(--color-white)] md:w-[320px] md:pb-0 md:border-b-0">
              <GallerySearch onSearch={handleSearch} />
              <div className="absolute top-[22px] md:top-1/2 right-[14px] -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <Image
                  src="/images/search.png"
                  alt="포토카드"
                  width={24}
                  height={24}
                  className="rounded-sm w-auto h-auto"
                />
              </div>
            </div>
            <GalleryFilter
              grade={gradeFilter}
              genre={genreFilter}
              onGradeChange={handleFilter}
              onGenreChange={handleFilter2}
            />
          </div>
        </section>
        <section>
          <GalleryGrid cards={data?.card} />
        </section>
      </main>
      <div className="flex justify-center mt-10">
        <Pagination totalPages={data?.totalPages} />
      </div>
    </div>
  );
}
