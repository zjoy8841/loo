"use client";

import RyanMascot from "@/components/RyanMascot";
import { useT } from "@/lib/i18n";

const QUICK_KEYS = ["lunch", "schedule", "weather", "reservations", "walk", "water"] as const;
const PERSONA_CHIPS = ["콜레스테롤 관리", "단백질 부족"] as const;

export default function HomeIdle({
  name,
  timeLabel,
  onQuickAction,
}: {
  name: string;
  timeLabel: string;
  onQuickAction: (key: string) => void;
}) {
  const t = useT();

  return (
    <div className="flex-1 flex flex-col items-center text-center pt-8">
      <p className="text-xs text-gray-400 tracking-wider uppercase mb-2">
        {timeLabel}
      </p>
      <h1 className="text-2xl font-bold text-gray-900">
        {t("user.home.greeting.lunch_idle", { name })}
      </h1>
      <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">
        {t("user.home.subhead_idle")}
      </p>

      <div className="mt-6">
        <RyanMascot size={120} />
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {PERSONA_CHIPS.map((c) => (
          <span
            key={c}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-10 pb-2 w-full overflow-x-auto scrollbar-hide -mx-5 px-5">
        <ul className="flex gap-2 w-max">
          {QUICK_KEYS.map((k) => (
            <li key={k}>
              <button
                type="button"
                onClick={() => onQuickAction(k)}
                className="h-9 px-4 rounded-full border border-gray-300 text-xs text-gray-700 hover:bg-gray-50 transition"
              >
                {t(`user.home.quick.${k}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
