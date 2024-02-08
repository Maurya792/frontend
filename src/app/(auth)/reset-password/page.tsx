import ResetPasswordview from "@/components/views/reset-password-view";
import React from "react";

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  return <ResetPasswordview searchParams={searchParams} />;
};

export default ResetPasswordPage;
