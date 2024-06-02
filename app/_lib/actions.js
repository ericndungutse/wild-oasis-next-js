'use server';

import { signIn, signOut } from './auth';

export async function signInAction() {
  // Could also get form /api/providers
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
