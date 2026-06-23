'use client';

import { useState } from 'react';
import MarketModal from '@/components/ui/MarketModal';
import PhotoCardGrid from '@/components/ui/SaleTradePhotoCardGrid';
import PhotoCardItem from '@/components/ui/PhotoCardItem';
import DetailModalWrapper from '@/components/ui/DetailModalWrapper';
import useMarketModal from '@/shared/hooks/useMarketModal';

export default function TradeModal({ isOpen, onClose, targetListingId }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [proposalText, setProposalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePropose = async () => {
    if (!selectedCard) {
      alert('제시할 카드를 먼저 선택해 주세요.');
      return;
    }
    if (!proposalText.trim()) {
      alert('교환 제안 내용을 입력해 주세요.');
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const token = localStorage.getItem('accessToken');

    setIsSubmitting(true);
    try {
      // 이제 URL에 targetListingId를, Body에 selectedCard.id를 전달합니다.
      const response = await fetch(
        `${baseUrl}/market/listings/${targetListingId}/proposals`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            offeredCardId: selectedCard.id,
            message: proposalText,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '서버 응답 오류');
      }

      alert('교환 신청이 성공적으로 전송되었습니다!');
      setSelectedCard(null);
      setProposalText('');
      onClose();
    } catch (error) {
      console.error('전송 실패:', error);
      alert(`전송 실패: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MarketModal
        isOpen={isOpen}
        onClose={onClose}
        titleTop="마이갤러리"
        titleMain="교환할 카드 선택"
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
          <div className="flex flex-col gap-8 p-6 md:p-12 w-full h-full overflow-y-auto">
            <div className="border-b border-white pb-4">
              <h2 className="text-gray-300 text-lg font-bold">교환 제안하기</h2>
              <p className="text-white text-3xl font-extrabold mt-2 tracking-tight">
                {selectedCard.title}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full">
              <div className="flex justify-center shrink-0">
                <PhotoCardItem {...selectedCard} />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <h2 className="text-white text-xl font-bold mb-4">
                    교환 제안 내용
                  </h2>
                  <textarea
                    value={proposalText}
                    onChange={(e) => setProposalText(e.target.value)}
                    className="w-full md:w-[435px] h-[200px] bg-[#0F0F0F] border border-white rounded-md p-4 text-white resize-none"
                    placeholder="상대방에게 전달할 내용을 입력하세요."
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="w-full md:w-[210px] h-[60px] border border-white text-white rounded-md"
                  >
                    취소하기
                  </button>
                  <button
                    onClick={handlePropose}
                    disabled={isSubmitting}
                    className="w-full md:w-[210px] h-[60px] bg-[#EFFF04] text-black font-bold rounded-md disabled:opacity-50"
                  >
                    {isSubmitting ? '전송 중...' : '교환 신청하기'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailModalWrapper>
    </>
  );
}
