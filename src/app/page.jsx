import RedirectIfLoggedIn from '@/components/RedirectIfLoggedIn';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <RedirectIfLoggedIn />

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
              포인트로{' '}
              <span className="font-bold text-main">안전하게 거래</span>
              하세요
            </>
          }
          description={`내 포토카드를 포인트로 팔고, 원하는 포토카드를\n포인트로 안전하게 교환하세요`}
          imgName="point"
          bgAccent="#efff04"
          glowType="circle"
          glowPosition="right"
        />

        <FeatureSection
          heading={
            <>
              알림으로 보다{' '}
              <span className="text-blue font-bold">빨라진 거래</span>
            </>
          }
          description={`교환 제안부터 판매 완료까지,\n실시간 알림으로 놓치지 마세요`}
          imgName="notification"
          bgAccent="#29c9f9"
          glowType="circle"
          glowPosition="left"
        />

        <FeatureSection
          heading={
            <>
              랜덤 상자로{' '}
              <span className="text-main font-bold">포인트 받자! 🎉</span>
            </>
          }
          description={`한 시간마다 주어지는 랜덤 상자를 열고,\n포인트를 획득하세요`}
          imgName="random-box"
          bgAccent="#efff04"
          glowType="gradient"
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

            <div className="hidden md:block">
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
    </>
  );
}

function FeatureSection({
  heading,
  description,
  imgName,
  bgAccent,
  glowType = 'circle',
  glowPosition = 'center',
}) {
  const altTexts = {
    point: '포인트로 안전하게 거래하는 화면',
    notification: '실시간 알림을 받는 화면',
    'random-box': '랜덤 상자에서 포인트를 획득하는 화면',
  };

  const currentAlt = altTexts[imgName] || '기능 미리보기 화면';

  return (
    <section className="relative py-20 px-4 md:px-10 lg:px-0 overflow-hidden bg-black">
      {glowType === 'circle' ? (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 'min(900px, 90vw)',
            aspectRatio: '1 / 1',
            bottom: 'max(-450px, -45vw)',
            left:
              glowPosition === 'left'
                ? '-15%'
                : glowPosition === 'right'
                  ? 'auto'
                  : '50%',
            right: glowPosition === 'right' ? '-15%' : 'auto',
            transform: glowPosition === 'center' ? 'translateX(-50%)' : 'none',
            background: `linear-gradient(180deg, ${bgAccent} 0%, #0f0f0f 100%)`,
            border: `2px solid color-mix(in srgb, ${bgAccent} 60%, rgba(102, 102, 102, 0.4))`,
            boxShadow: 'inset 0 0 50px rgba(255, 255, 255, 0.1)',
            opacity: 0.4,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(0deg, color-mix(in srgb, ${bgAccent} 22%, transparent) 0%, transparent 65%)`,
          }}
        />
      )}

      <div className="relative mx-auto w-full max-w-[1100px]">
        <div className="text-left mb-10 md:mb-14 lg:px-0 px-2">
          <h2 className="text-white font-bold leading-snug mb-4 text-2xl md:text-3xl lg:text-4xl">
            {heading}
          </h2>
          <p className="text-gray-300 text-sm md:text-base whitespace-pre-line">
            {description}
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="block md:hidden w-full">
            <Image
              src={`/images/landing/mobile/${imgName}.png`}
              alt={currentAlt}
              width={375}
              height={300}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden md:block lg:hidden w-full">
            <Image
              src={`/images/landing/tablet/${imgName}.png`}
              alt={currentAlt}
              width={744}
              height={400}
              className="w-full h-auto"
            />
          </div>

          <div className="hidden lg:block w-full">
            <Image
              src={`/images/landing/pc/${imgName}.png`}
              alt={currentAlt}
              width={1100}
              height={620}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
