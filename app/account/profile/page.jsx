import ProfileData from '@/app/_components/ProfileData';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

export const metadata = {
  title: 'Update Profile',
};

export default async function Page() {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-4'>
        Update your guest profile
      </h2>

      <p className='text-lg mb-8 text-primary-200'>
        Providing the following information will make your
        check-in process faster and smoother. See you soon!
      </p>

      <Suspense fallback={<Spinner />}>
        <ProfileData />
      </Suspense>
    </div>
  );
}
