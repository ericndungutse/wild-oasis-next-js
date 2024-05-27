'use client';

import {
  usePathname,
  useSearchParams,
} from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

function Filter() {
  // ReadOnlyURLSearchParams:
  const searchParams = useSearchParams();
  //   Allows programit navigation in nextJS
  const router = useRouter();
  //   Reads the patch name after /
  const pathname = usePathname();

  function handleFilter(filter) {
    // Since we need to mutate urlSearchParam, we need to use URLSearchParams that is not read only
    const params = new URLSearchParams(searchParams);

    // Only build but does not change the url in browser
    params.set('capacity', filter);
    // returns capacity=value
    // params.toString();

    // replaces /somthing with /?capacity=value
    // If includes ? (router.replace(`${params.toString()}`);) automatically does the job
    // router.replace(`?${params.toString()}`);
    router.replace(`${pathname}?${params.toString()}`, {
      // No Scroll to top
      scroll: false,
    });
  }

  const activeFilter =
    searchParams.get('capacity') ?? 'all';

  return (
    <div className='border border-primary-800 flex'>
      <button
        onClick={() => handleFilter('all')}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === 'all'
            ? 'bg-primary-700 text-primary-50'
            : ''
        }`}
      >
        All
      </button>
      <button
        onClick={() => handleFilter('small')}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === 'small'
            ? 'bg-primary-700 text-primary-50'
            : ''
        }`}
      >
        1&mdash;3 Guests
      </button>
      <button
        onClick={() => handleFilter('medium')}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === 'medium'
            ? 'bg-primary-700 text-primary-50'
            : ''
        }`}
      >
        4&mdash;7 Guests
      </button>
      <button
        onClick={() => handleFilter('large')}
        className={`px-5 py-2 hover:bg-primary-700 ${
          activeFilter === 'large'
            ? 'bg-primary-700 text-primary-50'
            : ''
        }`}
      >
        8&mdash;12 Guests
      </button>
    </div>
  );
}

export default Filter;
