'use client';

export default function DetailModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    // 1. 배경 클릭 시 onClose 실행 (닫기 로직)
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center overflow-y-auto"
      onClick={onClose}
    >
      {/* 2. 모달 박스 */}
      <div
        // 3. 내부 영역 클릭 시에는 이벤트 전파 방지 (모달이 닫히지 않게 함)
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1160px] h-[903px] bg-[#161616] border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative p-6"
      >
        {children}
      </div>
    </div>
  );
}
