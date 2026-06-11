'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import iconBack from '@/assets/icons/icon-back.png';
import iconGo from '@/assets/icons/icon-go.png';

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get('page')) || 1;
  const currentPage = Math.min(Math.max(rawPage, 1), totalPages || 1);

  // 입력창 제어를 위한 관리
  const [isInputMode, setIsInputMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  // 페이지 변경 시 URL 쿼리 스트링 업데이트
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());

    // 현재 경로 기준으로 이동
    router.push(`${pathname}?${params.toString()}`);

    // 이동 후 입력 상태 초기화
    setIsInputMode(false);
    setInputValue('');
    setIsInvalid(false);
  };

  // 입력창에서 엔터 쳤을 때 유효성 검사 후 이동
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const targetPage = Number(inputValue);
      if (targetPage >= 1 && targetPage <= totalPages) {
        handlePageChange(targetPage);
      } else {
        setIsInvalid(true);
        setInputValue('');
      }
    }
    // esc 누르면 입력 모드 종료
    if (e.key === 'Escape') {
      setIsInputMode(false);
      setInputValue('');
      setIsInvalid(false);
    }
  };

  const closeInput = () => {
    setIsInputMode(false);
    setInputValue('');
    setIsInvalid(false);
  };

  const getCenterPages = () => {
    const pages = [];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const centerPages = getCenterPages();

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-center space-x-2 text-white">
        <div className="flex items-center justify-center w-10 h-10 border border-white font-bold">
          1
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-white select-none">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hover:opacity-70 disabled:opacity-30 p-2 flex items-center justify-center transition-opacity"
        aria-label="이전 페이지"
      >
        <Image
          src={iconBack}
          alt="이전"
          width={16}
          height={16}
          className="object-contain"
        />
      </button>

      <button
        onClick={() => handlePageChange(1)}
        className={`flex items-center justify-center w-10 h-10 border ${
          currentPage === 1
            ? 'border-white font-bold bg-white text-black'
            : 'border-transparent hover:border-gray-600'
        }`}
      >
        1
      </button>

      {isInputMode ? (
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.replace(/[^0-9]/g, ''));
            setIsInvalid(false);
          }}
          onKeyDown={handleKeyDown}
          onBlur={closeInput}
          className={`w-12 h-10 bg-gray-900 text-white text-center border rounded focus:outline-none ${
            isInvalid ? 'border-red-500' : 'border-purple-500'
          }`}
          autoFocus
          placeholder={isInvalid ? `1~${totalPages}` : '...'}
        />
      ) : (
        <>
          {currentPage > 3 && (
            <span
              onClick={() => setIsInputMode(true)}
              className="cursor-pointer text-gray-400 hover:text-purple-400 px-2"
            >
              ...
            </span>
          )}

          {centerPages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex items-center justify-center w-10 h-10 border ${
                currentPage === page
                  ? 'border-white font-bold bg-white text-black'
                  : 'border-transparent hover:border-gray-600'
              }`}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <span
              onClick={() => setIsInputMode(true)}
              className="cursor-pointer text-gray-400 hover:text-purple-400 px-2"
            >
              ...
            </span>
          )}
        </>
      )}

      <button
        onClick={() => handlePageChange(totalPages)}
        className={`flex items-center justify-center w-10 h-10 border ${
          currentPage === totalPages
            ? 'border-white font-bold bg-white text-black'
            : 'border-transparent hover:border-gray-600'
        }`}
      >
        {totalPages}
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hover:opacity-70 disabled:opacity-30 p-2 flex items-center justify-center transition-opacity"
        aria-label="다음 페이지"
      >
        <Image
          src={iconGo}
          alt="다음"
          width={16}
          height={16}
          className="object-contain"
        />
      </button>
    </div>
  );
}
