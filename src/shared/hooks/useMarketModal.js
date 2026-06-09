import { useEffect, useMemo, useState } from 'react';

export default function useMarketModal(isOpen) {
  const [cards, setCards] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedGenre, setSelectedGenre] = useState('전체');

  const [gradeOpen, setGradeOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  // 📌 API fetch
  useEffect(() => {
    if (!isOpen) return;

    const fetchCards = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me/cards`,
          {
            credentials: 'include',
          }
        );
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCards();
  }, [isOpen]);

  // 📌 검색 실행
  const handleSearch = () => {
    setSearch(searchInput);
  };

  // 📌 필터 + 정렬
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // 검색
    if (search.trim()) {
      result = result.filter((c) =>
        c.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 등급 필터
    if (selectedGrade !== '전체') {
      result = result.filter((c) => c.grade === selectedGrade);
    }

    // 장르 필터
    if (selectedGenre !== '전체') {
      result = result.filter((c) => c.genre === selectedGenre);
    }

    // 정렬
    const gradeOrder = {
      LEGENDARY: 4,
      'SUPER RARE': 3,
      RARE: 2,
      COMMON: 1,
    };

    result.sort(
      (a, b) => (gradeOrder[b.grade] ?? 0) - (gradeOrder[a.grade] ?? 0)
    );

    return result;
  }, [cards, search, selectedGrade, selectedGenre]);

  return {
    cards: filteredCards,

    searchInput,
    setSearchInput,
    search,
    setSearch,
    handleSearch,

    selectedGrade,
    setSelectedGrade,
    gradeOpen,
    setGradeOpen,

    selectedGenre,
    setSelectedGenre,
    genreOpen,
    setGenreOpen,
  };
}
