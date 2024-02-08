import { getSession as getClientSession } from "next-auth/react";
import { getSession } from "@/lib/helpers/session";
export const CLIENT_TOKEN_INFO: {
  authToken: string | null | undefined;
  getAuthToken: () => Promise<string | null | undefined>;
} = {
  authToken: null,
  getAuthToken: async () => {
    let tokenFromSession;
    const sessionRetriever =
      typeof window !== "undefined" ? getClientSession : getSession;
    try {
      tokenFromSession = await sessionRetriever().then(
        (res) => res?.accessToken
      );
    } catch (err) {
      return null;
    }
    return tokenFromSession;
  },
};
