'use client';

import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function ExchangeItem({
  offeredCard,
  proposer,
  message,
  cardIsSeller,
  handleAcceptProposal,
  handleRejectProposal,
  hiddenCardId,
  setHiddenCardId,
}) {
  const gradeColorMap = {
    COMMON: '#EFFF04',
    RARE: '#29C9F9',
    SUPER_RARE: '#A77EFF',
    LEGENDARY: '#FF2A6A',
  };

  if (!offeredCard?.template) {
    return null;
  }

  const { title, imageUrl, grade, genre, price } = offeredCard.template;
  const gradeColor = gradeColorMap[offeredCard.template.grade] || '#fff';
  const nickname = proposer.nickname;

  const isDisappear = hiddenCardId.includes(offeredCard?.id);

  return (
    <>
      {isDisappear ? null : (
        <article
          className="
        bg-gray-500
        border border-gray-500
        rounded-lg
        overflow-hidden
        flex flex-col
        w-full
        cursor-pointer
        hover:border-gray-800
        transition-colors
        /* 고정 높이 대신 내부 패딩 균형으로 시안 비율 유지 */
        h-auto
      "
        >
          {/*  IMAGE AREA */}
          <div className="px-[12px] pt-[12px] md:px-[30px] lg:px-[40px] md:pt-[30px] lg:pt-[40px]">
            <div
              className="
            relative w-full bg-[#2A2A2A] rounded-sm overflow-hidden
            h-[112px]
            md:h-[227px]
            lg:h-[270px]
          "
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* 📝 CONTENT AREA */}
          <div
            className="
          flex flex-col flex-1
          px-[12px] pb-[16px] pt-[10px]
          md:px-[30px] md:pb-[30px] md:pt-[16px]
          lg:px-[40px] lg:pb-[40px]
        "
          >
            {/* TITLE */}
            <h3 className="text-white font-bold text-[13px] md:text-[20px] lg:text-[22px] leading-tight truncate">
              {title}
            </h3>

            {/* GRADE / GENRE / NICKNAME */}
            <div className="flex justify-between items-center mt-[4px] md:mt-[6px] text-[10px] md:text-[14px] leading-none">
              <div className="flex items-center gap-[4px]">
                <span style={{ color: gradeColor }} className="font-bold">
                  {grade}
                </span>
                <span className="text-[#A4A4A4]">| {genre}</span>
                <div>
                  <span className="text-white font-semibold">
                    {price?.toLocaleString()}P
                  </span>
                  <span className="text-gray-300 font-normal">에 구매</span>
                </div>
              </div>

              <span className="text-white underline whitespace-nowrap max-w-[60px] md:max-w-[120px] truncate">
                {nickname}
              </span>
            </div>

            {/* 얇은 경계선 구분 구역 (반응형 마진 적용) */}
            <div className="border-t border-gray-800 my-[10px] md:my-[20px]" />

            <div>{message}</div>
            <div>
              {cardIsSeller ? (
                <div className="flex flex-row gap-[20px] mt-[40px]">
                  <Button
                    variant="secondary"
                    weight="170"
                    height="60"
                    onClick={() => {
                      handleRejectProposal();
                      const updatdIds = [...hiddenCardId, offeredCard?.id];
                      setHiddenCardId(updatdIds);
                      localStorage.setItem(
                        'hiddenCardId',
                        JSON.stringify(updatdIds)
                      );
                    }}
                  >
                    거절하기
                  </Button>
                  <Button
                    variant="primary"
                    weight="170"
                    height="60"
                    onClick={() => {
                      handleAcceptProposal();
                      const updatdIds = [...hiddenCardId, offeredCard?.id];
                      setHiddenCardId(updatdIds);
                      localStorage.setItem(
                        'hiddenCardId',
                        JSON.stringify(updatdIds)
                      );
                    }}
                  >
                    승인하기
                  </Button>
                </div>
              ) : (
                <div className="mt-[40px]">
                  <Button variant="secondary" height="60">
                    취소하기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </article>
      )}
    </>
  );
}
