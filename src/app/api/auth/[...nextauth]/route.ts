import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  session: { 
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if(user) {
        token.accessToken = user.accessToken;
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user.accessToken = token.accessToken;
      return session
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return {
          email: credentials?.email,
          name: 'Hello world',
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        } as any

        // const res = await fetch('/your/endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' }
        // });
        // const user = await res.json();

        // // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved
        // return null;
      }
    })
  ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
