'use server';

import { signIn } from './auth';

export async function signInAction() {
  // Could also get form /api/providers
  await signIn('google', { redirectTo: '/account' });
}
