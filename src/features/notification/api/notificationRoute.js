export function getNotificationRoute(noti) {
  const { type, relatedId } = noti ?? {};

  // relatedId가 생기면 카드/교환 상세로 정밀 이동 (지금은 null이라 아래 type 분기로)
  if (relatedId) {
    switch (type) {
      case 'PURCHASE_COMPLETED':
      case 'SOLD':
      case 'SOLD_OUT':
        return `/marketplace/${relatedId}`; // 카드 상세
      case 'PROPOSAL_RECEIVED':
      case 'PROPOSAL_ACCEPTED':
      case 'PROPOSAL_REJECTED':
        return `/marketplace/${relatedId}`; // 교환 관련 판매글 상세
      default:
        return '/marketplace';
    }
  }

  // relatedId 없을 때(기존 알림 등) — type 기반 관련 영역 이동
  switch (type) {
    case 'PURCHASE_COMPLETED':
    case 'SOLD_OUT':
    case 'PROPOSAL_RECEIVED':
      // return '/my-sales';   // ← my-sales 구현 후 교체 바람
      return '/marketplace';
    case 'SOLD':
    case 'PROPOSAL_ACCEPTED':
      // return '/my-gallery'; // ← my-gallery 구현 후 교체 바람
      return '/marketplace';
    case 'PROPOSAL_REJECTED':
      return '/marketplace';
    default:
      return '/marketplace';
  }
}
