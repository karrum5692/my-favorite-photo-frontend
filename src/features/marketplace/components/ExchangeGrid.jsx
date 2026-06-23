'use client';

import ExchangeItem from './ExchangeItem';

export default function ExchangeGrid({
  proposal,
  cardIsSeller,
  handleAcceptProposal,
  handleRejectProposal,
  handleCancelProposal,
  confirmAlert,
  setConfirmAlert,
  onCardClick,
}) {
  return (
    <div
      className="
        grid 
        grid-cols-2
        md:grid-cols-2
        lg:grid-cols-3
        gap-[12px]
        md:gap-[24px]
        lg:gap-[40px]
        w-full
        max-w-[1480px]
        mx-auto
        mb-16
      "
    >
      {proposal.map((c) => (
        <ExchangeItem
          key={c.id}
          {...c}
          cardIsSeller={cardIsSeller}
          handleAcceptProposal={() => handleAcceptProposal(c.id)}
          handleRejectProposal={() => handleRejectProposal(c.id)}
          handleCancelProposal={() => handleCancelProposal(c.id)}
          confirmAlert={confirmAlert}
          setConfirmAlert={setConfirmAlert}
          onClick={() => onCardClick?.(c)}
        />
      ))}
    </div>
  );
}
