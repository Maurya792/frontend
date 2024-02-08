"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
const content: Record<string, ReactNode> = {
  "/forgot-password": null,
  "/verify-account": null,
  "/login": (
    <p className="text-center text-white mt-[20px]">
      Do not have a account ?{" "}
      <Link href="/register" className="cursor-pointer hover:opacity-90">
        {" "}
        Register{" "}
      </Link>
    </p>
  ),
  "/register": (
    <p className="text-center text-white mt-[20px]">
      Already have an account ?{" "}
      <Link href="/login" className="cursor-pointer hover:opacity-90">
        Login.
      </Link>
    </p>
  ),
};
const AuthLayoutBottomView = () => {
  const pathname = usePathname();
  return content[pathname ?? ""] ?? null;
};

export default AuthLayoutBottomView;
