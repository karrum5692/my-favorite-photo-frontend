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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me/cards`,
          {
            credentials: 'include',
          }
        );

        const data = await res.json();

        setCards(data.cards ?? data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [isOpen]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearch('');
    setSelectedGrade('전체');
    setSelectedGenre('전체');
  };

  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (search.trim()) {
      result = result.filter((card) =>
        card.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedGrade !== '전체') {
      result = result.filter((card) => card.grade === selectedGrade);
    }

    if (selectedGenre !== '전체') {
      result = result.filter((card) => card.genre === selectedGenre);
    }

    return result;
  }, [cards, search, selectedGrade, selectedGenre]);

  return {
    cards: filteredCards,

    searchInput,
    setSearchInput,
    handleSearch,

    selectedGrade,
    setSelectedGrade,

    selectedGenre,
    setSelectedGenre,

    resetFilters,
  };
}
