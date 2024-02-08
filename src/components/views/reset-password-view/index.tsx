import React from "react";
import ResetPasswordForm from "@/components/forms/reset-password-form";

const ResetPasswordview = async ({
  searchParams,
}: {
  searchParams: { token?: string };
}) => {
  return <ResetPasswordForm searchParams={searchParams} />;
};

export default ResetPasswordview;
