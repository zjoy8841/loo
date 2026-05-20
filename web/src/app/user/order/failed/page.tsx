"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle, CreditCard, Clock } from "lucide-react";
import PaymentHeader from "@/components/payment/PaymentHeader";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

type Variant = "method" | "context";

const MOCK_ATTEMPT = {
  at: "오늘 12:24",
  method: "토스페이",
  amount: 9800,
  reasonMethod: "잔액 부족",
  reasonContext: "12:30 자리가 다른 분께 갔어요",
  slot: "12:30",
  holdUntil: "12:39",
} as const;

function won(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export default function OrderFailedPage() {
  const t = useT();
  const router = useRouter();
  const search = useSearchParams();
  const variant: Variant =
    search.get("variant") === "context" ? "context" : "method";

  function handleCta() {
    if (variant === "method") {
      router.push("/user/order/checkout");
    } else {
      router.push("/user/order");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <PaymentHeader
        left="close"
        backHref="/user/home"
        title={t("user.lunch_payment.failed.header")}
      />

      <main className="flex-1 px-5 pt-6 space-y-5">
        <section
          role="alert"
          aria-live="assertive"
          className="text-center pt-4 pb-2"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
            {variant === "method" ? (
              <CreditCard size={32} strokeWidth={1.5} aria-hidden />
            ) : (
              <AlertTriangle size={32} strokeWidth={1.5} aria-hidden />
            )}
          </div>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            {variant === "method"
              ? t("user.lunch_payment.failed.method_heading")
              : t("user.lunch_payment.failed.context_heading")}
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed px-2">
            {variant === "method"
              ? t("user.lunch_payment.failed.method_subhead")
              : t("user.lunch_payment.failed.context_subhead", {
                  slot_time: MOCK_ATTEMPT.slot,
                })}
          </p>
        </section>

        {variant === "method" && (
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 flex items-center gap-2.5">
            <Clock size={16} strokeWidth={1.75} className="text-gray-500 shrink-0" aria-hidden />
            <p className="text-xs text-gray-700">
              {t("user.lunch_payment.failed.hold_label", {
                slot_time: MOCK_ATTEMPT.slot,
                until: MOCK_ATTEMPT.holdUntil,
              })}
            </p>
          </section>
        )}

        <section>
          <h2 className="text-[11px] font-semibold tracking-wider text-gray-500 mb-2 uppercase">
            {t("user.lunch_payment.failed.attempt_label")}
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm">
            <Row
              label={t("user.lunch_payment.failed.attempt_at")}
              value={MOCK_ATTEMPT.at}
            />
            <Row
              label={t("user.lunch_payment.failed.attempt_method")}
              value={MOCK_ATTEMPT.method}
            />
            <Row
              label={t("user.lunch_payment.failed.attempt_amount")}
              value={won(MOCK_ATTEMPT.amount)}
            />
            <Row
              label={t("user.lunch_payment.failed.attempt_reason")}
              value={
                variant === "method"
                  ? MOCK_ATTEMPT.reasonMethod
                  : MOCK_ATTEMPT.reasonContext
              }
              danger
            />
          </div>
        </section>

        {variant === "context" && (
          <RyanBox
            variant="alternative"
            heading="다른 시간 추천해드릴게요"
            body="11:30 · 12:00 자리는 아직 비어 있어요. 식당이 같은 메뉴 준비 가능합니다."
          />
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto space-y-2">
          <button
            type="button"
            onClick={handleCta}
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-base transition"
          >
            {variant === "method"
              ? t("user.lunch_payment.cta.retry_method")
              : t("user.lunch_payment.cta.retry_time")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/user/home")}
            className="w-full h-12 text-sm text-gray-600 font-semibold"
          >
            {t("user.lunch_payment.cta.home")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span
        className={`${danger ? "text-gray-900 font-bold" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
