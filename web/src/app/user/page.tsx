"use client";

import Link from "next/link";
import { Sparkles, Sunrise, MapPin } from "lucide-react";
import RyanMascot from "@/components/RyanMascot";
import { useT } from "@/lib/i18n";

const FEATURES = [
  { Icon: Sparkles, key: "feature1" },
  { Icon: Sunrise, key: "feature2" },
  { Icon: MapPin, key: "feature3" },
] as const;

export default function UserSplash() {
  const t = useT();

  return (
    <main className="min-h-screen flex flex-col px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div
          role="img"
          aria-label={t("user.splash.brand_aria")}
          className="mb-6"
        >
          <RyanMascot size={96} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t("user.splash.brand")}
        </h1>
        <p className="text-sm text-gray-500 mb-10 text-center">
          {t("user.splash.tagline")}
        </p>

        <ul className="w-full space-y-3">
          {FEATURES.map(({ Icon, key }) => (
            <li
              key={key}
              className="bg-gray-100 rounded-xl h-14 px-4 flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full border border-gray-400 shrink-0 flex items-center justify-center">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-gray-700"
                  aria-hidden
                />
              </div>
              <span className="text-sm text-gray-700">
                {t(`user.splash.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-md mx-auto space-y-4 pt-8">
        <Link
          href="/user/signup/account"
          className="flex w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-base items-center justify-center transition"
        >
          {t("user.splash.cta_primary")}
        </Link>
        <p className="text-center text-sm text-gray-500">
          {t("user.splash.cta_login_prefix")}{" "}
          <Link
            href="/login"
            className="text-gray-900 font-semibold underline"
          >
            {t("user.splash.cta_login_link")}
          </Link>
        </p>
      </div>
    </main>
  );
}
