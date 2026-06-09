'use client';

import MarketModal from '@/components/ui/MarketModal';
import useTradeCards from '@/shared/hooks/useMarketModal';

export default function TradeModal({ isOpen, onClose }) {
  const {
    cards,
    search,
    setSearch,
    selectedGrade,
    setSelectedGrade,
    selectedGenre,
    setSelectedGenre,
    gradeOpen,
    setGradeOpen,
    genreOpen,
    setGenreOpen,
  } = useTradeCards(isOpen);

  return (
    <MarketModal
      isOpen={isOpen}
      onClose={onClose}
      titleTop="마이갤러리"
      titleMain="포토카드 교환하기"
      searchUI={
        <div className="relative w-[320px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full h-[45px]
              px-5 pr-10
              bg-[#0F0F0F]
              border border-[#DDD]
              text-white
              rounded-[2px]
              outline-none
              font-[var(--font-sans)]
            "
            placeholder="검색"
          />

          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            <img src="/images/search_icon.svg" />
          </button>
        </div>
      }
      filterUI={
        <>
          {/* GRADE */}
          <div className="relative font-[var(--font-sans)]">
            <button
              onClick={() => {
                setGradeOpen(!gradeOpen);
                setGenreOpen(false);
              }}
              className="text-white"
            >
              등급 ▼
            </button>

            {gradeOpen && (
              <div
                className="
                absolute top-full mt-2
                bg-[#0F0F0F]
                border border-white
                rounded-[2px]
                z-10
              "
              >
                {['전체', 'COMMON', 'RARE', 'SUPER RARE', 'LEGENDARY'].map(
                  (v) => (
                    <button
                      key={v}
                      onClick={() => {
                        setSelectedGrade(v);
                        setGradeOpen(false);
                      }}
                      className="
                      block px-4 py-2
                      text-white
                      hover:bg-[#1A1A1A]
                      whitespace-nowrap
                    "
                    >
                      {v}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* GENRE */}
          <div className="relative font-[var(--font-sans)]">
            <button
              onClick={() => {
                setGenreOpen(!genreOpen);
                setGradeOpen(false);
              }}
              className="text-white"
            >
              장르 ▼
            </button>

            {genreOpen && (
              <div
                className="
                absolute top-full mt-2
                bg-[#0F0F0F]
                border border-white
                rounded-[2px]
                z-10
              "
              >
                {['전체', '여행', '풍경', '인물', '사물'].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setSelectedGenre(v);
                      setGenreOpen(false);
                    }}
                    className="
                      block px-4 py-2
                      text-white
                      hover:bg-[#1A1A1A]
                      whitespace-nowrap
                    "
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      }
    >
      {/* 카드 UI는 그대로 */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="h-[220px] bg-[#2A2A2A] rounded-lg flex items-center justify-center text-white"
          >
            {card.title}
          </div>
        ))}
      </div>
    </MarketModal>
  );
}
