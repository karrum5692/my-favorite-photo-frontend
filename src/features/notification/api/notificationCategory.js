export const NOTI_CATEGORY = {
  PROPOSAL_RECEIVED: 'trade',
  PROPOSAL_ACCEPTED: 'trade',
  PROPOSAL_REJECTED: 'trade',
  SOLD: 'buy',
  PURCHASE_COMPLETED: 'sell',
  SOLD_OUT: 'sell',
};

export const CATEGORY_META = {
  trade: { label: '거래', color: '#a77eff', bg: 'rgba(167,126,255,0.18)' },
  buy: { label: '구매', color: '#29c9f9', bg: 'rgba(41,201,249,0.16)' },
  sell: { label: '판매', color: '#efff04', bg: 'rgba(239,255,4,0.14)' },
};

export function getCategory(type) {
  return NOTI_CATEGORY[type] ?? 'trade';
}
