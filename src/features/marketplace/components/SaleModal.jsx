import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import MarketModal from '@/components/ui/MarketModal';
import PhotoCardGrid from '@/components/ui/PhotoCardGrid';
import DetailModalWrapper from '@/components/ui/DetailModalWrapper';
import useMarketModal from '@/shared/hooks/useMarketModal';
import DetailSale from './DetailSale';

const SaleModal = ({ isOpen, onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    searchInput,
    setSearchInput,
    handleSearch,
    resetFilters,
    selectedGenre,
    setSelectedGenre,
    selectedGrade,
    setSelectedGrade,
  } = useMarketModal(isOpen);

  async function getMyCard() {
    try {
      const token =
        localStorage.getItem('accessToken') || localStorage.getItem('token');

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/market/mycard`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message);
      }

      const myCard = await res.json();

      return myCard.data.map((c) => {
        return {
          id: c.id,
          quantity: c.quantity,
          title: c.template.title,
          genre: c.template.genre,
          grade: c.template.grade,
          imageUrl: c.template.imageUrl,
          price: c.template.price,
          nickname: c.owner.nickname,
        };
      });
    } catch (error) {
      alert(error.message);
    }
  }

  const {
    data: myCards,
    isPending,
    error,
  } = useQuery({ queryKey: ['myCards'], queryFn: getMyCard });

  console.log('data:', myCards);

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
          cards={myCards}
          onCardClick={(card) => setSelectedCard(card)}
        />
      </MarketModal>

      <DetailModalWrapper
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
      >
        {selectedCard && (
          <DetailSale
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
