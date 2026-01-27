import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Add aggressive caching headers for static assets
  const pathname = request.nextUrl.pathname;

  // Cache static assets aggressively
  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  // Cache pages with stale-while-revalidate
  if (
    pathname === "/" ||
    pathname.startsWith("/servicios") ||
    pathname.startsWith("/politicas-privacidad") ||
    pathname.startsWith("/terminos-condiciones")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, stale-while-revalidate=86400"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/webpack-hmr (hot module replacement)
     */
    "/((?!api|_next/webpack-hmr).*)",
  ],
};
