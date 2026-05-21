"use client";

import Link from "next/link";
import { Utensils, Activity, MapPin, CalendarClock } from "lucide-react";
import { useT } from "@/lib/i18n";
import type { MenuMock } from "@/lib/recommendation/menus";

function won(n: number) {
  return `${n.toLocaleString("ko-KR")}원`;
}

export default function HomeActive({
  name,
  menu,
  personaChips,
  insight,
}: {
  name: string;
  menu: MenuMock;
  personaChips: string[];
  insight: string;
}) {
  const t = useT();

  return (
    <div className="pt-2 pb-4 space-y-4">
      <section>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          {t("user.home.greeting.lunch_active", { name })}
        </h1>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {personaChips.map((c) => (
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
          <h2 className="text-lg font-bold text-gray-900">
            {menu.name} 어떠세요?
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            {menu.merchant.split(" · ")[0]} · 도보 {menu.walkMin}분
          </p>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-xl font-bold text-gray-900">
              {won(menu.price)}
            </span>
            <span className="text-xs text-gray-500">
              단백질 {menu.proteinG}g · {menu.kcal} kcal
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Link
              href={`/user/order?menu=${menu.id}&source=home`}
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
          value={menu.merchant.split(" · ")[0]}
          meta={`도보 ${menu.walkMin}분`}
        />
        <DetailCard
          Icon={Activity}
          label={t("user.home.detail_label.nutrition")}
          value={`단백질 ${menu.proteinG}g`}
          meta={`${menu.kcal} kcal`}
        />
        <DetailCard
          Icon={MapPin}
          label={t("user.home.detail_label.nearby")}
          value="5곳"
          meta={`도보 ${menu.walkMin + 2}분 내`}
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
          {insight}
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
