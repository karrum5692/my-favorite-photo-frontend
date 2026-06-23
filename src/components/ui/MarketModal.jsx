'use client';

import { useState } from 'react';
import Image from 'next/image';

import searchIcon from '@/assets/icons/icon-search.png';
import closeIcon from '@/assets/icons/icon-close.png';
import filterIcon from '@/assets/icons/icon-filter.png';

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setActiveDropdown(null);
    setMobileFilterOpen(false);
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
          "
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-9 h-9"
          >
            <Image src={closeIcon} alt="닫기" width={36} height={36} />
          </button>

          <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A] [&::-webkit-scrollbar-thumb]:rounded-[2px]">
            <div className="mx-auto w-[345px] md:w-[704px] xl:w-[920px] py-8">
              <div className="font-display text-gray-300 text-[14px] md:text-[16px] xl:text-[24px] mb-5 mt-5">
                {titleTop}
              </div>

              <h2 className="text-white text-[26px] md:text-[40px] xl:text-[46px] font-bold border-b border-white pb-5 mb-6">
                {titleMain}
              </h2>

              <div className="relative">
                <div className="md:hidden flex items-center gap-2 w-full">
                  <button
                    onClick={() => setMobileFilterOpen((v) => !v)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Image
                      src={filterIcon}
                      alt="filter"
                      width={18}
                      height={18}
                    />
                  </button>

                  <div className="relative flex-1">
                    <input
                      value={searchValue}
                      onChange={onSearchChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') onSearch?.();
                      }}
                      placeholder="검색"
                      className="w-full h-[40px] px-4 pr-10 bg-[#0F0F0F] border border-[#DDD] text-white rounded-[2px]"
                    />

                    <button
                      onClick={onSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Image
                        src={searchIcon}
                        alt="검색"
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>
                </div>

                {mobileFilterOpen && (
                  <>
                    <div
                      className="fixed inset-0 bg-black/40 z-40"
                      onClick={() => setMobileFilterOpen(false)}
                    />

                    <div className="absolute left-0 right-0 top-[60px] z-50 bg-[#0F0F0F] border border-white rounded-[2px] p-3 shadow-lg">
                      {filters.map((filter) => (
                        <div key={filter.label} className="mb-3 last:mb-0">
                          <div className="text-white text-sm mb-1">
                            {filter.label}
                          </div>

                          <select
                            value={filter.value}
                            onChange={(e) => filter.onChange(e.target.value)}
                            className="w-full bg-black text-white p-2 border border-gray-700 rounded"
                          >
                            {filter.options.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="hidden md:flex items-center gap-4 mt-6">
                <div className="relative w-[320px]">
                  <input
                    value={searchValue}
                    onChange={onSearchChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') onSearch?.();
                    }}
                    placeholder="검색"
                    className="w-full h-[45px] px-5 pr-10 bg-[#0F0F0F] border border-[#DDD] text-white rounded-[2px]"
                  />

                  <button
                    onClick={onSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Image src={searchIcon} alt="검색" width={20} height={20} />
                  </button>
                </div>

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

              <div
                className="
                  mt-6
                  h-[500px]
                  md:h-[700px]
                  xl:h-[650px]
                  overflow-y-auto
                  [&::-webkit-scrollbar]:w-[8px]
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
                  [&::-webkit-scrollbar-thumb]:rounded-[2px]
                "
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterDropdown({ label, options, onChange, open, onToggle }) {
  return (
    <div className="relative text-white">
      <button onClick={onToggle} className="flex items-center gap-1">
        {label} <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 bg-[#0F0F0F] border border-white z-50">
          {options.map((item) => (
            <button
              key={item}
              onClick={() => {
                onChange(item);
                onToggle();
              }}
              className="block px-4 py-2 hover:bg-[#1A1A1A]"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
