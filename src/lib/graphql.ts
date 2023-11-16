import { GraphQLClient } from 'graphql-request';

export const initializeGraphqlClient = (jwtToken?: string) => {
  return new GraphQLClient(
    process.env.GRAPHQL_SERVER_URL as string,
    {
      headers: {
        authorization: `Bearer ${jwtToken}`
      }
    }
  );
}
