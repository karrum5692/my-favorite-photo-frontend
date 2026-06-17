'use client';

import { useEffect, useState } from 'react';

import React from 'react';

const GallerySearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  useEffect(
    function () {
      const timer = setTimeout(() => {
        onSearch(inputValue);
      }, 400);
      return function () {
        clearTimeout(timer);
      };
    },
    [inputValue]
  );
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        placeholder="검색"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className="w-full h-[44px] bg-[var(--color-black)] border border-solid border-[var(--color-white)] pl-[14px] pr-[40px] text-[14px] text-[var(--color-white)] focus:outline-none focus:border-[var(--color-white)] placeholder-[var(--color-gray-300)]"
      />
    </div>
  );
};

export default GallerySearch;
