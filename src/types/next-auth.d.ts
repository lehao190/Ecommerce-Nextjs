import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from "next-auth/jwt"

declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
    username: string;
    email: string;
    avatar?: string;
  }
  
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      id: string;
      username: string;
      email: string;
      avatar?: string;
    } & DefaultSession['user'];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    username: string;
    avatar?: string;
    email: string;
  }
}
