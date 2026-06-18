'use client';

import ExchangeItem from './ExchangeItem';
import { useState } from 'react';

export default function ExchangeGrid({
  proposal,
  cardIsSeller,
  handleAcceptProposal,
  handleRejectProposal,
}) {
  const prevData = JSON.parse(localStorage.getItem('hiddenCardId'));
  const [hiddenCardId, setHiddenCardId] = useState(prevData ? prevData : []);

  const allHidden = proposal?.every((c) =>
    hiddenCardId.includes(c.offeredCard?.id)
  );

  if (allHidden && proposal?.length > 0) {
    return <p className="my-[70px]">교환 제시된 목록이 없습니다.</p>;
  }

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
      "
    >
      {proposal.map((c) => (
        <ExchangeItem
          key={c.id}
          {...c}
          cardIsSeller={cardIsSeller}
          handleAcceptProposal={() => handleAcceptProposal(c.id)}
          handleRejectProposal={() => handleRejectProposal(c.id)}
          hiddenCardId={hiddenCardId}
          setHiddenCardId={setHiddenCardId}
        />
      ))}
    </div>
  );
}
