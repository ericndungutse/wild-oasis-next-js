import React from 'react';
import { auth } from '../_lib/auth';

export const metadata = {
  title: 'Account',
};

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Welcome back, {session?.user?.name.split(' ').at(0)}
      </h2>
    </div>
  );
}
