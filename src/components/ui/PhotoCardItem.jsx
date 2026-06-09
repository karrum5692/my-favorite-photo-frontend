import Image from 'next/image';
import Link from 'next/link';
import soldoutIcon from '@/assets/icons/icon-soldout.png';

const GRADE_COLOR = {
  COMMON: 'text-gray-300',
  RARE: 'text-blue-400',
  SUPER_RARE: 'text-purple-400',
  LEGENDARY: 'text-[#E0F62B]',
};

const GRADE_LABEL = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER RARE',
  LEGENDARY: 'LEGENDARY',
};

const GENRE_LABEL = {
  ALBUM: '앨범',
  SPECIAL: '특전',
  FAN_SIGN: '팬싸',
  SEASON_GREETING: '시즌그리팅',
  FAN_MEETING: '팬미팅',
  CONCERT: '콘서트',
  MD: 'MD',
  COLLABORATION: '콜라보',
  FAN_CLUB: '팬클럽',
  OTHER: '기타',
};

const STATUS_BADGE_STYLE = {
  '판매 중': 'bg-[#E0F62B] text-black',
  '교환 제시 대기 중': 'bg-blue-500 text-white',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function resolveImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `${API_URL}${imageUrl}`;
}

export default function PhotoCardItem({
  variant = 'market',
  id,
  imageUrl,
  title,
  grade,
  genre,
  sellerNickname,
  price,
  status,
  remainQuantity,
  totalQuantity,
  quantity,
  statusBadge,
}) {
  const isSoldOut = status === 'SOLD';
  const fullImageUrl = resolveImageUrl(imageUrl);

  const href =
    variant === 'market'
      ? `/marketplace/${id}`
      : variant === 'my-sales'
        ? `/my-sales/${id}`
        : `/gallery/${id}`;

  const renderQuantity = () => {
    if (variant === 'gallery') {
      return (
        <div className="flex justify-between items-center text-[10px] md:text-xs">
          <span className="text-gray-400">수량</span>
          <span className="text-white font-medium">{quantity ?? '-'}</span>
        </div>
      );
    }
    if (variant === 'my-sales') {
      return (
        <div className="flex justify-between items-center text-[10px] md:text-xs">
          <span className="text-gray-400">잔여</span>
          <span className="text-white font-medium">
            {remainQuantity ?? '-'}
          </span>
        </div>
      );
    }
    return (
      <div className="flex justify-between items-center text-[10px] md:text-xs">
        <span className="text-gray-400">잔여</span>
        <span className="text-white font-medium">
          {remainQuantity ?? '-'} / {totalQuantity ?? '-'}
        </span>
      </div>
    );
  };

  return (
    <Link href={href} className="block mx-auto">
      <article
        className="bg-[#1E1E1E] border border-gray-800 rounded-lg overflow-hidden cursor-pointer hover:brightness-110 transition-all flex flex-col justify-between
        w-[170px] h-[234px] 
        md:w-[342px] md:h-[517px] 
        lg:w-[440px] lg:h-[600px]"
      >
        {/* 사진 영역 사이즈 고정*/}
        <div
          className="relative overflow-hidden shrink-0 bg-[#2A2A2A] rounded-sm mx-auto
          w-[150px] h-[112px] mt-2.5
          md:w-[302px] md:h-[226.5px] md:mt-4
          lg:w-[360px] lg:h-[270px] lg:mt-6"
        >
          {fullImageUrl ? (
            <Image
              src={fullImageUrl}
              alt={title ?? '포토카드'}
              fill
              sizes="(max-width: 768px) 150px, (max-width: 1024px) 302px, 360px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-500 text-[10px] md:text-xs">
                이미지 없음
              </span>
            </div>
          )}

          {/* 판매자 상태 */}
          {variant === 'my-sales' && statusBadge && (
            <div className="absolute top-1 left-1 md:top-2 md:left-2 z-10">
              <span
                className={`text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${STATUS_BADGE_STYLE[statusBadge] ?? 'bg-gray-600 text-white'}`}
              >
                {statusBadge}
              </span>
            </div>
          )}

          {/* SOLD OUT */}
          {variant !== 'gallery' && isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
              <div className="relative w-1/3 aspect-square">
                <Image
                  src={soldoutIcon}
                  alt="SOLD OUT"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* 카드 정보 영역 */}
        <div
          className="flex flex-col flex-1 justify-between 
          p-2.5 pt-1.5 md:p-5 lg:p-6"
        >
          <div>
            {/* 제목 */}
            <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base truncate">
              {title}
            </h3>

            {/* 등급 | 장르 / 닉네임 */}
            <div className="flex items-center justify-between gap-1 mb-0.5 md:mb-1.5">
              <div className="flex items-center gap-1 text-[8px] md:text-[11px] font-semibold">
                <span className={GRADE_COLOR[grade] ?? 'text-gray-300'}>
                  {GRADE_LABEL[grade] ?? grade}
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">
                  {GENRE_LABEL[genre] ?? genre}
                </span>
              </div>
              {variant !== 'gallery' && (
                <span className="text-[8px] md:text-[11px] text-gray-400 truncate max-w-[45%]">
                  {sellerNickname}
                </span>
              )}
            </div>
          </div>

          {/* 가격 & 수량 정보 */}
          <div className="flex flex-col gap-0.5 md:gap-1.5 pt-1.5 md:pt-2 border-t border-[#2A2A2A]">
            <div className="flex justify-between items-center text-[10px] md:text-xs">
              <span className="text-gray-400">가격</span>
              <span className="text-white font-bold text-xs md:text-sm lg:text-base">
                {price?.toLocaleString()} P
              </span>
            </div>
            {renderQuantity()}
          </div>

          {/* 로고  */}
          <div className="hidden md:flex justify-center items-center pt-2 mt-1 border-t border-[#2A2A2A]/40 opacity-50">
            <Image
              src="/images/logo.png"
              alt="최애의포토"
              width={80}
              height={15}
              className="object-contain"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
