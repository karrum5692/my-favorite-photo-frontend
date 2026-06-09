import PhotoCardItem from '@/components/ui/PhotoCardItem';

export default function PhotoCardGrid({
  variant = 'market',
  cards = [],
  isLoading = false,
}) {
  // 375px / 744px / 1920px
  const gridClassName =
    'grid justify-center justify-items-center mx-auto w-full ' +
    'grid-cols-2 gap-x-2 gap-y-4 px-2.5 ' +
    'md:grid-cols-2 md:gap-x-4 md:gap-y-8 md:px-5 ' +
    'lg:grid-cols-3 lg:gap-x-[80px] lg:gap-y-[60px] lg:max-w-[1480px] lg:px-0';

  // 로딩 스켈레톤
  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1E1E1E] border border-gray-800 rounded-lg overflow-hidden animate-pulse flex flex-col justify-between
              w-[170px] h-[234px] 
              md:w-[342px] md:h-[517px] 
              lg:w-[440px] lg:h-[600px]"
          >
            {/* 이미지 플레이스홀더 */}
            <div
              className="bg-gray-700 rounded-sm mx-auto shrink-0
              w-[150px] h-[112px] mt-2.5
              md:w-[302px] md:h-[226.5px] md:mt-4
              lg:w-[360px] lg:h-[270px] lg:mt-6"
            />

            {/* 텍스트 영역 플레이스홀더 */}
            <div className="flex flex-col flex-1 justify-between p-2.5 pt-1.5 md:p-5 lg:p-6">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                  {variant !== 'gallery' && (
                    <div className="h-3 bg-gray-700 rounded w-1/4" />
                  )}
                </div>
                <div className="h-4 bg-gray-700 rounded w-3/4" />
              </div>
              <div className="flex flex-col gap-1.5 pt-1.5 md:pt-2 border-t border-gray-800">
                <div className="h-3 bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-700 rounded w-2/3" />
              </div>
              <div className="hidden md:block pt-2 mt-1 border-t border-transparent h-[15px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 데이터 없음
  if (!cards.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 w-full">
        <p className="text-gray-400 text-sm font-medium">
          등록된 포토카드가 없습니다.
        </p>
      </div>
    );
  }

  // 실제 데이터 렌더링
  return (
    <div className={gridClassName}>
      {cards.map((card) => (
        <PhotoCardItem
          key={card.id}
          variant={variant}
          id={card.id}
          imageUrl={card.imageUrl}
          title={card.title}
          grade={card.grade}
          genre={card.genre}
          price={card.price}
          status={card.status}
          sellerNickname={card.sellerNickname ?? card.nickname}
          remainQuantity={card.remainQuantity}
          totalQuantity={card.totalQuantity}
          quantity={card.quantity}
          statusBadge={card.statusBadge}
        />
      ))}
    </div>
  );
}
