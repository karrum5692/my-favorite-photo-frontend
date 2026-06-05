import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="bg-black overflow-x-hidden">
      <section className="relative bg-hero-pattern">
        <div className="text-center pt-16 pb-8 px-4 md:pt-20 lg:pt-24">
          <div className="hidden md:flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="최애의포토"
              width={139}
              height={25}
            />
          </div>

          <h1 className="text-white font-bold leading-tight mb-8 text-3xl md:text-5xl lg:text-6xl">
            구하기 어려웠던
            <br />
            나의 <span className="text-main">최애</span>가 여기에!
          </h1>

          <Link
            href="/marketplace"
            className="inline-block bg-main text-black font-bold px-8 py-3 text-sm md:text-base hover:brightness-90 transition-all"
          >
            최애 찾으러 가기
          </Link>
        </div>

        <div className="w-full">
          <div className="block md:hidden">
            <Image
              src="/images/landing/mobile/hero.png"
              alt="미리보기"
              width={375}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden md:block lg:hidden">
            <Image
              src="/images/landing/tablet/hero.png"
              alt="미리보기"
              width={744}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden lg:block">
            <Image
              src="/images/landing/pc/hero.png"
              alt="미리보기"
              width={1920}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      <FeatureSection
        heading={
          <>
            포인트로 <span className="font-bold">안전하게 거래하세요</span>
          </>
        }
        description="내 포토카드를 포인트로 팔고, 원하는 포토카드를 포인트로 안전하게 교환하세요"
        imgName="point"
        bgAccent="var(--color-feature-module)"
      />

      <FeatureSection
        heading={
          <>
            알림으로 보다 <span className="text-main font-bold">빨라진</span>{' '}
            거래
          </>
        }
        description="교환 제안부터 판매 완료까지, 실시간 알림으로 놓치지 마세요"
        imgName="notification"
        bgAccent="var(--color-feature-module)"
      />

      <FeatureSection
        heading={
          <>
            랜덤 상자로 <span className="text-main font-bold">포인트</span>{' '}
            받자! 🎉
          </>
        }
        description={`한 시간마다 주어지는 랜덤 상자를 열고,\n포인트를 획득하세요`}
        imgName="random-box"
        bgAccent="var(--color-feature-random-box)"
      />

      <section className="bg-black text-center py-20 px-4">
        <div className="mb-12 flex justify-center">
          <div className="block md:hidden">
            <Image
              src="/images/landing/mobile/Rectangle.png"
              alt="포토카드"
              width={78}
              height={114}
              className="rounded-sm w-auto h-auto"
            />
          </div>

          <div className="hidden md:block lg:hidden">
            <Image
              src="/images/landing/tablet/Rectangle.png"
              alt="포토카드"
              width={104}
              height={151}
              className="rounded-sm w-auto h-auto"
            />
          </div>

          <div className="hidden lg:block">
            <Image
              src="/images/landing/pc/Rectangle.png"
              alt="포토카드"
              width={104}
              height={151}
              className="rounded-sm w-auto h-auto"
            />
          </div>
        </div>

        <h2 className="text-white font-bold text-2xl md:text-3xl mb-8">
          나의 최애를 지금 찾아보세요!
        </h2>

        <Link
          href="/marketplace"
          className="inline-block bg-main text-black font-bold px-8 py-3 text-sm md:text-base hover:brightness-90 transition-all"
        >
          최애 찾으러 가기
        </Link>
      </section>
    </main>
  );
}

function FeatureSection({ heading, description, imgName, bgAccent }) {
  const altTexts = {
    point: '포인트로 안전하게 거래하는 화면',
    notification: '실시간 알림을 받는 화면',
    'random-box': '랜덤 상자에서 포인트를 획득하는 화면',
  };

  const currentAlt = altTexts[imgName] || description;

  return (
    <section className="relative py-20 px-4 md:px-10 lg:px-[250px] overflow-hidden bg-feature-base">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 70% 50%, ${bgAccent} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        <div className="w-full lg:w-[38%] flex-shrink-0 text-center lg:text-left">
          <h2 className="text-white font-bold leading-snug mb-4 text-2xl md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="text-gray-300 text-sm md:text-base whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="w-full">
          <div className="block md:hidden">
            <Image
              src={`/images/landing/mobile/${imgName}.png`}
              alt={currentAlt}
              width={375}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden md:block lg:hidden">
            <Image
              src={`/images/landing/tablet/${imgName}.png`}
              alt={currentAlt}
              width={744}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden lg:block">
            <Image
              src={`/images/landing/pc/${imgName}.png`}
              alt={currentAlt}
              width={1920}
              height={600}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
