import { GetUserDocument, UserFragmentDoc } from "@/api/__generated__/graphql/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { useAuth } from "./useAuth";

export const useUsers = () => {
    const { user : userFromSession} = useAuth()
    const { data : userData } = useSuspenseQuery(GetUserDocument, {
        variables: { where: { id: Number(userFromSession?.id) } },
      });

      return {
        user : userData.user,
    }
}