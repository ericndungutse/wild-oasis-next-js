'use client';
// import React from 'react';
// import CabinCard from './CabinCard';
// import { getCabins } from '../_lib/data-service';
// import { unstable_noStore } from 'next/cache';

// export default async function CabinList({ filter }) {
//   unstable_noStore();
//   const cabins = await getCabins();

//   let displayedCabins;
//   if (filter === 'all') displayedCabins = cabins;

//   if (filter === 'small')
//     displayedCabins = cabins.filter(
//       (c) => c.maxCapacity <= 3
//     );

//   if (filter === 'medium')
//     displayedCabins = cabins.filter(
//       (c) => c.maxCapacity > 3 && c.maxCapacity <= 7
//     );

//   if (filter === 'large')
//     displayedCabins = cabins.filter(
//       (c) => c.maxCapacity >= 8
//     );

//   return (
//     <>
//       {cabins.length > 0 && (
//         <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
//           {displayedCabins.map((cabin) => (
//             <CabinCard cabin={cabin} key={cabin.id} />
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
import React from 'react';
import { useQuery } from '@tanstack/react-query';
// import { getCabins } from '../_lib/data-service';
// import { getCabins } from '../_lib/data-service';

import CabinCard from './CabinCard';

import Spinner from './Spinner';

const getCabins = async function () {
  const res = await fetch('/api/cabins', {
    cache: 'no-store',
  });
  const cabins = await res.json();

  console.log(cabins);
  return cabins;
};

export default function CabinList() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getCabins,
  });

  console.log('Here', cabins);

  if (isLoading) return <Spinner />;

  return (
    <>
      {cabins.length > 0 && (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}
