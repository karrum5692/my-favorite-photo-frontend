'use client';
import React, { useState, useRef, useEffect } from 'react';
import '../../../styles/market.css';

const GRADES = [
  { value: 'COMMON', label: 'COMMON' },
  { value: 'RARE', label: 'RARE' },
  { value: 'SUPER_RARE', label: 'SUPER RARE' },
  { value: 'LEGENDARY', label: 'LEGENDARY' },
];

const GENRES = [
  { value: 'ALBUM', label: 'ALBUM' },
  { value: 'SPECIAL', label: 'SPECIAL' },
  { value: 'FAN_SIGN', label: 'FAN_SIGN' },
  { value: 'SEASON_GREETING', label: 'SEASON_GREETING' },
  { value: 'FAN_MEETING', label: 'FAN_MEETING' },
  { value: 'CONCERT', label: 'CONCERT' },
  { value: 'MD', label: 'MD' },
  { value: 'COLLABORATION', label: 'COLLABORATION' },
  { value: 'FAN_CLUB', label: 'FAN_CLUB' },
  { value: 'OTHER', label: 'OTHER' },
];

const GalleryFilter = ({ grade, genre, onGradeChange, onGenreChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleToggle = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const getGradeLabel = () =>
    GRADES.find((g) => g.value === grade)?.label || '등급';

  const getGenreLabel = () =>
    GENRES.find((g) => g.value === genre)?.label || '장르';

  return (
    <div className="filter-group" ref={ref}>
      <div className="dropdown-container">
        <button
          type="button"
          className={`filter-dropdown-btn ${grade ? 'active' : ''}`}
          onClick={() => handleToggle('grade')}
        >
          <span>{getGradeLabel()}</span>
          <span>{openDropdown === 'grade' ? '▴' : '▾'}</span>
        </button>
        {openDropdown === 'grade' && (
          <ul className="filter-popup-menu">
            <li
              className={`filter-popup-item ${!grade ? 'selected' : ''}`}
              onClick={() => {
                onGradeChange('');
                setOpenDropdown(null);
              }}
            >
              전체
            </li>
            {GRADES.map((g) => (
              <li
                key={g.value}
                className={`filter-popup-item ${grade === g.value ? 'selected' : ''}`}
                onClick={() => {
                  onGradeChange(g.value);
                  setOpenDropdown(null);
                }}
              >
                <span>{g.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dropdown-container">
        <button
          type="button"
          className={`filter-dropdown-btn ${genre ? 'active' : ''}`}
          onClick={() => handleToggle('genre')}
        >
          <span>{getGenreLabel()}</span>
          <span>{openDropdown === 'genre' ? '▴' : '▾'}</span>
        </button>
        {openDropdown === 'genre' && (
          <ul className="filter-popup-menu">
            <li
              className={`filter-popup-item ${!genre ? 'selected' : ''}`}
              onClick={() => {
                onGenreChange('');
                setOpenDropdown(null);
              }}
            >
              전체
            </li>
            {GENRES.map((g) => (
              <li
                key={g.value}
                className={`filter-popup-item ${genre === g.value ? 'selected' : ''}`}
                onClick={() => {
                  onGenreChange(g.value);
                  setOpenDropdown(null);
                }}
              >
                {g.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GalleryFilter;
