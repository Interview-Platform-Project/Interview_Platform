import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PAGES = new Set(['/login', '/register']);
const PUBLIC_PAGES = new Set(['/', '/login', '/register']);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API идёт через rewrite на Nest — auth-редиректы страниц сюда не мешаем
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token')?.value;
  const isLoggedIn = Boolean(accessToken);
  const isAuthPage = AUTH_PAGES.has(pathname);
  const isPublicPage = PUBLIC_PAGES.has(pathname);

  // Закрытые страницы без cookie → login
  if (!isLoggedIn && !isPublicPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Уже вошёл, но открыл login/register → home
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Всё, кроме статики Next и файлов с расширением.
     * /api оставляем в matcher, но выше сразу next() —
     * так rewrite на Nest не ломается редиректами.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
