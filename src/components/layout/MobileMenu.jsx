'use client';

import Link from 'next/link';

export default function MobileMenu({ open, user, onClose, logout }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[110] bg-black/60 transition-opacity md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-[120] h-full w-[300px] max-w-[80%] bg-black border-r border-gray-500 flex flex-col px-6 py-8 transition-transform md:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="메뉴"
      >
        <p className="text-white text-xl font-bold font-display">
          안녕하세요, {user?.nickname}님!
        </p>
        <div className="flex items-center justify-between mt-3 pb-5 border-b border-gray-500">
          <span className="text-sm text-gray-300">보유 포인트</span>
          <span className="text-main font-bold">
            {(user?.point?.balance ?? 0).toLocaleString()} P
          </span>
        </div>

        {/* 메뉴 링크 구역 */}
        <nav className="mt-6 space-y-5">
          <Link
            href="/marketplace"
            onClick={onClose}
            className="block text-white font-bold hover:text-main"
          >
            마켓플레이스
          </Link>
          <Link
            href="/gallery"
            onClick={onClose}
            className="block text-white font-bold hover:text-main"
          >
            마이갤러리
          </Link>
          <Link
            href="/my-sales"
            onClick={onClose}
            className="block text-white font-bold hover:text-main"
          >
            판매 중인 포토카드
          </Link>
        </nav>

        <button
          onClick={() => {
            onClose();
            logout();
          }}
          className="mt-auto text-left text-sm text-gray-400 hover:text-white transition-colors"
        >
          로그아웃
        </button>
      </aside>
    </>
  );
}
