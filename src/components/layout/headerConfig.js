const HIDDEN_PREFIXES = ['/login', '/signup'];

// 모바일 헤더 유형(어디에서 사용되는지에 따라 달라짐) ex: 마켓플레이스 상세페이지는 B(로고 + 뒤로가기) // 메인은 A(로고 + 케밥)
const PATTERN_B = [
  { match: (p) => /^\/marketplace\/[^/]+$/.test(p), title: '마켓플레이스' },
  { match: (p) => p.startsWith('/notifications'), title: '알림' },
  { match: (p) => p.startsWith('/gallery/create'), title: '포토카드 생성' },
  { match: (p) => p.startsWith('/my-sales'), title: '나의 판매 포토카드' },
];

export function getHeaderConfig(pathname) {
  if (!pathname) return { type: 'A' };

  if (HIDDEN_PREFIXES.some((pre) => pathname.startsWith(pre))) {
    return { type: 'hidden' };
  }

  for (const b of PATTERN_B) {
    if (b.match(pathname)) return { type: 'B', title: b.title };
  }

  return { type: 'A' };
}
