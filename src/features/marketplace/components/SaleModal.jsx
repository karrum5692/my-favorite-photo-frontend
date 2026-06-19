'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import MarketModal from '@/components/ui/MarketModal';
import PhotoCardGrid from '@/components/ui/SaleTradePhotoCardGrid';
import DetailModalWrapper from '@/components/ui/DetailModalWrapper';
import useMarketModal from '@/shared/hooks/useMarketModal';
import DetailSaleModal from './DetailSaleModal';

const SaleModal = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    cards,
    searchInput,
    setSearchInput,
    handleSearch,
    resetFilters,
    selectedGenre,
    setSelectedGenre,
    selectedGrade,
    setSelectedGrade,
  } = useMarketModal(isOpen);

  return (
    <>
      <MarketModal
        isOpen={isOpen}
        onClose={onClose}
        titleTop="마이갤러리"
        titleMain="나의 포토카드 판매하기"
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
            options: [
              '전체',
              'FAN_SIGN',
              'FAN_MEETING',
              'ALBUM',
              'SPECIAL',
              'CONCERT',
              'MD',
              'COLLABORATION',
              'FAN_CLUB',
              'OTHER',
              'SEASON_GREETING',
            ],
            onChange: setSelectedGenre,
          },
        ]}
      >
        <PhotoCardGrid
          cards={cards}
          onCardClick={(card) => setSelectedCard(card)}
        />
      </MarketModal>

      <DetailModalWrapper
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      >
        {selectedCard && (
          <DetailSaleModal
            currentUrl={selectedCard.imageUrl}
            card={selectedCard}
            cardId={selectedCard.id}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </DetailModalWrapper>
    </>
  );
};
export default SaleModal;
