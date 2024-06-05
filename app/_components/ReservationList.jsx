'use client';
import React, { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteResevation } from '../_lib/actions';

function ReservationList({ bookings }) {
  // First Param: What will be returned in the beginning and while no async/server action running
  //  Second Param: Updating function
  // OptmisticDelete: a function we use whenerver user runs action(cliks delete button)
  const [optimisticBookings, optimisticDelete] =
    useOptimistic(
      bookings,
      // Gets initialstate(bookings), and whatever passed to optimistic Delete
      (curBookings, bookingId) => {
        // Return Optimistic State: State we expect after an action is triggered(delete)
        return curBookings.filter(
          (curr) => curr.id !== bookingId
        );
      }
    );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteResevation(bookingId);
  }
  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
