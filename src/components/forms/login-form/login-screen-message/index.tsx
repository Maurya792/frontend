"use client"

import { LAST_LOGIN_INFO_KEY } from '@/lib/constants'
import { Session } from 'next-auth'
import { useLocalStorage } from 'usehooks-ts'
const LoginScreenMessage = () => {
    const [lastLoggedInUser]=useLocalStorage<Session['user'] | null>(LAST_LOGIN_INFO_KEY, null)
  return lastLoggedInUser ? `Welcome Back !`   : "Welcome to time tracker."
}

export default LoginScreenMessage