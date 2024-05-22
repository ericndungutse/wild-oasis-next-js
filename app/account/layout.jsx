import React from 'react';
import SideNavigation from '../_components/SideNavigation';

// export const metadata = {
//   title: {
//     template: 'Account | %s',
//     default: 'Account | The Wild Oasis',
//   },
// };

export default function Layout({ children }) {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <SideNavigation />
      <div className='py-1'>{children}</div>
    </div>
  );
}
