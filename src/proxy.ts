import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// 1. Inicializamos el middleware de idiomas de next-intl
const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // --- 1. Recursos Estáticos y Técnicos ---
  // Arreglamos los 404 cuando el navegador pide /es/video.mp4 o /es/_next/...
  const localePattern = /^\/(en|es)\/(.*)/;
  const match = pathname.match(localePattern);

  if (match) {
    const [_, locale, rest] = match;
    // Si la ruta tiene un punto (archivo) o es interna de Next (_next, api),
    // la reescribimos a la raíz pero PRESERVAMOS los parámetros de búsqueda (?url=...)
    if (
      rest.includes(".") ||
      rest.startsWith("_next") ||
      rest.startsWith("api")
    ) {
      return NextResponse.rewrite(new URL(`/${rest}${search}`, request.url));
    }
  }

  // Bypass para assets técnicos que no están prefijados con el idioma
  if (
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // --- 2. Lógica de Idiomas (Persistencia y Traducción) ---
  const response = intlMiddleware(request);

  // --- 3. Bloqueo de Sitio (Site Lock) ---
  const isLockPage = pathname.includes("/lock");
  if (!isLockPage) {
    const accessGranted = request.cookies.get("site_access");
    if (!accessGranted || accessGranted.value !== "granted") {
      const url = request.nextUrl.clone();

      const pathLocale = pathname.split("/")[1];
      const currentLocale =
        routing.locales.find((l) => l === pathLocale) ?? routing.defaultLocale;

      url.pathname = `/${currentLocale}/lock`;

      const redirectResponse = NextResponse.redirect(url);

      // Persistir cookies de idioma durante la redirección del candado
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value);
      });

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
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/webpack-hmr|favicon.ico).*)"],
};
