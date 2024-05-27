import React from 'react';
import CabinCard from './CabinCard';
import { getCabins } from '../_lib/data-service';
import { unstable_noStore } from 'next/cache';

export default async function CabinList({ filter }) {
  unstable_noStore();
  const cabins = await getCabins();

  let displayedCabins;
  if (filter === 'all') displayedCabins = cabins;

  if (filter === 'small')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity <= 3
    );

  if (filter === 'medium')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity > 3 && c.maxCapacity <= 7
    );

  if (filter === 'large')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity >= 8
    );

  return (
    <>
      {cabins.length > 0 && (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
          {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}
