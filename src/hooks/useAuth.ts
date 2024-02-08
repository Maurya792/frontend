import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data, status } = useSession()
  return {
    login: () => {},
    register: () => {},
    verify: () => {},
    isLoading: false,
    user : data?.user,
    isUserLoading : status==='loading'
  };
};
