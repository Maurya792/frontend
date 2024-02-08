import NextAuth from "next-auth";
import { authOptions } from "@/api/lib/auth/auth-options";
export default NextAuth(authOptions);
