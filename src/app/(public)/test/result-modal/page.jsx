'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResultModal from '@/components/ui/ResultModal';
import Button from '@/components/ui/Button';

const CASES = {
  '판매 등록': {
    desc: (r) =>
      `[LEGENDARY | 우리집 얼마당] 2장 판매 등록에 ${r ? '성공했습니다!' : '실패했습니다.'}`,
    successBtn: '나의 판매 포토카드에서 확인하기',
    failBtn: '마켓플레이스로 돌아가기',
    successRoute: '/my-sales',
    failRoute: '/marketplace',
  },
  구매: {
    desc: (r) =>
      `[LEGENDARY | 우리집 얼마당] 2장 구매에 ${r ? '성공했습니다!' : '실패했습니다.'}`,
    successBtn: '마이갤러리에서 확인하기',
    failBtn: '마켓플레이스로 돌아가기',
    successRoute: '/gallery',
    failRoute: '/marketplace',
  },
  '포토카드 생성': {
    desc: (r) =>
      `[RARE | 우리집 앞마당] 포토카드 생성에 ${r ? '성공했습니다!' : '실패했습니다.'}`,
    successBtn: '마이갤러리에서 확인하기',
    failBtn: '마이갤러리로 돌아가기',
    successRoute: '/gallery',
    failRoute: '/gallery',
  },
};

export default function ResultModalTestPage() {
  const router = useRouter();
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
      <Button onClick={() => open('포토카드 생성', 'success')}>
        포토카드 생성 성공
      </Button>
      <Button onClick={() => open('포토카드 생성', 'fail')}>
        포토카드 생성 실패
      </Button>

      {modal &&
        (() => {
          const c = CASES[modal.title];
          const isSuccess = modal.result === 'success';

          return (
            <ResultModal
              isOpen
              onClose={() => setModal(null)}
              title={modal.title}
              result={modal.result}
              description={c.desc(isSuccess)}
              buttonText={isSuccess ? c.successBtn : c.failBtn}
              onButtonClick={() =>
                router.push(isSuccess ? c.successRoute : c.failRoute)
              }
            />
          );
        })()}
    </div>
  );
}
