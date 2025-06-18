// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Hardcoded credentials
        const OK_USER = 'admin';
        const OK_PASS = 'password123';

        if (!credentials) return null;
        const { username, password } = credentials;
        // Validate username and password
        if (username === OK_USER && password === OK_PASS) {
          return { id: '1', name: 'Admin' }; // Authenticated user (userId = 1)
        }
        return null; // Authentication failed (returns 401 response)
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/signin' },          // Custom sign-in page route
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-secret',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };