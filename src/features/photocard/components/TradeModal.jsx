'use client';

import MarketModal from '@/components/ui/MarketModal';
import PhotoCardGrid from '@/components/ui/PhotoCardGrid';
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

  return (
    <MarketModal
      isOpen={isOpen}
      onClose={onClose}
      titleTop="마이갤러리"
      titleMain="포토카드 교환하기"
      searchValue={searchInput}
      onSearchChange={(e) => setSearchInput(e.target.value)}
      onSearch={handleSearch}
      onReset={resetFilters}
      filters={[
        {
          label: '등급',
          value: selectedGrade,
          options: ['전체', 'COMMON', 'RARE', 'SUPER_RARE', 'LEGENDARY'],
          onChange: setSelectedGrade,
        },
        {
          label: '장르',
          value: selectedGenre,
          options: ['전체', 'FAN_SIGN', 'FAN_MEETING', 'ALBUM', 'SPECIAL'],
          onChange: setSelectedGenre,
        },
      ]}
    >
      <PhotoCardGrid variant="gallery" cards={cards} />
    </MarketModal>
  );
}
