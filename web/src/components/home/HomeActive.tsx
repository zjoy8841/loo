"use client";

import Link from "next/link";
import { Utensils, Activity, MapPin, CalendarClock } from "lucide-react";
import { useT } from "@/lib/i18n";

const PERSONA_CHIPS = ["콜레스테롤 관리", "단백질 부족"] as const;

const HERO_LUNCH = {
  title: "닭가슴살 샐러드 어떠세요?",
  merchant: "B카페 · 도보 3분",
  price: "9,800원",
  nutrition: "단백질 32g · 420 kcal",
} as const;

const DETAIL_LUNCH = {
  restaurant: { value: "B카페", meta: "4.7 ★ · 도보 3분" },
  nutrition: { value: "단백질 32g", meta: "420 kcal" },
  nearby: { value: "5곳", meta: "도보 3분 내" },
} as const;

const INSIGHT_LUNCH = "14:00 디자인 리뷰까지 1시간 37분";

export default function HomeActive({ name }: { name: string }) {
  const t = useT();

  return (
    <div className="pt-2 pb-4 space-y-4">
      <section>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {t("user.home.greeting.lunch_active", { name })}
        </h1>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PERSONA_CHIPS.map((c) => (
            <span
              key={c}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      <section
        aria-label="Hero decision card"
        className="rounded-2xl border border-gray-200 bg-white overflow-hidden"
      >
        <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400">
          <Utensils size={48} strokeWidth={1.25} aria-hidden />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900">{HERO_LUNCH.title}</h2>
          <p className="mt-1 text-xs text-gray-500">{HERO_LUNCH.merchant}</p>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-xl font-bold text-gray-900">
              {HERO_LUNCH.price}
            </span>
            <span className="text-xs text-gray-500">{HERO_LUNCH.nutrition}</span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href="/user/order?menu=m-chicken-salad&source=home"
              className="flex-1 h-12 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-sm flex items-center justify-center transition"
            >
              {t("user.home.cta.reserve_and_pay")}
            </Link>
            <button
              type="button"
              className="px-4 h-12 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm"
            >
              {t("user.home.cta.alternatives")}
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2">
        <DetailCard
          Icon={Utensils}
          label={t("user.home.detail_label.restaurant")}
          value={DETAIL_LUNCH.restaurant.value}
          meta={DETAIL_LUNCH.restaurant.meta}
        />
        <DetailCard
          Icon={Activity}
          label={t("user.home.detail_label.nutrition")}
          value={DETAIL_LUNCH.nutrition.value}
          meta={DETAIL_LUNCH.nutrition.meta}
        />
        <DetailCard
          Icon={MapPin}
          label={t("user.home.detail_label.nearby")}
          value={DETAIL_LUNCH.nearby.value}
          meta={DETAIL_LUNCH.nearby.meta}
        />
      </section>

      <section className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-xl px-3 py-2.5">
        <CalendarClock
          size={14}
          strokeWidth={1.75}
          aria-hidden
          className="text-gray-500 shrink-0"
        />
        <span>
          <span className="text-gray-400 mr-1.5">
            {t("user.home.insight_prefix")}
          </span>
          {INSIGHT_LUNCH}
        </span>
      </section>
    </div>
  );
}

function DetailCard({
  Icon,
  label,
  value,
  meta,
}: {
  Icon: typeof Utensils;
  label: string;
  value: string;
  meta: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-1.5 text-gray-400">
        <Icon size={14} strokeWidth={1.5} aria-hidden />
        <span className="text-[10px] font-semibold tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-1.5 text-sm font-semibold text-gray-900">{value}</p>
      <p className="text-[10px] text-gray-500 mt-0.5">{meta}</p>
    </div>
  );
}
