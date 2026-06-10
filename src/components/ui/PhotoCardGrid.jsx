import PhotoCardItem from '@/components/ui/PhotoCardItem';

export default function PhotoCardGrid({ cards = [] }) {
  return (
    <div
      className="
        grid grid-cols-2
        gap-[5px]
        md:gap-[20px]
        lg:gap-[40px]
        justify-center
        w-full
        max-w-[1480px]
        mx-auto
      "
    >
      {cards.map((card) => (
        <PhotoCardItem key={card.id} {...card} />
      ))}
    </div>
  );
}
