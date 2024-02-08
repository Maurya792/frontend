import { ReactNode } from "react";

import translations from "./en";
type Translations = typeof translations;

/**
 * Returns the text for the given key, allowing the args to be injected.
 */
export function translate<TKey extends keyof Translations>(
  key: TKey,
  args: Translations[TKey] extends (args: infer TArgs) => string ? TArgs : never
): Translations[TKey] extends (args: infer TArgs) => infer TReturn
  ? TReturn
  : never;
/**
 * Returns the text for the given key
 */
export function translate<TKey extends keyof Translations>(
  key: TKey
): Translations[TKey] extends string ? string : never;
export function translate(key: keyof Translations, args?: unknown) {
  const translation = translations[key];
  if (typeof translation === "function") {
    return translation(args as never);
  }
  return translation;
}

/**
 * Use this to mark "display text" that is not yet translated.
 * This helps us keep track of untranslated code, but doesn't slow us down with official translations.
 */
export function notTranslated<T extends string | ReactNode>(text: T): T {
  return text;
}
