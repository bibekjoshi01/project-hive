import {
  NextRequest,
  NextResponse,
  NextFetchEvent,
  NextMiddleware,
} from 'next/server';
import {
  PUBLIC_ACCESS_TOKEN,
  PUBLIC_REFRESH_TOKEN,
} from '../constants/public/tokens';
import {
  HOME,
  PROFILE,
  LOGIN,
  PROJECT_SUBMIT,
} from '@/constants/public/routes';

export function publicMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;

    // Skip admin routes
    if (path.startsWith('/admin')) return middleware(request, event);

    const accessToken = request.cookies.get(PUBLIC_ACCESS_TOKEN);
    const response = NextResponse.next();
    response.cookies.set('CONTEXT_TYPE', 'public');

    const protectedRoutes = [PROFILE, PROJECT_SUBMIT];
    const isProtectedPath = protectedRoutes.some((route) =>
      path.startsWith(route),
    );

    if (isProtectedPath && !accessToken) {
      const redirect = NextResponse.redirect(new URL(LOGIN, request.url));
      redirect.cookies.delete(PUBLIC_REFRESH_TOKEN);
      return redirect;
    }

    const authFreeRoutes = [LOGIN];
    const isAuthFreePath = authFreeRoutes.some((route) =>
      path.startsWith(route),
    );

    if (isAuthFreePath && accessToken) {
      return NextResponse.redirect(new URL(HOME, request.url));
    }

    return middleware(request, event);
  };
}
