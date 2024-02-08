"use client";

import { makeClient } from "@/api/lib/apollo/apollo-client/client";
import {
  ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { Session } from "next-auth";

export function ApolloWrapper({ children, session }: React.PropsWithChildren<{session : Session }>) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
