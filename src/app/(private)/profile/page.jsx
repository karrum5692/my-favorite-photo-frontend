import ProfileCard from '@/features/user/components/ProfileCard';
import React from 'react';

const page = () => {
  return (
    <div className="mx-auto max-w-[120rem] bg-[var(--color-black)] px-[16px] pt-[1.5rem] pb-[10rem] text-[var(--color-white)] md:max-[1500px]:px-[24px] md:max-[1500px]:pt-[3.75rem] min-[1500px]:px-[13.75rem] min-[1500px]:pt-[3.75rem]">
      <section className="flex items-center border-b-[2px] border-solid border-[var(--color-white)] pb-[1.5rem] mb-[2rem]">
        <h1
          style={{ fontFamily: 'var(--font-baskins)' }}
          className="text-[#FFF] font-['BR_B'] text-[62px] font-[400] leading-normal tracking-[-1.86px] text-[var(--color-white)] font-['BR_B'] text-[3.875rem] font-[400] italic-none tracking-[-0.11625rem] "
        >
          프로필 수정
        </h1>
      </section>
      <ProfileCard />
    </div>
  );
};

export default page;
