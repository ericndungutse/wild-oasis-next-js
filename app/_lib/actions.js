'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';
import { redirect } from 'next/navigation';

// NB: Great not to use try catch here, so we can handle errors in the UI(Throu closest error boundary) i.e: Error.js
export async function updateGuest(formData) {
  const session = await auth();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const nationalID = formData.get('nationalID');
  const [nationality, countryFlag] = formData
    .get('nationality')
    .split('%');

  if (!/^[a-zA-Z0-9]{6,16}$/.test(nationalID))
    throw new Error('Invalid national ID');

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  };

  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  revalidatePath('/account/profile');
}

export async function deleteResevation(bookingId) {
  const session = await auth();

  if (!session) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function signInAction() {
  // Could also get form /api/providers
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateBooking(formData) {
  const session = await auth();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const bookingId = +formData.get('bookingId');
  const updatedFields = {
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations'),
  };

  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect('/account/reservations');
}

export async function createReservation(
  boundData,
  formData
) {
  const session = await auth();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const reservationData = {
    ...boundData,
    numGuests: +formData.get('numGuests'),
    observations: formData.get('observations'),
    guestId: session.user.guestId,
    totalPrice: boundData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: 'unconfirmed',
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert([reservationData]);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${boundData.cabinId}`);

  redirect('/thankyou');
}
