"use client";

import { useSession } from "next-auth/react";

export const withCSRAuth = <T extends unknown>(
  Component: React.FC<T>
): React.FC<T> => {
  const AuthComponent: typeof Component = (props) => {
    const session = useSession({ required : true })
    //@ts-ignore
    return <Component {...props} />;
  };

  return AuthComponent;
};
