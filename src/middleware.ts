import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { url, nextUrl } = request
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pathname, host } = nextUrl
    const authToken = request.cookies.get("auth-token")

    // const isProtectedRoute = protectedRoutes.includes(pathname)
    const isPublicRoute = pathname.startsWith("/auth") && !pathname.includes("/logout")

    // =====Redirect to /sign-in if the user is not authenticated=====
    if (!isPublicRoute && !authToken) {
        return NextResponse.redirect(new URL('/auth/sign-in', request.nextUrl));
    }

    // =============Redirect to / if the user is authenticated========== 
    if(isPublicRoute && authToken) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
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