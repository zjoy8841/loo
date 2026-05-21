"use client";

import { Check, X } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * 비밀번호 강도 미터 4단계 + 조건 체크리스트.
 * description §8 + Figma U-02-1 시안.
 *
 * 점수 산출:
 *  - 8자 이상  → +1
 *  - 12자 이상 → +1
 *  - 영문 + 숫자 혼합 → +1
 *  - 특수문자 포함 → +1
 *  - 최종 0~4. 0은 비어있음/매우 약함, 4는 매우 강함.
 */
export function scorePassword(pw: string): 0 | 1 | 2 | 3 | 4 {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  const hasLetter = /[A-Za-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  if (hasLetter && hasDigit) score++;
  if (hasSpecial) score++;
  return Math.max(0, Math.min(4, score)) as 0 | 1 | 2 | 3 | 4;
}

const LABEL_KEYS = [
  "signup.step1.password.labels.empty",
  "signup.step1.password.labels.veryWeak",
  "signup.step1.password.labels.weak",
  "signup.step1.password.labels.fair",
  "signup.step1.password.labels.strong",
] as const;

// 그레이스케일 4단계 — 명도로 강도 표시 (컨펌 후 시멘틱 색 swap)
const BAR_COLORS = [
  "bg-gray-200",
  "bg-gray-400",
  "bg-gray-500",
  "bg-gray-700",
  "bg-gray-900",
] as const;

const CONDITION_KEYS = ["length", "letter", "digit", "special"] as const;

function evaluateConditions(pw: string) {
  return {
    length: pw.length >= 8,
    letter: /[A-Za-z]/.test(pw),
    digit: /\d/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  };
}

export default function PasswordStrength({ password }: { password: string }) {
  const t = useT();
  const score = scorePassword(password);
  const label = t(LABEL_KEYS[score]);
  const empty = !password;
  const conditions = evaluateConditions(password);

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1.5" role="presentation">
        {[0, 1, 2, 3].map((i) => {
          const filled = !empty && i < score;
          const color = filled ? BAR_COLORS[score] : "bg-gray-200";
          return (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${color}`}
            />
          );
        })}
      </div>
      <p
        className={`text-xs mt-1.5 ${
          empty
            ? "text-gray-400"
            : score >= 3
              ? "text-gray-700 font-semibold"
              : score >= 2
                ? "text-gray-500"
                : "text-gray-600 font-semibold"
        }`}
      >
        {label}
      </p>
      <ul className="mt-2 grid grid-cols-2 gap-y-1 gap-x-3" aria-hidden>
        {CONDITION_KEYS.map((key) => {
          const met = conditions[key];
          return (
            <li
              key={key}
              className="flex items-center gap-1.5 text-[11px] leading-tight"
            >
              {met ? (
                <Check
                  size={12}
                  strokeWidth={2.5}
                  className="text-gray-900 shrink-0"
                />
              ) : (
                <X
                  size={12}
                  strokeWidth={2.5}
                  className="text-gray-300 shrink-0"
                />
              )}
              <span className={met ? "text-gray-700" : "text-gray-400"}>
                {t(`signup.step1.password.conditions.${key}`)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
