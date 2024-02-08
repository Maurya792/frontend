"use server";

import {
  GetUserDocument,
  InviteUserDocument,
  InviteUserInput,
  UserWhereUniqueInput,
} from "../__generated__/graphql/graphql";
import { _apolloClient } from "../lib/apollo/apollo-client/client";
import { withError } from "./utils";

export const getUser = withError(async (where: UserWhereUniqueInput) => {
  const res = await _apolloClient.query({
    query: GetUserDocument,
    variables: { where },
  });
  return res.data.user;
});

export const inviteUser = async (data: InviteUserInput) => {
  const res = await _apolloClient.mutate({
    mutation: InviteUserDocument,
    variables: { data },
  });
  return res;
};
