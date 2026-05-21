"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Check, X, Loader2 } from "lucide-react";
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

type EmailStatus = "idle" | "invalid" | "checking" | "available" | "taken";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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
  // React 19: useEffect 안 동기 setState 금지. localStatus는 derive, server 결과만 state.
  const [remoteResult, setRemoteResult] = useState<{
    email: string;
    status: "available" | "taken";
  } | null>(null);

  // debounce 500ms 이메일 중복 체크 — fetch 결과만 setState
  useEffect(() => {
    if (!email || !EMAIL_RE.test(email)) return;
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/auth/check-email?email=${encodeURIComponent(email)}`,
        );
        if (cancelled || !res.ok) return;
        const data = (await res.json()) as { available: boolean };
        setRemoteResult({
          email,
          status: data.available ? "available" : "taken",
        });
      } catch {
        /* silent — UI는 "checking" 유지 */
      }
    }, 500);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [email]);

  const emailStatus: EmailStatus = !email
    ? "idle"
    : !EMAIL_RE.test(email)
      ? "invalid"
      : remoteResult && remoteResult.email === email
        ? remoteResult.status
        : "checking";

  const canSubmit =
    name.trim().length >= 1 &&
    EMAIL_RE.test(email) &&
    emailStatus === "available" &&
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
          <EmailField
            label={t("signup.step1.fields.email")}
            placeholder={t("signup.step1.fields.emailPlaceholder")}
            value={email}
            onChange={setEmail}
            status={emailStatus}
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
            glyph={<KakaoGlyph />}
            aria={t("signup.step1.sns.kakaoAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            glyph={<NaverGlyph />}
            aria={t("signup.step1.sns.naverAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            glyph={<GoogleGlyph />}
            aria={t("signup.step1.sns.googleAria")}
            soon={t("signup.step1.sns.soon")}
          />
          <SocialButton
            glyph={<AppleGlyph />}
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
        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-signup-accent"
      />
    </div>
  );
}

function EmailField({
  label,
  placeholder,
  value,
  onChange,
  status,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  status: EmailStatus;
}) {
  const t = useT();
  const borderClass =
    status === "available"
      ? "border-gray-900"
      : status === "taken"
        ? "border-gray-700"
        : status === "checking"
          ? "border-gray-500"
          : "border-gray-300";

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor="signup-email" className="text-sm font-semibold">
          {label}
        </label>
        <StatusBadge status={status} />
      </div>
      <input
        id="signup-email"
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        autoComplete="email"
        aria-invalid={status === "taken" || status === "invalid"}
        className={`w-full bg-white border rounded-xl px-4 py-3 focus:outline-none focus:border-signup-accent ${borderClass}`}
      />
      {status === "taken" ? (
        <p className="mt-1.5 text-[11px] text-gray-700 font-semibold">
          {t("signup.step1.email.takenHint")}{" "}
          <Link
            href="/login"
            className="underline text-gray-900"
          >
            {t("signup.step1.email.loginLink")}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function StatusBadge({ status }: { status: EmailStatus }) {
  const t = useT();
  if (status === "idle" || status === "invalid") return null;
  if (status === "checking") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-gray-500 font-semibold">
        <Loader2 size={10} strokeWidth={2.5} className="animate-spin" />
        {t("signup.step1.email.statusChecking")}
      </span>
    );
  }
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] text-gray-900 font-semibold">
        <Check size={11} strokeWidth={3} />
        {t("signup.step1.email.statusAvailable")}
      </span>
    );
  }
  // taken
  return (
    <span className="inline-flex items-center gap-1 text-[10px] text-gray-700 font-semibold">
      <X size={11} strokeWidth={3} />
      {t("signup.step1.email.statusTaken")}
    </span>
  );
}

// 그레이스케일 SNS 버튼. brand 컬러는 디자인 컨펌 후 입힘.
function SocialButton({
  glyph,
  aria,
  soon,
}: {
  glyph: React.ReactNode;
  aria: string;
  soon: string;
}) {
  return (
    <button
      type="button"
      onClick={() => alert(soon)}
      aria-label={aria}
      className="aspect-square rounded-xl flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
    >
      <span className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center">
        {glyph}
      </span>
    </button>
  );
}

function KakaoGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.79 1.84 5.24 4.61 6.65L5.5 21l3.95-2.46c.83.13 1.69.21 2.55.21 5.52 0 10-3.58 10-8s-4.48-7.75-10-7.75z" />
    </svg>
  );
}

function NaverGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M16 3v10.55L8.5 3H4v18h4V10.45L15.5 21H20V3z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.05 12.04c-.02-2.78 2.27-4.12 2.37-4.18-1.29-1.89-3.3-2.15-4.02-2.18-1.71-.17-3.34 1.01-4.21 1.01-.87 0-2.21-.99-3.63-.96-1.87.03-3.6 1.09-4.56 2.76-1.94 3.37-.5 8.35 1.4 11.08.93 1.34 2.03 2.84 3.49 2.79 1.41-.06 1.94-.91 3.64-.91 1.7 0 2.18.91 3.66.88 1.51-.03 2.47-1.36 3.39-2.71 1.07-1.55 1.51-3.05 1.53-3.13-.03-.01-2.93-1.13-2.96-4.45zM14.7 4.04c.78-.94 1.3-2.25 1.16-3.55-1.12.05-2.47.74-3.27 1.68-.72.83-1.36 2.17-1.19 3.45 1.25.1 2.52-.63 3.3-1.58z" />
    </svg>
  );
}
