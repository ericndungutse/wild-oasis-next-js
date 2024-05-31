import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // CredentialProvider
  ],
};

export const {
  auth,
  //   GET and POST route handler functions
  handlers: { GET, POST },
} = NextAuth(authConfig);