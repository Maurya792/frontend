"use client"
import { Image } from "@/components/ui/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import loginBG from "public/images/login-bg.png";
import { PersonalizeForm } from "@/components/forms/personalize-form";
import { signIn, useSession } from "next-auth/react";
import useSWR from "swr";
import Skeleton from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { verifyAccount } from "@/api/server-actions/auth-actions";

const PersonalizeView: React.FC<{
  email?: string;
  token?: string;
}> = ({ email, token }) => {

  return (
    <>
      helllo
    </>
  );
};

export default PersonalizeView;
