import ExchangeItem from './ExchangeItem';

export default function ExchangeGrid({ proposal, cardIsSeller }) {
  console.log('grid:', proposal);

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
        <ExchangeItem key={c.id} {...c} cardIsSeller={cardIsSeller} />
      ))}
    </div>
  );
}
