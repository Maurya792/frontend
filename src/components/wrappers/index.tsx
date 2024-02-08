"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { PropsWithChildren, Suspense, useEffect } from "react";
import { ApolloWrapper } from "./apollo-wrapper";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useEffectOnce, useLocalStorage } from "usehooks-ts";
import { LAST_LOGIN_INFO_KEY, TOKEN_NAME } from "@/lib/constants";

export const RootWrapper: React.FC<PropsWithChildren<{ session: Session }>> = ({
  children,
  session,
}) => {
  const [_, setLastLoggedInUserToken] = useLocalStorage<
    Session["user"] | null
  >(LAST_LOGIN_INFO_KEY, null);
  useEffect(() => {
    if(session?.user){
        setLastLoggedInUserToken(session?.user);
    }
  }, [session, setLastLoggedInUserToken]);
  return (
    <SessionProvider session={session}>
      <ApolloWrapper session={session}>
        <Suspense>{children}</Suspense>
        <ToastContainer hideProgressBar />
      </ApolloWrapper>
    </SessionProvider>
  );
};
