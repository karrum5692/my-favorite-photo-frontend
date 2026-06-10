'use client';

import { useState } from 'react';
import Image from 'next/image';

import searchIcon from '@/assets/icons/icon-search.png';
import closeIcon from '@/assets/icons/icon-close.png';

export default function MarketModal({
  isOpen,
  onClose,

  titleTop,
  titleMain,

  searchValue,
  onSearchChange,
  onSearch,

  filters = [],

  children,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveDropdown(null);
    onClose?.();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
    >
      <div className="py-[30px] md:py-[40px]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            mx-auto
            w-[375px]
            md:w-[744px]
            xl:w-[1160px]
            h-[812px]
            md:h-[1093px]
            xl:h-[1000px]
            bg-[#161616]
            rounded-[2px]
            flex
            flex-col
            overflow-hidden
            relative
            font-[var(--font-sans)]
          "
        >
          {/* CLOSE */}
          <button
            onClick={handleClose}
            className="
              absolute
              top-4
              right-4
              z-50
              w-9
              h-9
              cursor-pointer
            "
          >
            <Image
              src={closeIcon}
              alt="닫기"
              width={36}
              height={36}
              className="w-full h-full"
            />
          </button>

          {/* SCROLL */}
          <div
            className="
              flex-1
              overflow-y-auto
              [&::-webkit-scrollbar]:w-[8px]
              [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
              [&::-webkit-scrollbar-thumb]:rounded-[2px]
            "
          >
            <div className="mx-auto w-[345px] md:w-[704px] xl:w-[920px] py-8">
              {/* TOP TEXT */}
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-gray-300
                  text-[14px]
                  md:text-[16px]
                  xl:text-[24px]
                  mb-5
                  mt-5
                "
              >
                {titleTop}
              </div>

              {/* MAIN TITLE */}
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="
                  text-white
                  text-[26px]
                  md:text-[40px]
                  xl:text-[46px]
                  font-bold
                  border-b
                  border-white
                  pb-5
                  mb-6
                "
              >
                {titleMain}
              </h2>

              {/* SEARCH + FILTER */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                {/* SEARCH */}
                <div className="relative w-[320px]">
                  <input
                    value={searchValue}
                    onChange={onSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onSearch?.();
                      }
                    }}
                    placeholder="검색"
                    className="
                      w-full
                      h-[45px]
                      px-5
                      pr-10
                      bg-[#0F0F0F]
                      border
                      border-[#DDD]
                      text-white
                      rounded-[2px]
                      outline-none
                      font-[var(--font-sans)]
                    "
                  />

                  <button
                    onClick={onSearch}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      cursor-pointer
                    "
                  >
                    <Image src={searchIcon} alt="검색" width={20} height={20} />
                  </button>
                </div>

                {/* FILTERS */}
                {filters.map((filter) => (
                  <FilterDropdown
                    key={filter.label}
                    label={filter.label}
                    value={filter.value}
                    options={filter.options}
                    onChange={filter.onChange}
                    open={activeDropdown === filter.label}
                    onToggle={() =>
                      setActiveDropdown(
                        activeDropdown === filter.label ? null : filter.label
                      )
                    }
                  />
                ))}
              </div>

              {/* CONTENT */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ label, value, options, onChange, open, onToggle }) {
  return (
    <div className="relative font-[var(--font-sans)]">
      <button
        onClick={onToggle}
        className="
          text-white
          flex
          items-center
          gap-1
          text-[14px]
          md:text-[16px]
          xl:text-[18px]
          cursor-pointer
        "
      >
        <span>{label}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          className="
            absolute
            top-full
            mt-2
            bg-[#0F0F0F]
            border
            border-white
            rounded-[2px]
            z-50
            min-w-[160px]
          "
        >
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                onToggle();
              }}
              className="
                block
                w-full
                text-left
                px-4
                py-2
                text-white
                hover:bg-[#1A1A1A]
                whitespace-nowrap
                cursor-pointer
              "
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
