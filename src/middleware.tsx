
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers'

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl
    const cookie = cookies()
    const response = NextResponse.next();
    const userLogin = cookie.get('isLoggedIn');
    const acessToken = cookie.get('token')

    if (!userLogin && !acessToken && url.pathname !== '/authenticate') {
        if (!url.pathname.includes('/changePassword')){
            if(url.pathname !== '/forgotPassword')
            return NextResponse.redirect(new URL('/authenticate', request.url))
        }
    }
    else if (userLogin && acessToken) {
        if (url.pathname === '/forgotPassword' || url.pathname.includes('/changePassword') || url.pathname == '/authenticate'){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
}