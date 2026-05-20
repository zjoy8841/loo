"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

/**
 * description §3 BottomActions.
 * - 2~7단계: LaterButton + PrimaryActionButton 1:2 grid
 * - 1단계: Primary 풀폭 (`fullWidthPrimary` 사용)
 */
export default function BottomActions({
  children,
  fullWidthPrimary,
}: {
  children: ReactNode;
  fullWidthPrimary?: boolean;
}) {
  return (
    <div
      className={`px-6 py-4 border-t border-gray-200 ${
        fullWidthPrimary ? "" : "grid grid-cols-3 gap-3"
      }`}
    >
      {children}
    </div>
  );
}

export function LaterButton({
  onPress,
  label,
  warnLevel = "soft",
  disabled,
}: {
  onPress: () => void;
  label?: string;
  warnLevel?: "soft" | "strong";
  disabled?: boolean;
}) {
  const t = useT();
  const helpId = warnLevel === "strong" ? "later-strong-warn" : undefined;
  return (
    <>
      <button
        type="button"
        onClick={onPress}
        disabled={disabled}
        aria-describedby={helpId}
        data-warn-level={warnLevel}
        className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
      >
        {label ?? t("signup.cta.later")}
      </button>
      {warnLevel === "strong" ? (
        <span id={helpId} className="sr-only">
          {t("signup.cta.laterWarnSr")}
        </span>
      ) : null}
    </>
  );
}

export function PrimaryActionButton({
  label,
  onPress,
  type = "button",
  loading,
  disabled,
  fullWidth,
  loadingLabel,
}: {
  label: string;
  onPress?: () => void;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  loadingLabel?: string;
}) {
  const t = useT();
  const colSpan = fullWidth ? "block w-full" : "col-span-2";
  return (
    <button
      type={type}
      onClick={onPress}
      disabled={disabled || loading}
      aria-disabled={disabled || loading || undefined}
      className={`${colSpan} bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signup-accent/40`}
    >
      {loading ? (loadingLabel ?? t("signup.cta.loadingSave")) : label}
    </button>
  );
}
