"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Plus, CalendarClock, Settings } from "lucide-react";
import { SCHEDULE_RULES, type ScheduleRule } from "@/lib/notifications/mock";
import { useT } from "@/lib/i18n";

export default function ScheduleTimelinePage() {
  const t = useT();
  const [rules, setRules] = useState<ScheduleRule[]>([...SCHEDULE_RULES]);

  function toggle(id: string) {
    setRules((rs) =>
      rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)),
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href="/user/notifications"
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          {t("user.notification.timeline.title")}
        </h1>
        <Link
          href="/user/notifications/settings"
          className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-700"
          aria-label={t("user.notification.settings.title")}
        >
          <Settings size={20} strokeWidth={1.75} />
        </Link>
      </header>

      <main className="flex-1 px-5 pt-3 space-y-5">
        <section>
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              {t("user.notification.timeline.this_week")}
            </h2>
            <span className="text-[10px] text-gray-500">
              {rules.filter((r) => r.enabled).length}건 활성
            </span>
          </div>
          <ul className="space-y-2">
            {rules.map((r) => (
              <RuleItem key={r.id} rule={r} onToggle={() => toggle(r.id)} />
            ))}
          </ul>
        </section>
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto">
          <Link
            href="/user/schedule/new"
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-base flex items-center justify-center gap-2 transition"
          >
            <Plus size={18} strokeWidth={2} aria-hidden />
            {t("user.notification.timeline.add_rule")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function RuleItem({
  rule,
  onToggle,
}: {
  rule: ScheduleRule;
  onToggle: () => void;
}) {
  const t = useT();
  return (
    <li
      className={`rounded-2xl border p-4 transition ${
        rule.enabled
          ? "border-gray-300 bg-white"
          : "border-gray-200 bg-gray-50 opacity-80"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700">
          <CalendarClock size={18} strokeWidth={1.5} aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">{rule.title}</p>
            <span className="text-[10px] text-gray-500">
              {rule.enabled
                ? t("user.notification.timeline.active_label")
                : t("user.notification.timeline.paused_label")}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {rule.patternLabel} · {rule.time}
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            {t("user.notification.timeline.rule_next", { time: rule.nextTrigger })}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={rule.enabled}
              onClick={onToggle}
              className={`w-10 h-6 rounded-full relative transition ${
                rule.enabled ? "bg-signup-accent" : "bg-gray-300"
              }`}
            >
              <span
                aria-hidden
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
                  rule.enabled ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
            <Link
              href={`/user/schedule/new?rule=${rule.id}`}
              className="text-xs text-gray-700 font-semibold ml-1 underline"
            >
              편집
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}
