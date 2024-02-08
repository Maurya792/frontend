import { authOptions } from "@/api/lib/auth/auth-options"
import { getServerSession } from "next-auth/next"

export async function getSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}
