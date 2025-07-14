import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { APP_ROUTES } from "./utils/routes";

export default async function middleware(req: NextRequest, res: NextResponse) {
    const cookie = req.cookies.get('better-auth.session_token')
    if (!cookie) {
        return NextResponse.redirect(new URL(APP_ROUTES.SIGN_IN, req.url))
    }

    const session = await auth.api.getSession({
        headers: req.headers,
    })

    if (!session) {
        return NextResponse.redirect(new URL(APP_ROUTES.SIGN_IN, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!sign-up|sign-in|api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}