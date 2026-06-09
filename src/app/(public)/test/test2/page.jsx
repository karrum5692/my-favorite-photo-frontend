'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import TradeModal from '@/features/photocard/components/TradeModal';
export default function TestPage() {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  const openTradeModal = () => {
    console.log('포토카드 교환하기 버튼 클릭');
    setIsTradeModalOpen(true);
  };

  const closeTradeModal = () => {
    setIsTradeModalOpen(false);
  };

  return (
    <div className="p-10 space-y-8 max-w-[600px] mx-auto bg-gray-500/10 min-h-screen">
      <h1 className="text-2xl font-bold border-b border-gray-400 pb-2">
        공통 버튼 컴포넌트 테스트
      </h1>

      {/* 440*55 메인 버튼 테스트 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Primary (440 * 55)</p>
        <div className="w-[440px]">
          <Button
            type="button"
            variant="primary"
            height="55"
            onClick={openTradeModal}
          >
            포토카드 교환하기
          </Button>
        </div>
      </div>

      {/* 226*55 취소 버튼 테스트 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Secondary (226 * 55)</p>
        <div className="w-[226px]">
          <Button variant="secondary" height="55">
            취소하기
          </Button>
        </div>
      </div>

      {/* 520*60 큰 버튼 테스트 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Primary (520 * 60)</p>
        <div className="w-[520px]">
          <Button variant="primary" height="75">
            가입하기
          </Button>
        </div>
      </div>

      {/* 미활성 버튼 테스트 */}
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Tertiary (345 * 55)</p>
        <div className="w-[345px]">
          <Button variant="tertiary" height="55">
            포토카드 교환하기
          </Button>
        </div>
      </div>
      <TradeModal isOpen={isTradeModalOpen} onClose={closeTradeModal} />
    </div>
  );
}
