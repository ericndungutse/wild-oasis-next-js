import React from 'react';
import { auth } from '../_lib/auth';
import { getBookings } from '../_lib/data-service';
import ReservationList from './ReservationList';

async function Reservations() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <>
      {bookings.length === 0 ? (
        <p className='text-lg'>
          You have no reservations yet. Check out our{' '}
          <a
            className='underline text-accent-500'
            href='/cabins'
          >
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </>
  );
}

export default Reservations;
