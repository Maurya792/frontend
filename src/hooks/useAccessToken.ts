import { TOKEN_NAME } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useLocalStorage, useUpdateEffect } from "usehooks-ts";

export const useAccessToken = (): [
  string | null,
  Dispatch<SetStateAction<string | null>>
] => {
  const { data, update } = useSession();
  const [accessToken, _setAccessToken] = useLocalStorage<string | null>(
    TOKEN_NAME,
    data?.accessToken ?? null
  );
  const setAccessToken = async (args: SetStateAction<string | null>) => {
    let token = null;
    _setAccessToken((state) => {
      if (typeof args === "string" || args === null) {
        token = args;
      } else {
        token = args(state);
      }
      return token;
    });
    await update({ ...data, accessToken: token });
  };
  return [accessToken, setAccessToken];
};
