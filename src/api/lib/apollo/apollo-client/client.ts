"use";
import { NEXT_PUBLIC_GRAPHQL_API } from "@/lib/constants";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from "@apollo/client/link/context";

import { CLIENT_TOKEN_INFO } from "./tokens/client-token";

export function makeClient() {
  const httpLink = new HttpLink({
    uri: NEXT_PUBLIC_GRAPHQL_API,
    credentials: "include",
  }) as unknown as ApolloLink;
  const authLink = setContext(async (_, { headers }) => {
    // Your authentication logic here
    // You might want to include cookies or tokens
    if (!CLIENT_TOKEN_INFO.authToken) {
      const tokenFromSession = await CLIENT_TOKEN_INFO.getAuthToken();
      if (tokenFromSession) {
        CLIENT_TOKEN_INFO.authToken = tokenFromSession;
      }
    }

    //   if (typeof localStorage !== "undefined") {
    //     token = localStorage.getItem(TOKEN_NAME);
    //   }
    return {
      headers: {
        ...headers,
        Authorization: CLIENT_TOKEN_INFO.authToken ? `Bearer ${CLIENT_TOKEN_INFO.authToken}` : "",
        // Add your authentication headers here
      },
    };
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: authLink.concat(
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink
    ),
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
      watchQuery: {
        errorPolicy: "all",
      },
    },
  });
}

export const _apolloClient = makeClient();
