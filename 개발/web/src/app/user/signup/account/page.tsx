"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import RyanMascot, { type RyanMascotHandle } from "@/components/RyanMascot";
import { useT } from "@/lib/i18n";
import {
  StepHeader,
  ProgressBar,
  BottomActions,
  PrimaryActionButton,
  PasswordStrength,
  TermsBlock,
  type TermsState,
} from "@/components/signup";

export default function SignupAccount() {
  const router = useRouter();
  const t = useT();
  const mascotRef = useRef<RyanMascotHandle>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState<TermsState>({
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [termsInvalid, setTermsInvalid] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    name.trim().length >= 1 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    password.length >= 8 &&
    terms.agreeTerms &&
    terms.agreePrivacy;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!terms.agreeTerms || !terms.agreePrivacy) {
      setTermsInvalid(true);
      return;
    }
    setError("");
    setTermsInvalid(false);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          agreeTerms: terms.agreeTerms,
          agreePrivacy: terms.agreePrivacy,
          agreeMarketing: terms.agreeMarketing,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t("signup.error.signupFailed"));
        return;
      }
      const r = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // description §4 Pattern A 보정안: PW는 메모리에서 즉시 비움
      setPassword("");
      if (r?.error) {
        setError(t("signup.error.autoLogin"));
        return;
      }
      mascotRef.current?.bounce();
      setTimeout(() => router.push("/user/signup/health"), 700);
    } catch {
      setError(t("signup.error.network"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col">
      <StepHeader step={1} backHref="/user" />
      <ProgressBar step={1} />

      <div className="flex justify-center pt-4 pb-2">
        <RyanMascot ref={mascotRef} size={160} />
      </div>

      <div className="flex-1 px-6 pt-2">
        <h1 className="text-2xl font-bold mb-2 text-center">
          {t("signup.step1.heading")}
        </h1>
        <p className="text-gray-500 mb-8 text-sm text-center">
          {t("signup.step1.subheading")}
        </p>

        <div className="space-y-4">
          <Field
            label={t("signup.step1.fields.name")}
            placeholder={t("signup.step1.fields.namePlaceholder")}
            value={name}
            onChange={setName}
            required
            autoComplete="name"
          />
          <Field
            label={t("signup.step1.fields.email")}
            type="email"
            placeholder={t("signup.step1.fields.emailPlaceholder")}
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
          />
          <div>
            <Field
              label={t("signup.step1.fields.password")}
              type="password"
              placeholder={t("signup.step1.fields.passwordPlaceholder")}
              value={password}
              onChange={setPassword}
              required
              autoComplete="new-password"
              minLength={8}
            />
            <PasswordStrength password={password} />
          </div>

          <TermsBlock
            value={terms}
            onChange={(next) => {
              setTerms(next);
              if (next.agreeTerms && next.agreePrivacy) setTermsInvalid(false);
            }}
            invalid={termsInvalid}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 text-sm text-danger bg-danger-soft rounded-xl px-4 py-3"
          >
            {error}
          </p>
        )}

        <div className="my-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">
            {t("signup.step1.sns.divider")}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-4 gap-3">
          <SocialButton
            label="K"
            aria={t("signup.step1.sns.kakaoAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            label="N"
            aria={t("signup.step1.sns.naverAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            label="G"
            aria={t("signup.step1.sns.googleAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            label=""
            aria={t("signup.step1.sns.appleAria")}
            soon={t("signup.step1.sns.soon")}
          />
        </div>
      </div>

      <BottomActions fullWidthPrimary>
        <PrimaryActionButton
          type="submit"
          label={t("signup.cta.next")}
          loading={submitting}
          disabled={!canSubmit}
          loadingLabel={t("signup.cta.loadingSubmit")}
          fullWidth
        />
      </BottomActions>
    </form>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  minLength,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-signup-accent"
      />
    </div>
  );
}

// 디자인 컨펌 전 그레이스케일. 컨펌 후 SNS 브랜드 가이드라인 색 입힘.
function SocialButton({
  label,
  aria,
  soon,
}: {
  label: string;
  aria: string;
  soon: string;
}) {
  return (
    <button
      type="button"
      onClick={() => alert(soon)}
      aria-label={aria}
      className="aspect-square rounded-xl flex items-center justify-center text-xl font-bold bg-white border-2 border-gray-300 text-gray-700 transition"
    >
      {label}
    </button>
  );
}
