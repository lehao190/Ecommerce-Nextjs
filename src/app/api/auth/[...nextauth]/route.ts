import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { gql } from 'graphql-request';
import { TUser } from '@/types/user.types';
import { initializeGraphqlClient } from '@/lib/graphql';

// Login response from Graphql Server
type TLoginResponse = {
  login: {
    access_token: string;
    refresh_token: string;
    user: Omit<TUser, 'accessToken' | 'refreshToken'>;
  }
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = {
          id: user.id,
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session = {
        ...session,
        user: {
          ...token
        }
      };

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const loginCredentials = gql`
          mutation Login($email: String!, $password: String!) {
            login(loginInput: { email: $email, password: $password }) {
              access_token
              refresh_token
              user {
                id
                username
                email
                avatar
              }
            }
          }
        `;

        const { login: data } = await initializeGraphqlClient().request<TLoginResponse>(
          loginCredentials,
          {
            email: credentials?.email,
            password: credentials?.password
          }
        );

        if(data) {
          return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            ...data.user,
          }
        }

        return null;
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
