'use client';
import React, { useState } from 'react';

const GalleryFilter = ({ grade, genre, onGenreChange, onGradeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const GRADES = ['COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'];
  const GENRES = [
    'ALBUM',
    'SPECIAL',
    'FAN_SIGN',
    'SEASON_GREETING',
    'FAN_MEETING',
    'CONCERT',
    'MD',
    'COLLABORATION',
    'FAN_CLUB',
    'OTHER',
  ];
  return (
    <div>
      <button
        onClick={function () {
          setIsOpen(!isOpen);
        }}
      >
        등급
      </button>
      <button
        onClick={function () {
          setIsOpen2(!isOpen2);
        }}
      >
        장르
      </button>
      {isOpen && (
        <ul>
          {GRADES.map((g) => {
            return (
              <li
                key={g}
                onClick={function () {
                  onGradeChange(g);
                  setIsOpen(false);
                }}
              >
                {g}
              </li>
            );
          })}
        </ul>
      )}
      {isOpen2 && (
        <ul>
          {GENRES.map((i) => {
            return (
              <li
                key={i}
                onClick={function () {
                  onGenreChange(i);
                  setIsOpen2(false);
                }}
              >
                {i}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GalleryFilter;
