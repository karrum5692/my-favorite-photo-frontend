'use client';

import Image from 'next/image';
import Button from './Button';
import closeIcon from '@/assets/icons/icon-close.png';

export default function ResultModal({
  isOpen,
  onClose,
  title,
  result = 'success',
  description,
  buttonText,
  onButtonClick,
}) {
  if (!isOpen) return null;

  const isSuccess = result === 'success';

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        aria-label="닫기"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-7 h-7 md:w-8 md:h-8"
      >
        <Image src={closeIcon} alt="" fill className="object-contain" />
      </button>

      {/* 본문 */}
      <div className="flex flex-col items-center text-center px-6">
        <h2 className="font-bold text-white text-[30px] md:text-[40px] xl:text-[46px]">
          {title}{' '}
          <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
            {isSuccess ? '성공' : '실패'}
          </span>
        </h2>

        <p className="mt-6 md:mt-10 text-white font-bold text-sm md:text-base whitespace-pre-line">
          {description}
        </p>
        {/* 버튼 ui */}
        <div className="mt-8 md:mt-12 w-[280px] md:w-[440px]">
          <Button variant="secondary" height="55" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
