import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from './data-service';

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

    // Runs before signup process. After user insert credentials but before loges in
    async signIn({ user, account, profile }) {
      // console.log(user, account: Contains authentication info, profile);
      // Create user if he signs in for the first time
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            fullName: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (error) {
        // IF All Went well and signin user. If Error return false
        return false;
      }
    },

    // Runs after signIn callback and after session is checked out. I.e. when auth is called
    async session({ user, session }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id;

      return session;
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
