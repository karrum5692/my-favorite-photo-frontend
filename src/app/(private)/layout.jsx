import RequireAuth from '@/components/RequireAuth';
import RandomPointEvent from '@/features/point/components/RandomPointEvent';

export default function PrivateLayout({ children }) {
  return (
    <RequireAuth>
      {children}
      <RandomPointEvent />
    </RequireAuth>
  );
}
