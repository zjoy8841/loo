"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import ko from "./messages/ko";
import en from "./messages/en";
import vi from "./messages/vi";
import type { Messages } from "./messages/ko";

export type Locale = "ko" | "en" | "vi";

const MESSAGES: Record<Locale, Messages> = { ko, en, vi };

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

// nested object path lookup: "signup.cta.next" → messages.signup.cta.next
function lookup(obj: unknown, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === "string" ? cur : undefined;
}

// {name} 토큰 치환. description §9 ICU plural은 필요 시 별도 헬퍼로.
function format(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in params ? String(params[k]) : `{${k}}`,
  );
}

export function I18nProvider({
  children,
  initialLocale = "ko",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const t = useCallback<I18nValue["t"]>(
    (path, params) => {
      const msg =
        lookup(MESSAGES[locale], path) ??
        lookup(MESSAGES.en, path) ?? // vi → en fallback
        lookup(MESSAGES.ko, path) ?? // 최종 ko fallback
        path; // 키 누락 시 키 그대로 (개발 중 발견용)
      return format(msg, params);
    },
    [locale],
  );

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useT() {
  const ctx = useContext(I18nContext);
  if (!ctx)
    throw new Error("useT must be used within I18nProvider");
  return ctx.t;
}

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx)
    throw new Error("useLocale must be used within I18nProvider");
  return { locale: ctx.locale, setLocale: ctx.setLocale };
}
