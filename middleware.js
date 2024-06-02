import { NextResponse } from 'next/server';
import { auth } from '@/app/_lib/auth';

// CUSTOM MIDDLEWARE
// export function middleware(request) {
//   //   console.log(request);

//   console.log(new URL('/about', request.url));
//   return NextResponse.redirect(
//     new URL('/about', request.url)
//   );
// }

// export const config = {
//   // Routes the above middleware must only run
//   matcher: ['/account'],
// };

export const middleware = auth;

export const config = {
  // Routes the above middleware must only run
  matcher: ['/account'],
};
