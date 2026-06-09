'use client';

export default function MarketModal({
  isOpen,
  onClose,

  titleTop,
  titleMain,

  searchUI,
  filterUI,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 overflow-y-auto"
    >
      <div className="py-[30px] md:py-[40px]">
        <div
          onClick={(e) => e.stopPropagation()}
          className="
            mx-auto
            w-[375px] md:w-[744px] xl:w-[1160px]
            h-[812px] md:h-[1093px] xl:h-[1000px]
            bg-[#161616]
            rounded-[2px]
            flex flex-col
            overflow-hidden
            relative
            font-[var(--font-sans)]
          "
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-9 h-9"
          >
            <img src="/images/close_icon.svg" />
          </button>

          {/* SCROLL */}
          <div
            className="flex-1 overflow-y-auto
            [&::-webkit-scrollbar]:w-[8px]
            [&::-webkit-scrollbar-thumb]:bg-[#5A5A5A]
            [&::-webkit-scrollbar-thumb]:rounded-[2px]
          "
          >
            <div className="mx-auto w-[345px] md:w-[704px] xl:w-[920px] py-8">
              {/* TOP TEXT */}
              <div
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-gray-300 text-[14px] md:text-[16px] xl:text-[24px] mb-5 mt-5"
              >
                {titleTop}
              </div>

              {/* MAIN TITLE */}
              <h2
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-white text-[26px] md:text-[40px] xl:text-[46px]
                font-bold border-b border-white pb-5 mb-6"
              >
                {titleMain}
              </h2>

              {/* SEARCH + FILTER (UI 그대로 유지 핵심) */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                {searchUI}
                {filterUI}
              </div>

              {/* CONTENT */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
