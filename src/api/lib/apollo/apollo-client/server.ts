import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  ApolloClientOptions,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { NEXT_PUBLIC_GRAPHQL_API } from "@/lib/constants";
import { setContext } from "@apollo/client/link/context";
import { getSession as getClientSession } from "next-auth/react";
import { getSession } from "@/lib/helpers/session";
const httpLink = new HttpLink({
  uri: NEXT_PUBLIC_GRAPHQL_API,
  credentials: "include",
});

const { getClient } = registerApolloClient(() => {
  const authLink = setContext(async (_, { headers }) => {
    // Your authentication logic here
    // You might want to include cookies or tokens
    let token: string | null = null;
    const sessionRetriever =
      typeof window !== "undefined" ? getClientSession : getSession;
    const tokenFromSession = await sessionRetriever().then(
      (res) => res?.accessToken
    );
    if (tokenFromSession) {
      token = tokenFromSession;
    }

    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        // Add your authentication headers here
      },
    };
  });
  const apolloSSRConfig: ApolloClientOptions<NormalizedCacheObject> = {
    link: authLink.concat(httpLink),
    cache: new NextSSRInMemoryCache(),
    credentials: "include",
    defaultOptions: {
      mutate : {
        errorPolicy  : 'all'
      },
      query : {
        errorPolicy  : 'all'
      },
      watchQuery : {
        errorPolicy  : 'all'
      }
    },
  };
  return new NextSSRApolloClient(apolloSSRConfig);
});

export const _apolloSSRClient = getClient();
