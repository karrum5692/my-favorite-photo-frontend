'use client';

import { useState } from 'react';
import ResultModal from '@/components/ui/ResultModal';
import Button from '@/components/ui/Button';

export default function ResultModalTestPage() {
  const [modal, setModal] = useState(null);

  const open = (title, result) => setModal({ title, result });

  return (
    <div className="min-h-screen bg-black p-10 flex flex-col gap-4 max-w-[400px]">
      <h1 className="text-white text-xl font-bold mb-4">ResultModal 테스트</h1>

      <Button onClick={() => open('판매 등록', 'success')}>
        판매 등록 성공
      </Button>
      <Button onClick={() => open('판매 등록', 'fail')}>판매 등록 실패</Button>
      <Button onClick={() => open('구매', 'success')}>구매 성공</Button>
      <Button onClick={() => open('구매', 'fail')}>구매 실패</Button>

      {modal && (
        <ResultModal
          isOpen
          onClose={() => setModal(null)}
          title={modal.title}
          result={modal.result}
          description={`[LEGENDARY | 우리집 얼마당] 2장 ${modal.title}에 ${
            modal.result === 'success' ? '성공했습니다!' : '실패했습니다.'
          }`}
          buttonText={
            modal.result === 'success'
              ? '확인하러 가기'
              : '마켓플레이스로 돌아가기'
          }
          onButtonClick={() => setModal(null)}
        />
      )}
    </div>
  );
}
