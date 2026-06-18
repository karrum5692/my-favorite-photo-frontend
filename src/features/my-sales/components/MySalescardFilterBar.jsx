'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const GRADE_OPTIONS = [
  {
    value: 'COMMON',
    label: 'COMMON',
    color: '#EFFF04',
    className: 'grade-common',
  },
  { value: 'RARE', label: 'RARE', color: '#29C9F9', className: 'grade-rare' },
  {
    value: 'SUPER_RARE',
    label: 'SUPER RARE',
    color: '#A77EFF',
    className: 'grade-super-rare',
  },
  {
    value: 'LEGENDARY',
    label: 'LEGENDARY',
    color: '#FF2A6A',
    className: 'grade-legendary',
  },
];

const GENRE_OPTIONS = [
  { value: 'ALBUM', label: '앨범' },
  { value: 'SPECIAL', label: '특전' },
  { value: 'FAN_SIGN', label: '팬싸' },
  { value: 'SEASON_GREETING', label: '시즌그리팅' },
  { value: 'FAN_MEETING', label: '팬미팅' },
  { value: 'CONCERT', label: '콘서트' },
  { value: 'MD', label: 'MD' },
  { value: 'COLLABORATION', label: '콜라보' },
  { value: 'FAN_CLUB', label: '팬클럽' },
  { value: 'OTHER', label: '기타' },
];

const SOLD_OUT_OPTIONS = [
  { value: 'SELLING', label: '판매 중' },
  { value: 'SOLD', label: '판매 완료' },
];

function DropdownFilter({
  label,
  options,
  value,
  onChange,
  showGradeColor = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const selectedOpt = options.find((opt) => opt.value === value);
  const selectedLabel = selectedOpt?.value ? selectedOpt.label : null;
  const selectedColor =
    showGradeColor && selectedOpt?.color ? selectedOpt.color : null;

  return (
    <div className="my-sales-dropdown-container" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="my-sales-dropdown-btn"
        style={selectedColor ? { color: selectedColor } : {}}
      >
        {selectedLabel || label}
        <Image
          src="/images/dropdown.png"
          alt="드롭다운"
          width={12}
          height={12}
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.15s',
          }}
        />
      </button>

      {open && (
        <div className="my-sales-dropdown-menu">
          {options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(isSelected ? '' : opt.value);
                  setOpen(false);
                }}
                className={`my-sales-dropdown-item ${isSelected ? 'selected' : ''}`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MySalesFilterBar({
  filters,
  updateFilter,
  searchInput,
  setSearchInput,
  onSearchSubmit,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('grade');
  const [tempFilter, setTempFilter] = useState({ type: '', value: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilter('search', searchInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, updateFilter]);

  // PC 필터: 한 번에 하나만 선택 (다른 필터 초기화)
  const handlePcFilterChange = (type, value) => {
    updateFilter('grade', type === 'grade' ? value : '');
    updateFilter('genre', type === 'genre' ? value : '');
    updateFilter('soldOut', type === 'soldOut' ? value : '');
  };

  const getMobileOptions = () => {
    if (currentTab === 'grade') return GRADE_OPTIONS;
    if (currentTab === 'genre') return GENRE_OPTIONS;
    if (currentTab === 'soldOut') return SOLD_OUT_OPTIONS;
    return [];
  };

  const handleMobileOptionClick = (type, value) => {
    if (tempFilter.type === type && tempFilter.value === value) {
      setTempFilter({ type: '', value: '' });
    } else {
      setTempFilter({ type, value });
    }
  };

  const handleApplyFilter = () => {
    updateFilter('grade', tempFilter.type === 'grade' ? tempFilter.value : '');
    updateFilter('genre', tempFilter.type === 'genre' ? tempFilter.value : '');
    updateFilter(
      'soldOut',
      tempFilter.type === 'soldOut' ? tempFilter.value : ''
    );
    setIsMobileMenuOpen(false);
  };

  const handleResetFilter = () => {
    setTempFilter({ type: '', value: '' });
    updateFilter('grade', '');
    updateFilter('genre', '');
    updateFilter('soldOut', '');
  };

  return (
    <>
      <div className="my-sales-filter-bar">
        {/* 검색 */}
        <form onSubmit={onSearchSubmit} className="my-sales-search-form">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="검색"
            className="my-sales-search-input"
          />
          <button type="submit" className="my-sales-search-btn">
            <Image src="/images/search.png" alt="검색" width={20} height={20} />
          </button>
        </form>

        {/* 모바일 필터 버튼 */}
        <button
          type="button"
          className="mobile-filter-toggle-btn"
          onClick={() => {
            setTempFilter({ type: '', value: '' });
            setIsMobileMenuOpen(true);
          }}
        >
          <Image
            src="/images/dropdown2.png"
            alt="필터"
            width={35}
            height={35}
          />
        </button>

        {/* PC 드롭다운 필터 - 색상 없음, 한 번에 하나만 */}
        <div className="pc-filter-dropdown flex gap-[12px]">
          <DropdownFilter
            label="등급"
            options={GRADE_OPTIONS}
            value={filters.grade}
            onChange={(v) => handlePcFilterChange('grade', v)}
            showGradeColor={false}
          />
          <DropdownFilter
            label="장르"
            options={GENRE_OPTIONS}
            value={filters.genre}
            onChange={(v) => handlePcFilterChange('genre', v)}
          />
          <DropdownFilter
            label="매진여부"
            options={SOLD_OUT_OPTIONS}
            value={filters.soldOut}
            onChange={(v) => handlePcFilterChange('soldOut', v)}
          />
        </div>
      </div>

      {/* 모바일 바텀시트 - 등급 색상 있음 */}
      {isMobileMenuOpen && (
        <div
          className="mobile-bottom-sheet-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="mobile-bottom-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bottom-sheet-header">
              <span className="bottom-sheet-title">필터</span>
              <button
                type="button"
                className="bottom-sheet-close-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="bottom-sheet-tabs">
              <button
                type="button"
                className={`bottom-sheet-tab ${currentTab === 'grade' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTab('grade');
                  setTempFilter({ type: '', value: '' });
                }}
              >
                등급
              </button>
              <button
                type="button"
                className={`bottom-sheet-tab ${currentTab === 'genre' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTab('genre');
                  setTempFilter({ type: '', value: '' });
                }}
              >
                장르
              </button>
              <button
                type="button"
                className={`bottom-sheet-tab ${currentTab === 'soldOut' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTab('soldOut');
                  setTempFilter({ type: '', value: '' });
                }}
              >
                매진 여부
              </button>
            </div>

            <div className="bottom-sheet-list">
              {getMobileOptions().map((option) => {
                const isSelected =
                  tempFilter.type === currentTab &&
                  tempFilter.value === option.value;
                return (
                  <div
                    key={option.value}
                    className={`bottom-sheet-item ${isSelected ? 'selected' : ''}`}
                    onClick={() =>
                      handleMobileOptionClick(currentTab, option.value)
                    }
                  >
                    {/* 모바일 등급은 색상 표시 */}
                    <span
                      className={currentTab === 'grade' ? option.className : ''}
                    >
                      {option.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="bottom-sheet-footer">
              <button
                type="button"
                className="reset-icon-btn"
                onClick={handleResetFilter}
              >
                <Image
                  src="/images/reset.png"
                  alt="초기화"
                  width={22}
                  height={22}
                />
              </button>
              <button
                type="button"
                className="submit-filter-btn"
                onClick={handleApplyFilter}
              >
                포토 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
