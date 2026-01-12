import { Locale } from "./config";

/**
 * Sets a language cookie from the client
 * @param lang The locale string to store
 * @param days Number of days before expiration (default 30)
 */
export function setLanguageCookie(lang: Locale, days = 30) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `lang=${lang}; expires=${expires.toUTCString()}; path=/; samesite=lax`;
}
