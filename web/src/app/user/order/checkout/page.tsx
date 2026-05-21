"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, AlertCircle } from "lucide-react";
import PaymentHeader from "@/components/payment/PaymentHeader";
import { useT } from "@/lib/i18n";

const MOCK_MENU = {
  id: "m-chicken-salad",
  name: "닭가슴살 샐러드",
  merchant: "B카페 · 강남점",
  price: 9800,
} as const;

const PAY_METHODS = [
  { id: "toss", key: "toss" },
  { id: "kakao", key: "kakao" },
  { id: "naver", key: "naver" },
  { id: "samsung", key: "samsung" },
] as const;

function won(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export default function OrderCheckoutPage() {
  return (
    <Suspense fallback={null}>
      <OrderCheckoutContent />
    </Suspense>
  );
}

function OrderCheckoutContent() {
  const t = useT();
  const router = useRouter();
  const search = useSearchParams();
  const slot = search.get("slot") ?? "12:30";

  const [method, setMethod] = useState<string>("toss");
  const [terms, setTerms] = useState({
    payment: true,
    merchant: true,
    marketing: false,
  });
  const [pgOpen, setPgOpen] = useState(false);

  const canPay = terms.payment && terms.merchant && !!method;

  function handlePay() {
    if (!canPay) return;
    setPgOpen(true);
    // mock PG: 2초 후 성공 → status?phase=waiting
    setTimeout(() => {
      router.push("/user/order/status?phase=waiting");
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 relative">
      <PaymentHeader
        title={t("user.lunch_payment.checkout.header")}
        stepPill={t("user.lunch_payment.checkout.step")}
        backHref="/user/order"
      />

      <main className="flex-1 px-5 pt-3 space-y-4">
        <Section title={t("user.lunch_payment.checkout.summary_label")}>
          <ul className="space-y-2 text-sm">
            <SummaryRow label="메뉴" value={MOCK_MENU.name} />
            <SummaryRow label="식당" value={MOCK_MENU.merchant} />
            <SummaryRow label="시간" value={`오늘 ${slot}`} strong />
          </ul>
        </Section>

        <Section title={t("user.lunch_payment.refund.heading")}>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li>· {t("user.lunch_payment.refund.rule0")}</li>
            <li>· {t("user.lunch_payment.refund.rule1")}</li>
            <li>· {t("user.lunch_payment.refund.rule2")}</li>
          </ul>
          <p className="mt-2 text-xs text-gray-500">
            {t("user.lunch_payment.refund.merchant_reject")}
          </p>
        </Section>

        <Section title={t("user.lunch_payment.checkout.method_label")}>
          <div role="radiogroup" className="space-y-2">
            {PAY_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={method === m.id}
                onClick={() => setMethod(m.id)}
                className={`w-full h-12 rounded-xl border-2 px-4 flex items-center justify-between transition ${
                  method === m.id
                    ? "border-signup-accent bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="text-sm font-semibold text-gray-900">
                  {t(`user.lunch_payment.pay_method.${m.key}`)}
                </span>
                {method === m.id && (
                  <Check
                    size={18}
                    strokeWidth={2}
                    className="text-signup-accent"
                    aria-hidden
                  />
                )}
              </button>
            ))}
            <button
              type="button"
              className="w-full h-12 rounded-xl border-2 border-dashed border-gray-300 px-4 flex items-center text-sm text-gray-500"
            >
              + {t("user.lunch_payment.checkout.method_add_card")}
            </button>
          </div>
        </Section>

        <Section title={t("user.lunch_payment.checkout.terms_label")}>
          <ul className="space-y-2">
            <TermsRow
              required
              label={t("user.lunch_payment.checkout.terms_payment")}
              requiredLabel={t("user.lunch_payment.checkout.terms_required")}
              checked={terms.payment}
              onChange={(v) => setTerms((s) => ({ ...s, payment: v }))}
              detailLabel={t("user.lunch_payment.checkout.terms_detail")}
            />
            <TermsRow
              required
              label={t("user.lunch_payment.checkout.terms_merchant_info")}
              requiredLabel={t("user.lunch_payment.checkout.terms_required")}
              checked={terms.merchant}
              onChange={(v) => setTerms((s) => ({ ...s, merchant: v }))}
              detailLabel={t("user.lunch_payment.checkout.terms_detail")}
            />
            <TermsRow
              label={t("user.lunch_payment.checkout.terms_marketing")}
              requiredLabel={t("user.lunch_payment.checkout.terms_optional")}
              checked={terms.marketing}
              onChange={(v) => setTerms((s) => ({ ...s, marketing: v }))}
              detailLabel={t("user.lunch_payment.checkout.terms_detail")}
            />
          </ul>
        </Section>

        <section
          role="region"
          aria-label="식당 수락 절차 안내"
          className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
        >
          <div className="flex items-start gap-2">
            <AlertCircle
              size={16}
              strokeWidth={1.75}
              className="text-gray-500 mt-0.5 shrink-0"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {t("user.lunch_payment.checkout.merchant_notice_heading")}
              </p>
              <ul className="mt-1.5 space-y-1 text-xs text-gray-700">
                <li>· {t("user.lunch_payment.checkout.merchant_notice_accept")}</li>
                <li>· {t("user.lunch_payment.checkout.merchant_notice_reject")}</li>
              </ul>
              <p className="mt-1.5 text-[11px] text-gray-500">
                {t("user.lunch_payment.checkout.merchant_notice_hint")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomCTA>
        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold text-base transition"
        >
          {t("user.lunch_payment.cta.pay", { amount: won(MOCK_MENU.price) })}
        </button>
        <p className="mt-2 text-center text-[11px] text-gray-500">
          {t("user.lunch_payment.checkout.cta_safe_note")}
        </p>
      </BottomCTA>

      {pgOpen && <PGOverlay tossLogo="TossPay" />}
    </div>
  );
}

function PGOverlay({ tossLogo }: { tossLogo: string }) {
  const t = useT();
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("user.lunch_payment.checkout.overlay_title")}
      className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-6"
    >
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">
          {tossLogo}
        </div>
        <p
          aria-live="polite"
          className="mt-4 text-base font-semibold text-gray-900"
        >
          {t("user.lunch_payment.checkout.overlay_title")}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {t("user.lunch_payment.checkout.overlay_subtitle")}
        </p>
        <div className="mt-4 flex justify-center gap-1.5">
          <Dot delay="0s" />
          <Dot delay="0.15s" />
          <Dot delay="0.3s" />
        </div>
        <p className="mt-5 text-[11px] text-gray-500 leading-relaxed">
          {t("user.lunch_payment.checkout.overlay_safety")}
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-4 text-xs font-semibold text-gray-700 underline"
        >
          {t("user.lunch_payment.checkout.overlay_cancel")}
        </button>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      style={{ animationDelay: delay }}
      className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"
    />
  );
}

function TermsRow({
  label,
  required,
  requiredLabel,
  checked,
  onChange,
  detailLabel,
}: {
  label: string;
  required?: boolean;
  requiredLabel: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  detailLabel: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-required={required}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center ${
          checked
            ? "bg-signup-accent border-signup-accent"
            : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <Check size={14} strokeWidth={2.5} className="text-white" aria-hidden />
        )}
      </button>
      <span className="flex-1 text-sm text-gray-900">
        <span className="text-gray-500 mr-1.5 text-xs">[{requiredLabel}]</span>
        {label}
      </span>
      <button type="button" className="text-xs text-gray-500 underline">
        {detailLabel}
      </button>
    </li>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-[11px] font-semibold tracking-wider text-gray-500 mb-2 uppercase">
        {title}
      </h2>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        {children}
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span
        className={`${strong ? "text-gray-900 font-bold" : "text-gray-900"}`}
      >
        {value}
      </span>
    </li>
  );
}

function BottomCTA({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto">{children}</div>
    </div>
  );
}
