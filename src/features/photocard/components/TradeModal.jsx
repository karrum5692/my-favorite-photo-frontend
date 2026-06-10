'use client';

import MarketModal from '@/components/ui/MarketModal';
import useMarketModal from '@/shared/hooks/useMarketModal';

export default function TradeModal({ isOpen, onClose }) {
  const {
    cards,

    searchInput,
    setSearchInput,
    handleSearch,

    selectedGrade,
    setSelectedGrade,

    selectedGenre,
    setSelectedGenre,

    resetFilters,
  } = useMarketModal(isOpen);

  const handleModalClose = () => {
    resetFilters();
    onClose();
  };

  return (
    <MarketModal
      isOpen={isOpen}
      onClose={handleModalClose}
      titleTop="마이갤러리"
      titleMain="포토카드 교환하기"
      searchValue={searchInput}
      onSearchChange={(e) => setSearchInput(e.target.value)}
      onSearch={handleSearch}
      filters={[
        {
          label: '등급',
          value: selectedGrade,
          options: ['전체', 'COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'],
          onChange: setSelectedGrade,
        },
        {
          label: '장르',
          value: selectedGenre,
          options: ['전체', '여행', '풍경', '인물', '사물'],
          onChange: setSelectedGenre,
        },
      ]}
    >
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="
              h-[220px]
              bg-[#2A2A2A]
              rounded-lg
              flex
              items-center
              justify-center
              text-white
            "
          >
            {card.title}
          </div>
        ))}
      </div>
    </MarketModal>
  );
}
