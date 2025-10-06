import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // const token = request.cookies.get('access_token')
    // const { pathname } = new URL(request.url)
    // console.log('pathname', pathname)

    // if (!token && pathname !== '/signIn') {
    //     return NextResponse.redirect(new URL('/signIn', request.url))
    // }

    // if (token && pathname === '/signIn') {
    //     return NextResponse.redirect(new URL('/home', request.url))
    // }

    // if (pathname === '/') {
    //     return NextResponse.redirect(new URL('/home', request.url))
    // }

    // const response = NextResponse.next()

    // return response

    let response: NextResponse
    if (new URL(request.url).pathname == '/') {
        response = NextResponse.redirect(new URL('/home', request.url))
        return response
    } else {
        response = NextResponse.next()
    }
}

export const config = {
    matcher: '/:path*',
}
