import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import {
  getBookedDatesByCabinId,
  getSettings,
} from '../_lib/data-service';
import { auth } from '../_lib/auth';
import LoginMessage from './LoginMessage';

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  const session = await auth();

  return (
    <div className='grid grid-cols-2 border p-4 border-primary-800 min-h-[400px] '>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />

      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
