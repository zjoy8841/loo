"use client";

import { useMemo } from "react";
import { useT } from "@/lib/i18n";

export type TermsState = {
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
};

/**
 * 회원가입 1단계 약관 블록.
 * description §1: "약관 3 + SNS 4".
 *  - agreeTerms (필수)
 *  - agreePrivacy (필수)
 *  - agreeMarketing (선택)
 * 한국 앱 표준 패턴 — 전체 동의 토글 + 개별 3.
 */
export default function TermsBlock({
  value,
  onChange,
  invalid,
}: {
  value: TermsState;
  onChange: (next: TermsState) => void;
  invalid?: boolean;
}) {
  const t = useT();
  const allChecked = useMemo(
    () => value.agreeTerms && value.agreePrivacy && value.agreeMarketing,
    [value],
  );

  const toggleAll = () => {
    const next = !allChecked;
    onChange({
      agreeTerms: next,
      agreePrivacy: next,
      agreeMarketing: next,
    });
  };

  return (
    <fieldset
      className={`mt-2 rounded-2xl border ${
        invalid ? "border-danger" : "border-gray-200"
      } bg-white px-4 py-3 space-y-2`}
    >
      <legend className="sr-only">{t("signup.step1.terms.srLabel")}</legend>

      <Row
        checked={allChecked}
        onChange={toggleAll}
        label={t("signup.step1.terms.all")}
        emphasis
      />
      <div className="h-px bg-gray-100" />
      <Row
        checked={value.agreeTerms}
        onChange={(v) => onChange({ ...value, agreeTerms: v })}
        label={t("signup.step1.terms.service")}
        href="#"
        viewLabel={t("signup.step1.terms.view")}
      />
      <Row
        checked={value.agreePrivacy}
        onChange={(v) => onChange({ ...value, agreePrivacy: v })}
        label={t("signup.step1.terms.privacy")}
        href="#"
        viewLabel={t("signup.step1.terms.view")}
      />
      <Row
        checked={value.agreeMarketing}
        onChange={(v) => onChange({ ...value, agreeMarketing: v })}
        label={t("signup.step1.terms.marketing")}
        href="#"
        viewLabel={t("signup.step1.terms.view")}
      />

      {invalid ? (
        <p className="text-xs text-danger pt-1">
          {t("signup.step1.terms.invalid")}
        </p>
      ) : null}
    </fieldset>
  );
}

function Row({
  checked,
  onChange,
  label,
  href,
  emphasis,
  viewLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  href?: string;
  emphasis?: boolean;
  viewLabel?: string;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer select-none">
      <span className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-5 h-5 accent-signup-accent"
        />
        <span
          className={`text-sm ${emphasis ? "font-semibold" : "text-gray-700"}`}
        >
          {label}
        </span>
      </span>
      {href && viewLabel ? (
        <a
          href={href}
          className="text-xs text-gray-400 underline"
          onClick={(e) => e.stopPropagation()}
        >
          {viewLabel}
        </a>
      ) : null}
    </label>
  );
}
