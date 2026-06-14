'use client';

import React, { useState, useRef, useEffect } from 'react';

const GRADES = [
  { value: 'COMMON', label: 'COMMON', className: 'grade-common' },
  { value: 'RARE', label: 'RARE', className: 'grade-rare' },
  { value: 'SUPER_RARE', label: 'SUPER RARE', className: 'grade-super-rare' },
  { value: 'LEGENDARY', label: 'LEGENDARY', className: 'grade-legendary' },
];

const GENRES = [
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

const STATUSES = [
  { value: 'SELLING', label: '판매 중' },
  { value: 'SOLD', label: '매진' },
];

const ORDER_OPTIONS = [
  { value: 'price_asc', label: '낮은 가격순' },
  { value: 'price_desc', label: '높은 가격순' },
  { value: 'latest', label: '최신순' },
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
  search,
  onSearchChange,
  orderBy,
  onOrderByChange,
  filterCounts,
  totalCount = 0, // 백엔드가 연산한 원본 totalCount 수치를 직접 받습니다.
  onOpenMobileFilter,
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const containerRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('grade');
  const [tempFilter, setTempFilter] = useState(activeFilter);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleDropdownToggle = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleSelectFilter = (type, value) => {
    if (activeFilter.type === type && activeFilter.value === value) {
      onFilterChange({ type: '', value: '' });
    } else {
      //  PC에서도 다른 종류의 필터를 누르면 기존 필터가 덮어써지도록 단일 필터 규격 보장
      onFilterChange({ type, value });
    }
    setOpenDropdown(null);
  };

  const handleSelectOrder = (value) => {
    onOrderByChange(value);
    setOpenDropdown(null);
  };

  const handleMobileOptionClick = (type, value) => {
    if (tempFilter.type === type && tempFilter.value === value) {
      setTempFilter({ type: '', value: '' });
    } else {
      setTempFilter({ type, value });
    }
  };

  const handleApplyFilter = () => {
    onFilterChange(tempFilter);
    setIsMobileMenuOpen(false);
  };

  const handleResetFilter = () => {
    setTempFilter({ type: '', value: '' });
    onFilterChange({ type: '', value: '' });
  };

  const getButtonLabel = (type, defaultLabel) => {
    if (activeFilter.type !== type) return defaultLabel;
    if (type === 'grade')
      return (
        GRADES.find((g) => g.value === activeFilter.value)?.label ||
        defaultLabel
      );
    if (type === 'genre')
      return (
        GENRES.find((g) => g.value === activeFilter.value)?.label ||
        defaultLabel
      );
    if (type === 'status')
      return (
        STATUSES.find((s) => s.value === activeFilter.value)?.label ||
        defaultLabel
      );
    return defaultLabel;
  };

  const getCurrentOrderLabel = () => {
    return ORDER_OPTIONS.find((o) => o.value === orderBy)?.label || '최신순';
  };

  const getMobileOptions = () => {
    if (currentTab === 'grade') return GRADES;
    if (currentTab === 'genre') return GENRES;
    if (currentTab === 'status') return STATUSES;
    return [];
  };

  const getOptionCount = (tab, value) => {
    if (!filterCounts || !filterCounts[tab]) return 0;
    return filterCounts[tab][value] || 0;
  };

  // 하단 매핑 런타임 에러 방지 및 단순화
  const getSubmitButtonLabel = () => {
    if (tempFilter.type && tempFilter.value) {
      const count = getOptionCount(tempFilter.type, tempFilter.value);
      return `${count}개 포토보기`;
    }
    // 필터가 안 걸려있을 때는 복잡하게 꺼내서 덧셈 연산하지 않고 props의 totalCount를 신뢰합니다.
    return `${totalCount}개 포토보기`;
  };

  return (
    <div className="marketplace-controls-container" ref={containerRef}>
      {/*  검색 영역 */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="검색"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">
          <img src="images/search.png" alt="검색" width="20" height="20" />
        </span>
      </div>

      {/*  하단 필터 세션 한줄 배열 구역 */}
      <div className="filter-actions-row">
        {/* 모바일 필터 바텀시트 활성화 버튼 */}
        <button
          type="button"
          className="mobile-filter-toggle-btn"
          onClick={() => {
            setTempFilter(activeFilter);
            setIsMobileMenuOpen(true);
          }}
        >
          <img
            src="images/dropdown2.png"
            alt="모바일 필터 메뉴"
            width="35"
            height="35"
          />
        </button>

        {/*  [PC용] 필터 버튼 그룹 */}
        <div className="filter-group pc-filter-dropdown">
          <div className="dropdown-container">
            <button
              type="button"
              className={`filter-dropdown-btn ${activeFilter.type === 'grade' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('grade')}
            >
              <span>{getButtonLabel('grade', '등급')}</span>
              <span>{openDropdown === 'grade' ? '▴' : '▾'}</span>
            </button>
            {openDropdown === 'grade' && (
              <ul className="filter-popup-menu">
                {GRADES.map((g) => (
                  <li
                    key={g.value}
                    className={`filter-popup-item ${activeFilter.value === g.value ? 'selected' : ''}`}
                    onClick={() => handleSelectFilter('grade', g.value)}
                  >
                    <span>{g.label}</span>
                    <span className="pc-filter-count">
                      {getOptionCount('grade', g.value)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dropdown-container">
            <button
              type="button"
              className={`filter-dropdown-btn ${activeFilter.type === 'genre' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('genre')}
            >
              <span>{getButtonLabel('genre', '장르')}</span>
              <span>{openDropdown === 'genre' ? '▴' : '▾'}</span>
            </button>
            {openDropdown === 'genre' && (
              <ul className="filter-popup-menu">
                {GENRES.map((g) => (
                  <li
                    key={g.value}
                    className={`filter-popup-item ${activeFilter.value === g.value ? 'selected' : ''}`}
                    onClick={() => handleSelectFilter('genre', g.value)}
                  >
                    <span>{g.label}</span>
                    <span className="pc-filter-count">
                      {getOptionCount('genre', g.value)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dropdown-container">
            <button
              type="button"
              className={`filter-dropdown-btn ${activeFilter.type === 'status' ? 'active' : ''}`}
              onClick={() => handleDropdownToggle('status')}
            >
              <span>{getButtonLabel('status', '매진여부')}</span>
              <span>{openDropdown === 'status' ? '▴' : '▾'}</span>
            </button>
            {openDropdown === 'status' && (
              <ul className="filter-popup-menu">
                {STATUSES.map((s) => (
                  <li
                    key={s.value}
                    className={`filter-popup-item ${activeFilter.value === s.value ? 'selected' : ''}`}
                    onClick={() => handleSelectFilter('status', s.value)}
                  >
                    <span>{s.label}</span>
                    <span className="pc-filter-count">
                      {getOptionCount('status', s.value)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/*  정렬 드롭다운 구역 */}
        <div className="dropdown-container order-dropdown-wrapper">
          <button
            type="button"
            className="filter-dropdown-btn order-toggle-btn"
            onClick={() => handleDropdownToggle('order')}
          >
            <span>{getCurrentOrderLabel()}</span>
            <span>{openDropdown === 'order' ? '▴' : '▾'}</span>
          </button>
          {openDropdown === 'order' && (
            <ul className="filter-popup-menu right-align-menu">
              {ORDER_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  className={`filter-popup-item ${orderBy === option.value ? 'selected-item' : ''}`}
                  onClick={() => handleSelectOrder(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* [모바일 전용 바텀 시트] */}
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
                className={`bottom-sheet-tab ${currentTab === 'status' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTab('status');
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
                    <span
                      className={`filter-item-label ${
                        currentTab === 'grade' ? option.className : ''
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="filter-item-count">
                      {getOptionCount(currentTab, option.value)}개
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
                <img
                  src="/images/reset.png"
                  alt="필터 초기화"
                  width="22"
                  height="22"
                  className="reset-btn-img"
                />
              </button>
              <button
                type="button"
                className="submit-filter-btn"
                onClick={handleApplyFilter}
              >
                {getSubmitButtonLabel()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
