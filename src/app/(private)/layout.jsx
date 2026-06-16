import RandomPointEvent from '@/features/point/components/RandomPointEvent';

export default function PrivateLayout({ children }) {
  return (
    <>
      {children}
      <RandomPointEvent />
    </>
  );
}
