import { Session } from "next-auth";
import { joinString } from "./joinString";

export const convertToSessionUser = (
  user?: any,
  accessToken?: string
): Session["user"] | undefined => {
  return user
    ? {
        ...user,
        id : String(user.id),
        name:
          user.firstName || user.lastName
            ? joinString([user.firstName, user.lastName])
            : user.username,
        image: user.profilePicture?.url,
        accessToken: accessToken ?? "",
      }
    : user;
};
