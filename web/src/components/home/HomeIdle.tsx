"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import RyanMascot from "@/components/RyanMascot";
import { useT } from "@/lib/i18n";
import type { MenuMock } from "@/lib/recommendation/menus";

const QUICK_KEYS = ["lunch", "schedule", "weather", "reservations", "walk", "water"] as const;

const NOTIF_DELAY_MS = 1500;

export default function HomeIdle({
  name,
  timeLabel,
  personaChips,
  incomingMenu,
  onAccept,
  onQuickAction,
}: {
  name: string;
  timeLabel: string;
  personaChips: string[];
  incomingMenu: MenuMock | null;
  onAccept: () => void;
  onQuickAction: () => void;
}) {
  const t = useT();
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    if (!incomingMenu) return;
    const id = setTimeout(() => setArrived(true), NOTIF_DELAY_MS);
    return () => clearTimeout(id);
  }, [incomingMenu]);

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

      {incomingMenu && arrived && (
        <button
          type="button"
          onClick={onAccept}
          aria-label={t("user.home.notif.aria")}
          className="animate-notif-slidein mt-6 w-full max-w-sm flex items-center gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition text-left"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
            <RyanMascot size={32} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-gray-500">
              {t("user.home.notif.from")}
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {t("user.home.notif.title", { name, menu: incomingMenu.name })}
            </p>
          </div>
          <ChevronRight
            size={18}
            strokeWidth={2}
            className="text-gray-400 shrink-0"
            aria-hidden
          />
        </button>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {personaChips.map((c) => (
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
                onClick={() => onQuickAction()}
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
