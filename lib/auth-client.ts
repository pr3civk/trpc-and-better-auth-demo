'use client'

import { env } from "@/utils/env"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: env.client.NEXT_PUBLIC_API_URL
})