'use client';

import { useEffect, useMemo, useState } from 'react';

export default function useMarketModal(isOpen) {
  const [cards, setCards] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedGenre, setSelectedGenre] = useState('전체');

  useEffect(() => {
    if (!isOpen) return;

    const fetchCards = async () => {
      try {
        const token =
          localStorage.getItem('accessToken') || localStorage.getItem('token');
        console.log('토큰:', accessToken);
        if (!token) {
          console.warn('토큰 없음');
          setCards([]);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me/cards`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          console.error('API 실패:', res.status);
          setCards([]);
          return;
        }

        const data = await res.json();

        setCards(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('카드 로딩 실패:', e);
        setCards([]);
      }
    };

    fetchCards();
  }, [isOpen]);

  const filteredCards = useMemo(() => {
    const safe = Array.isArray(cards) ? cards : [];

    let result = [...safe];

    if (search.trim()) {
      result = result.filter((c) =>
        c.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedGrade !== '전체') {
      result = result.filter((c) => c.grade === selectedGrade);
    }

    if (selectedGenre !== '전체') {
      result = result.filter((c) => c.genre === selectedGenre);
    }

    return result;
  }, [cards, search, selectedGrade, selectedGenre]);

  return {
    cards: filteredCards,
    searchInput,
    setSearchInput,
    search,
    setSearch,
    selectedGrade,
    setSelectedGrade,
    selectedGenre,
    setSelectedGenre,
  };
}
