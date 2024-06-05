import Reservations from '@/app/_components/Reservations';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

export const metadata = {
  title: 'Reservations',
};

export default async function Page() {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Your reservations
      </h2>

      {/* This allow the above content to be static */}
      <Suspense fallback={<Spinner />}>
        <Reservations />
      </Suspense>
    </div>
  );
}
