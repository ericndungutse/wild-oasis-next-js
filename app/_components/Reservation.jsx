import React from 'react';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import {
  getBookedDatesByCabinId,
  getSettings,
} from '../_lib/data-service';

async function Reservation({ cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  return (
    <div className='grid grid-cols-2 border p-4 border-primary-800 min-h-[400px] '>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
