"use server";
import { NEXT_PUBLIC_APP_HOST } from "@/lib/constants";
import {
  ForgotPasswordDocument,
  ForgotPasswordInput,
  LoginDocument,
  LoginInput,
  RegisterDocument,
  RegisterInput,
  ResetPasswordDocument,
  ResetPasswordInput,
  VerifyAccountDocument,
  VerifyAccountInput,
} from "../__generated__/graphql/graphql";
import { _apolloClient } from "../lib/apollo/apollo-client/client";

export const register = async (data: RegisterInput) => {
  const res = await _apolloClient.mutate({
    mutation: RegisterDocument,
    variables: {
      data: { ...data, redirectUrl: `${NEXT_PUBLIC_APP_HOST}/verify-account` },
    },
  });
  return res;
};
export const login = async (data: LoginInput) => {
  const res = await _apolloClient.mutate({
    mutation: LoginDocument,
    variables: { data },
  });
  return res;
};
export const verifyAccount = async (data: VerifyAccountInput) => {
  const res = await _apolloClient.mutate({
    mutation: VerifyAccountDocument,
    variables: { data },
  });
  return res.data?.verifyAccount;
};
export const forgotPassword = async (data: ForgotPasswordInput) => {
  const res = await _apolloClient.mutate({
    mutation: ForgotPasswordDocument,
    variables: {
      data: { ...data, redirectUrl: `${NEXT_PUBLIC_APP_HOST}/reset-password` },
    },
  });
  return res;
};

export const resetPassword = async (data: ResetPasswordInput) => {
  const res = await _apolloClient.mutate({
    mutation: ResetPasswordDocument,
    variables: { data },
  });
  return res;
};
