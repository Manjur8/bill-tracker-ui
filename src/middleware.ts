import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { url, nextUrl } = request
    const { pathname, host } = nextUrl
    // const authToken = request.cookies.get("auth-token")

    // Avoid redirect loop if already on /auth
    if (pathname.startsWith('/auth')) {
        if(request.cookies.has("auth-token")) {
            return NextResponse.redirect(`${host}`);
        }
        return NextResponse.next();
    }

    if(!request.cookies.has("auth-token")) {
        return NextResponse.redirect(`${host}/auth`);
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico, sitemap.xml, robots.txt (metadata files)
       */
      '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
  }