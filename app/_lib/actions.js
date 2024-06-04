'use server';

import { revalidatePath } from 'next/cache';
import { auth, signIn, signOut } from './auth';
import { supabase } from './supabase';

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

export async function signInAction() {
  // Could also get form /api/providers
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
