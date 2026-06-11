import Pagination from '@/components/ui/Pagination';
import Button from '@/components/ui/Button';
async function getTestData(page) {
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    const targetUrl = `${backendUrl}/market/cards?page=${page}&limit=10`;

    const res = await fetch(targetUrl, { cache: 'no-store' });

    if (!res.ok) {
      return { list: [], totalCount: 0, totalPages: 1 };
    }

    return res.json();
  } catch (error) {
    return { list: [], totalCount: 0, totalPages: 1 };
  }
}

export default async function TestPage({ searchParams }) {
  // 1. searchParams Promise 객체를 await로 unwrap 해줍니다.
  const resolvedSearchParams = await searchParams;

  // 2. 안전하게 풀린 객체에서 page 값을 읽어옵니다.
  const currentPage = Number(resolvedSearchParams?.page) || 1;

  // 3. 동적 주소로 백엔드 데이터 그랩
  const { list, totalCount, totalPages } = await getTestData(currentPage);

  return (
    <>
      <div className="p-8 bg-black min-h-screen text-white">
        <div className="mb-8 border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-purple-400 mb-2">
            페이지네이션 기능 테스트
          </h1>
          <p className="text-gray-400 text-sm">
            현재 페이지:{' '}
            <span className="text-white font-bold">{currentPage}</span> / 전체
            페이지: <span className="text-white font-bold">{totalPages}</span>{' '}
            (총 데이터: {totalCount}개)
          </p>
        </div>

        {/* 카드 리스트 출력 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {list && list.length > 0 ? (
            list.map((card) => (
              <div
                key={card.id}
                className="border border-gray-800 p-4 rounded bg-gray-950 flex flex-col justify-between"
              >
                <div>
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-32 object-cover mb-2 rounded bg-gray-900"
                  />
                  <h3 className="font-bold text-sm truncate">{card.title}</h3>
                  <p className="text-xs text-gray-500">
                    소유자/판매자: {card.sellerNickname || card.nickname}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center text-xs">
                  <span className="text-purple-400 font-semibold">
                    {card.grade}
                  </span>
                  <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300">
                    가격: {card.price}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-main border border-dashed border-gray-800 rounded">
              데이터가 없거나 백엔드 서버(Express)가 켜져 있지 않습니다. (포트
              4000)
            </div>
          )}
        </div>

        {/* 공통 UI 페이지네이션 */}
        <div className="flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>

      <div className="p-10 space-y-8 max-w-[600px] mx-auto bg-gray-500/10 min-h-screen">
        <h1 className="text-2xl font-bold border-b border-gray-400 pb-2">
          공통 버튼 컴포넌트 테스트
        </h1>

        {/* 440*55 메인 버튼 테스트 */}
        <div className="space-y-2">
          <p className="text-sm text-gray-300">Primary (440 * 55)</p>
          <div className="w-[440px]">
            <Button variant="primary" height="55">
              확인하기
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
      </div>
    </>
  );
}
