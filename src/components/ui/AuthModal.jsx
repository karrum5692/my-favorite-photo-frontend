'use client';

export default function AuthModal({ open, title = '알림', message, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#161616] border border-[#333] rounded-lg p-6 w-[360px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white mb-3">{title}</h2>

        <p className="text-neutral-300 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full h-12 bg-[#eaff00] text-black font-bold rounded"
        >
          확인
        </button>
      </div>
    </div>
  );
}
