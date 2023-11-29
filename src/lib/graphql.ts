import { GraphQLClient } from 'graphql-request';

export const initializeGraphqlClient = (jwtToken?: string) => {
  return new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL as string,
    {
      headers: {
        authorization: `Bearer ${jwtToken}`
      }
    }
  );
}
