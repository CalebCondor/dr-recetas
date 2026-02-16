import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. Site Lock Logic ---
  const isPublicAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/lock";

  if (!isPublicAsset) {
    const accessGranted = request.cookies.get("site_access");
    if (!accessGranted || accessGranted.value !== "granted") {
      const url = request.nextUrl.clone();
      url.pathname = "/lock";
      return NextResponse.redirect(url);
    }
  }

  // --- 2. Caching Logic ---
  const response = NextResponse.next();

  // Cache static assets aggressively
  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)$/)
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
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
      "public, max-age=3600, stale-while-revalidate=86400",
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/webpack-hmr (hot module replacement)
     * - favicon.ico, etc.
     */
    "/((?!api|_next/webpack-hmr|favicon.ico).*)",
  ],
};
