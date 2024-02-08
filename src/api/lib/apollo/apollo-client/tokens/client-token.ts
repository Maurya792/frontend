import { getSession as getClientSession } from "next-auth/react";
import { getSession } from "@/lib/helpers/session";
import { Session } from "../server";
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
        (res) => (res as Session)?.accessToken
      );
    } catch (err) {
      return null;
    }
    return tokenFromSession;
  },
};
