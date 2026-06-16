'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { formatRemain } from '../hooks/useRandomPoint';

const BOXES = [
  { id: 1, src: '/images/random_box_1' },
  { id: 2, src: '/images/random_box_2' },
  { id: 3, src: '/images/random_box_3' },
];

/**
 * 랜덤포인트 모달
 *  select  : 상자 3개 중 선택
 *  confirm : 선택완료 버튼
 *  result  : 획득 포인트 표시
 */

export default function RandomPointModal({
  isOpen,
  onClose,
  canClaim,
  remainMs,
  loading,
  onClaim,
}) {
  const [step, setStep] = useState('select');
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const dialogRef = useRef(null);

  // ESC로 닫게 해주는 부분
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (id) => {
    if (!canClaim) return;
    setSelected(id);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    try {
      const r = await onClaim();
      setResult(r);
      setStep('result');
    } catch (e) {
      alert(e?.response?.data?.message ?? '잠시 후 다시 시도해주세요.');
      onClose();
    }
  };

  const sizeClass =
    step === 'result'
      ? 'w-[345px] md:w-[455px] h-[541px] md:h-[658px] lg:w-[455px] lg:h-[678px]'
      : step === 'confirm'
        ? 'w-[345px] md:w-[600px] h-[541px] md:h-[613px] lg:w-[1034px] lg:h-[765px]'
        : 'w-[345px] md:w-[600px] h-[441px] md:h-[500px] lg:w-[1034px] lg:h-[646px]';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative rounded-2xl bg-gray-500 border border-gray-400/40 ${sizeClass} flex flex-col items-center justify-center px-6 py-8 overflow-hidden`}
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(190,255,40,0.12), transparent 70%)',
        }}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-5 top-5 text-gray-300 hover:text-white text-2xl leading-none"
        >
          ×
        </button>

        <h2 className="font-display text-3xl text-white mb-2">
          랜덤<span className="text-main">포인트</span>
        </h2>

        {step !== 'result' && (
          <>
            <p className="text-center text-gray-200 leading-relaxed mb-1">
              1시간마다 돌아오는 기회!
              <br />
              랜덤 상자 뽑기를 통해 포인트를 획득하세요!
            </p>
            <p className="text-sm text-gray-300 mb-6">
              다음 기회까지 남은 시간{' '}
              <span className="text-main">
                {canClaim ? '지금 가능!' : formatRemain(remainMs)}
              </span>
            </p>
          </>
        )}

        {step !== 'result' && (
          <>
            <div className="flex items-center justify-center gap-3 md:gap-6 mb-6 flex-1">
              {BOXES.map((box) => {
                const isSel = selected === box.id;
                const dimmed = selected && !isSel;
                return (
                  <button
                    key={box.id}
                    onClick={() => handleSelect(box.id)}
                    disabled={!canClaim}
                    className={`transition-all duration-200 ${
                      isSel
                        ? 'scale-110'
                        : dimmed
                          ? 'opacity-40 scale-95'
                          : 'hover:scale-105'
                    } ${!canClaim ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`${box.id}번 상자 선택`}
                  >
                    <picture>
                      <source
                        media="(min-width:1024px)"
                        srcSet={`${box.src}_lg.png`}
                      />
                      <source
                        media="(min-width:744px)"
                        srcSet={`${box.src}_md.png`}
                      />
                      <img
                        src={`${box.src}_sm.png`}
                        alt={`랜덤 상자 ${box.id}`}
                        className="w-24 md:w-32 lg:w-44 h-auto select-none"
                        draggable={false}
                      />
                    </picture>
                  </button>
                );
              })}
            </div>

            {step === 'confirm' && (
              <div className="w-full max-w-[420px]">
                <Button
                  variant="primary"
                  height="60"
                  onClick={handleConfirm}
                  disabled={loading}
                >
                  {loading ? '뽑는 중...' : '선택완료'}
                </Button>
              </div>
            )}
          </>
        )}

        {step === 'result' && (
          <div className="flex flex-col items-center justify-center flex-1">
            <picture>
              <source
                media="(min-width:1024px)"
                srcSet="/images/point_lg.png"
              />
              <img
                src="/images/point_sm.png"
                alt="포인트"
                className="w-40 md:w-48 h-auto mb-6 select-none"
                draggable={false}
              />
            </picture>
            <p className="text-3xl font-bold text-main mb-3">
              {result?.amount}P 획득!
            </p>
            <p className="text-sm text-gray-300">
              다음 기회까지 남은 시간{' '}
              <span className="text-main">{formatRemain(remainMs)}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
