import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { defaultLocale, type Locale, locales } from "./config";

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale;

  // 1. Try backend first
  try {
    const backendLang = "en";

    if (backendLang && locales.includes(backendLang as Locale)) {
      locale = backendLang as Locale;
    }
  } catch {
    // Backend failed, continue
  }

  // 2. Try cookie if backend didn't give a valid language
  const cookieStore = await cookies(); // <-- fix: await the Promise
  const cookieLang = cookieStore.get("lang")?.value?.toLowerCase();
  if (
    !locales.includes(locale) &&
    cookieLang &&
    locales.includes(cookieLang as Locale)
  ) {
    locale = cookieLang as Locale;
  }

  // 3. Load messages
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch {
    const messages = (await import(`../messages/${defaultLocale}.json`))
      .default;
    return { locale: defaultLocale, messages };
  }
});
