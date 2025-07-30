import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { adminMiddleware } from './middlewares/adminMiddleware';
import { publicMiddleware } from './middlewares/publicMiddleware';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith('/admin');
  const isPublicRoute = !isAdminRoute;

  const response = NextResponse.next();

  if (isAdminRoute) {
    return adminMiddleware(() => response)(request, event);
  }

  if (isPublicRoute) {
    return publicMiddleware(() => response)(request, event);
  }

  return response;
}

// Apply middleware only to routes you care about
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
