"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Footprints,
  Clock,
  Users,
  Utensils,
  Heart,
} from "lucide-react";
import PaymentHeader from "@/components/payment/PaymentHeader";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

const SLOTS = [
  { time: "11:30", remaining: 5, available: true },
  { time: "12:00", remaining: 3, available: true },
  { time: "12:30", remaining: 2, available: true },
  { time: "13:00", remaining: 0, available: false },
] as const;

const DEFAULT_SLOT = "12:30";

const MENU = {
  id: "m-chicken-salad",
  name: "닭가슴살 샐러드",
  merchant: "B카페 · 강남점",
  price: 9800,
  tags: ["단백질 32g", "샐러드", "420 kcal"],
  walkingMinutes: 3,
} as const;

function won(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export default function OrderMenuPage() {
  const t = useT();
  const router = useRouter();
  const [slot, setSlot] = useState<string | null>(DEFAULT_SLOT);
  const [favorite, setFavorite] = useState(false);

  const canSubmit = slot !== null;

  function handleSubmit() {
    if (!canSubmit) return;
    const params = new URLSearchParams({
      menu: MENU.id,
      slot: slot!,
    });
    router.push(`/user/order/checkout?${params.toString()}`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32">
      <PaymentHeader
        title={t("user.lunch_payment.menu.header")}
        stepPill={t("user.lunch_payment.menu.step")}
        backHref="/user/home"
      />

      <main className="flex-1 px-5 pt-3 space-y-4">
        <LocationBar
          label={t("user.lunch_payment.menu.location_label")}
          value="강남 직장 (테헤란로 152)"
          changeLabel={t("user.lunch_payment.menu.location_change")}
        />

        <RyanBox
          variant="reason"
          heading={t("user.lunch_payment.menu.ryan_reason_heading")}
          body={t("user.lunch_payment.menu.ryan_reason_body")}
        />

        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
            <Utensils size={56} strokeWidth={1.25} aria-hidden />
          </div>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-gray-900">
                  {MENU.name}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">{MENU.merchant}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {MENU.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[11px] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFavorite((v) => !v)}
                aria-pressed={favorite}
                aria-label="찜"
                className="w-10 h-10 shrink-0 flex items-center justify-center text-gray-400"
              >
                <Heart
                  size={22}
                  strokeWidth={1.5}
                  className={favorite ? "fill-gray-900 text-gray-900" : ""}
                  aria-hidden
                />
              </button>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">
              {won(MENU.price)}
            </p>
          </div>
        </div>

        <Section title={t("user.lunch_payment.menu.composition_label")}>
          <p className="text-sm text-gray-700 leading-relaxed">
            {t("user.lunch_payment.menu.composition_body")}
          </p>
        </Section>

        <Section title={t("user.lunch_payment.menu.merchant_label")}>
          <ul className="space-y-2 text-sm">
            <MerchantRow
              Icon={MapPin}
              text="강남구 테헤란로 145, B타워 1F"
            />
            <MerchantRow
              Icon={Footprints}
              text={t("user.lunch_payment.menu.merchant_walking", {
                min: MENU.walkingMinutes,
              })}
              meta={t("user.lunch_payment.menu.merchant_walking_meta")}
            />
            <MerchantRow
              Icon={Clock}
              text={t("user.lunch_payment.menu.merchant_hours")}
            />
            <MerchantRow
              Icon={Users}
              text={t("user.lunch_payment.menu.merchant_busy")}
            />
          </ul>
        </Section>

        <Section title={t("user.lunch_payment.menu.slot_section_label")}>
          <p className="text-xs text-gray-500 mb-3">
            {t("user.lunch_payment.menu.slot_section_hint")}
          </p>
          <div role="radiogroup" className="grid grid-cols-4 gap-2">
            {SLOTS.map((s) => {
              const selected = slot === s.time;
              const disabled = !s.available;
              return (
                <button
                  key={s.time}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-disabled={disabled}
                  disabled={disabled}
                  onClick={() => setSlot(s.time)}
                  className={`h-14 rounded-xl border-2 flex flex-col items-center justify-center transition ${
                    disabled
                      ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                      : selected
                        ? "border-signup-accent bg-signup-accent text-white"
                        : "border-gray-200 bg-white text-gray-900 hover:border-gray-400"
                  }`}
                >
                  <span className="text-sm font-semibold">{s.time}</span>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      disabled
                        ? ""
                        : selected
                          ? "text-white/80"
                          : "text-gray-500"
                    }`}
                  >
                    {disabled
                      ? t("user.lunch_payment.menu.slot_closed")
                      : `${s.remaining}자리`}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        <Section title={t("user.lunch_payment.menu.summary_label")}>
          <ul className="space-y-1.5 text-sm">
            <SummaryRow
              label={t("user.lunch_payment.menu.summary_menu")}
              value={won(MENU.price)}
            />
            <SummaryRow
              label={t("user.lunch_payment.menu.summary_fee")}
              value={t("user.lunch_payment.menu.summary_fee_free")}
            />
            <div className="my-2 h-px bg-gray-200" />
            <SummaryRow
              label={t("user.lunch_payment.menu.summary_total")}
              value={won(MENU.price)}
              strong
            />
          </ul>
        </Section>
      </main>

      <BottomCTA>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold text-base transition"
        >
          {canSubmit
            ? t("user.lunch_payment.menu.cta")
            : t("user.lunch_payment.menu.cta_disabled")}
        </button>
        <p className="mt-2 text-center text-[11px] text-gray-500">
          {t("user.lunch_payment.menu.cta_next_step")}
        </p>
      </BottomCTA>
    </div>
  );
}

function LocationBar({
  label,
  value,
  changeLabel,
}: {
  label: string;
  value: string;
  changeLabel: string;
}) {
  return (
    <button
      type="button"
      className="w-full text-left rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center gap-3"
    >
      <MapPin size={18} strokeWidth={1.75} className="text-gray-500" aria-hidden />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-gray-900 truncate">{value}</p>
      </div>
      <span className="text-xs text-gray-500 font-semibold">{changeLabel}</span>
    </button>
  );
}

function MerchantRow({
  Icon,
  text,
  meta,
}: {
  Icon: typeof MapPin;
  text: string;
  meta?: string;
}) {
  return (
    <li className="flex items-center gap-2.5">
      <Icon
        size={16}
        strokeWidth={1.5}
        className="text-gray-500 shrink-0"
        aria-hidden
      />
      <span className="text-gray-900">{text}</span>
      {meta && <span className="text-xs text-gray-500 ml-1">{meta}</span>}
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
      <span className={`${strong ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
        {label}
      </span>
      <span className={`${strong ? "text-gray-900 font-bold" : "text-gray-900"}`}>
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
