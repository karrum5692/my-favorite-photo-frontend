'use client';

import React from 'react';
import Button from './Button';
import closeIcon from '@/assets/icons/icon-close.png';
import Image from 'next/image';

export default function AlertModal({
  isLoading,
  isOpen,
  onClose,
  title,
  description,
  onButtonClick,
  buttonText,
}) {
  if (!isOpen) return null;

  return (
    // 뒷배경 (오버레이)
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/60">
      {/* 모달 본체 */}
      <div className="relative rounded-[2px] bg-gray-500 w-[350px] h-[290px] md:w-[400px] xl:w-[560px] xl:h-[355px]">
        <button
          onClick={onClose}
          disabled={isLoading}
          aria-label="닫기"
          className="absolute top-4 right-4 md:top-6 md:right-6 w-7 h-7 md:w-8 md:h-8 cursor-pointer"
        >
          <Image src={closeIcon} alt="closeIcon" className="object-contain" />
        </button>

        <div className="flex flex-col items-center ">
          {/* 내용 */}
          <div className="flex flex-col items-center text-center mt-[60px] mb-[35px] gap-[30px] xl:mt-[80px] xl:mb-[65px] ">
            <span className="text-white text-[20px] font-bold">{title}</span>
            <span className="block text-gray-300 text-[16px] font-normal whitespace-pre-line">
              {description}
            </span>
          </div>
          {/* 버튼 */}
          <div className="flex items-center w-[120px] md:w-[140px] xl:w-[170px]">
            <Button
              variant="primary"
              height="55"
              onClick={onButtonClick}
              disabled={isLoading}
            >
              {isLoading ? `${buttonText} 중...` : buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function confirmAlertModal (){}
