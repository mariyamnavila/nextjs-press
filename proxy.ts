import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    // console.log("request", request.nextUrl);
    // console.log("pathname", pathname);
    // console.log("Proxy");

    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*',
        '/((?!api|_next/static|fav.ico|_next/image|.*\\.png$).*)',
    ],
}