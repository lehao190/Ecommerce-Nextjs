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
    expires_at: number;
    user: Omit<TUser, 'accessToken' | 'refreshToken'>;
  };
};

type TRefreshTokenResponse = {
  refresh: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
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
      // Initial login info
      if (user) {
        return token = {
          ...user
        };
      }
      // Return data if token is still valid
      else if (token.expires_at > Math.floor(Date.now() / 1000)) {
        return token;
      }
      // Refresh the tokens if access_token expires
      else {
        const refreshTokenQuery = gql`
          query {
            refresh {
              access_token
              refresh_token
              expires_at
            }
          }
        `;

        const { refresh: data } = await initializeGraphqlClient(
          token.refreshToken
        ).request<TRefreshTokenResponse>(refreshTokenQuery);

        return {
          ...token,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expires_at: data.expires_at
        };
      }
    },
    session: async ({ session, token }) => {
      session = {
        ...session,
        user: {
          ...token
        }
      };

      return session;
    }
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
              expires_at
              user {
                id
                username
                email
                avatar
              }
            }
          }
        `;

        const { login: data } =
          await initializeGraphqlClient().request<TLoginResponse>(
            loginCredentials,
            {
              email: credentials?.email,
              password: credentials?.password
            }
          );

        if (data) {
          return {
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            ...data.user,
            expires_at: data.expires_at
          };
        }

        return null;
      }
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
