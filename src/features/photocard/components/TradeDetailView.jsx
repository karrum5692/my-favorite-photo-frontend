'use client';
import Image from 'next/image';

export default function TradeDetailView({ card, onCancel }) {
  if (!card) return null;

  return (
    <div className="flex flex-col md:flex-row w-full gap-6 md:gap-12 animate-in fade-in duration-300">
      {/* 좌측: 카드 이미지 및 정보 */}
      <div className="w-full md:w-[440px] flex flex-col items-center md:items-start">
        <div className="relative w-full aspect-[440/310] bg-[#2A2A2A] rounded-lg overflow-hidden mb-6">
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full px-2">
          <h2 className="text-white text-[24px] md:text-[32px] font-bold mb-2">
            {card.title}
          </h2>
          <div className="flex items-center gap-2 text-[14px] md:text-[18px] mb-6">
            <span className="text-[#A77EFF] font-bold">{card.grade}</span>
            <span className="text-gray-500">| {card.genre}</span>
            <span className="ml-auto text-white underline">
              {card.nickname || '판매자'}
            </span>
          </div>

          <div className="space-y-4 border-t border-gray-800 pt-6 text-[14px] md:text-[18px]">
            <div className="flex justify-between text-white">
              <span className="text-gray-500">가격</span>
              <span>{card.price?.toLocaleString()} P</span>
            </div>
            <div className="flex justify-between text-white">
              <span className="text-gray-500">수량</span>
              <span>{card.quantity}</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <span className="text-[#EFFF04] font-bold text-[18px]">
              최애의포토
            </span>
          </div>
        </div>
      </div>

      {/* 우측: 교환 제시 내용 및 버튼 */}
      <div className="flex-1 flex flex-col mt-4 md:mt-0">
        <div className="bg-[#1A1A1A] rounded-lg p-6 flex flex-col h-full border border-gray-800">
          <label className="text-white text-[18px] font-bold mb-4">
            교환 제시 내용
          </label>
          <textarea
            className="w-full flex-1 min-h-[150px] md:min-h-[300px] bg-[#0F0F0F] border border-gray-700 rounded-md p-4 text-white focus:outline-none focus:border-[#EFFF04] resize-none"
            placeholder="내용을 입력해 주세요"
          />

          <div className="flex gap-4 mt-8">
            <button
              onClick={onCancel}
              className="flex-1 h-[56px] border border-white text-white font-bold rounded-sm hover:bg-white/10 transition-colors"
            >
              취소하기
            </button>
            <button className="flex-1 h-[56px] bg-[#EFFF04] text-black font-bold rounded-sm hover:bg-[#d4e403] transition-colors">
              교환하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
