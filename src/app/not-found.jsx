import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="mt-4 text-xl">페이지를 찾을 수 없습니다.</p>

      <p className="mt-2 text-white">
        요청하신 주소가 존재하지 않거나 이동되었습니다.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          href="/"
          className="rounded bg-[#eaff00] px-8 py-4 text-base font-bold text-black transition-colors hover:bg-[#d8ec00]"
        >
          홈으로 이동
        </Link>
      </div>
    </main>
  );
}
