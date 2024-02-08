"use server";

import {
  GetUserDocument,
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
