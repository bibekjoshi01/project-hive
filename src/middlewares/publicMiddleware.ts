import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';
import {
  PUBLIC_ACCESS_TOKEN,
  PUBLIC_REFRESH_TOKEN,
} from '../constants/public/tokens';
import { HOME, PROFILE, LOGIN } from '@/constants/public/routes';

export function publicMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;

    // Skip /admin route handling in public middleware
    if (path.startsWith('/admin')) {
      return middleware(request, event);
    }

    const accessToken = request.cookies.get(PUBLIC_ACCESS_TOKEN);

    const response = NextResponse.next();

    // Set context
    response.cookies.set('CONTEXT_TYPE', 'public');

    // Protected Route Handling
    const protectedRoutes = [PROFILE];
    const isProtectedPath = protectedRoutes.some((pathname) =>
      path.startsWith(pathname),
    );

    if (isProtectedPath && !accessToken) {
      const redirectResp = NextResponse.redirect(new URL(HOME, request.url));
      redirectResp.cookies.delete(PUBLIC_REFRESH_TOKEN);
      return redirectResp;
    }

    // Prevent access to login/register if already authenticated
    const authFreeRoutes = [LOGIN];
    const isAuthFreePath = authFreeRoutes.some((pathname) =>
      path.startsWith(pathname),
    );

    if (isAuthFreePath && accessToken) {
      return NextResponse.redirect(new URL(HOME, request.url));
    }

    return middleware(request, event);
  };
}
