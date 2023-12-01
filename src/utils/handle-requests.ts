import { initializeGraphqlClient } from '@/lib/graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Variables } from 'graphql-request';

// Graphql Server error object type
type TGraphqlError = {
  response: {
    errors: [
      {
        message: string;
        extensions: {
          code: string;
          originalError: {
            statusCode: number;
          };
        };
      }
    ];
  };
};

// Error return type
type TError = {
  message: string;
  status?: number;
};

// Check if this is from Graphql Server error
const isGraphqlError = (error: unknown): error is TGraphqlError => {
  if (
    error &&
    typeof error === 'object' &&
    typeof (error as TGraphqlError).response.errors[0].message === "string" &&
    typeof (error as TGraphqlError).response.errors[0].extensions === 'object'
  ) {
    return true;
  }
  return false;
}

// Get approriate error
const getError = (error: unknown): TError => {
  let errorResults: TError

  if (isGraphqlError(error)) {
    errorResults = {
      message: error.response.errors[0].message,
      status: error.response.errors[0].extensions.originalError.statusCode
    };
  } else if (typeof error === 'string') {
    errorResults = {
      message: error
    };
  } else if (error instanceof Error) {
    errorResults = {
      message: error.message,
    };
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorResults = {
      message: String(error.message),
    };
  } else {
    errorResults = {
      message: 'Something went wrong!'
    };
  }

  return errorResults;
};

// Handling Graphql request function
export const handleRequest = async <Data>(
  document: TypedDocumentNode<Data>,
  variables?: Variables
): Promise<[Data, null] | [null, TError]> => {
  try {
    const data = await initializeGraphqlClient().request<Data>(
      document,
      variables
    );

    return [data, null];
  } catch (error: unknown) {
    return [
      null,
      {
        ...getError(error)
      }
    ];
  }
};
