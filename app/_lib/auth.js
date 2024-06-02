import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // FOR CUSTOM PROVIDER
    // CredentialProvider
  ],

  callbacks: {
    // Return True All False
    // NextAuth calls this method whenever a user tryies to access route mentioned in middleware
    authorized({ auth, request }) {
      // !! Convert any value to a boolean
      return !!auth?.user;
    },
  },
  pages: {
    signIn: 'login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  //   GET and POST route handler functions
  handlers: { GET, POST },
} = NextAuth(authConfig);
