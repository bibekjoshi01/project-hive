import {
  NextRequest,
  NextResponse,
  NextFetchEvent,
  NextMiddleware,
} from 'next/server';
import { ADMIN_LOGIN, ADMIN_DASHBOARD } from '@/constants/admin/routes';
import { ADMIN_ACCESS_TOKEN } from '@/constants/admin/tokens';

export function adminMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;

    // Only apply to admin routes
    if (!path.startsWith('/admin')) return middleware(request, event);

    const cookie = request.cookies.get(ADMIN_ACCESS_TOKEN);
    const logout = request.cookies.get('logout');

    const response = NextResponse.next();
    response.cookies.set('CONTEXT_TYPE', 'admin', { path: '/' });

    const publicRoutes = [ADMIN_LOGIN];
    const protectedRoutes = [ADMIN_DASHBOARD];

    const isPublic = publicRoutes.includes(path);
    const isProtected = protectedRoutes.some((route) => path.startsWith(route));

    if (logout?.value === 'false' && path === ADMIN_LOGIN && cookie?.value) {
      return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url));
    }

    if (!isPublic && !cookie?.value) {
      return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url));
    }

    return middleware(request, event);
  };
}
