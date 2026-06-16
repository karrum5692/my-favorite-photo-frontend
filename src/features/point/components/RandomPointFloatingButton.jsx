'use client';

import React from 'react';
import { formatRemain } from '../hooks/useRandomPoint';

/**
 * 모달을 X로 닫았을 때 화면 우하단에 남는 작은 버튼.
 * - 받을 수 있으면(canClaim) 노란색으로 강조 + 살짝 반짝임
 * - 쿨다운 중이면 남은 시간 표시(비활성 느낌)
 */
export default function RandomPointFloatingButton({
  canClaim,
  remainMs,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg transition-all
        ${
          canClaim
            ? 'bg-main text-black hover:opacity-90 animate-pulse'
            : 'bg-gray-500 text-gray-300 border border-gray-400/40'
        }`}
      aria-label={canClaim ? '랜덤포인트 받기' : '랜덤포인트 대기 중'}
    >
      <span className="text-xl" aria-hidden="true">
        🎁
      </span>
      <span className="text-sm font-bold">
        {canClaim ? '랜덤포인트 받기' : formatRemain(remainMs)}
      </span>
    </button>
  );
}
