import Button from '@/components/ui/Button';

export default function TestPage() {
  return (
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
  );
}
