import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Ensure that a valid locale is used, fallback to default if not
  // Handle cases like 'en-US' by taking the first part
  const baseLocale = locale?.split("-")[0];
  const finalLocale =
    baseLocale && (routing.locales as readonly string[]).includes(baseLocale)
      ? baseLocale
      : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../../messages/${finalLocale}.json`)).default,
  };
});
