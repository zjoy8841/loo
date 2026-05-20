"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, Bell, CalendarClock, Info } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function NotificationSettingsPage() {
  const t = useT();
  const [event, setEvent] = useState({ push: true, inapp: true });
  const [schedule, setSchedule] = useState({ push: true, inapp: true });
  const [system, setSystem] = useState({ push: false, inapp: true });
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href="/user/notifications"
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          {t("user.notification.settings.title")}
        </h1>
        <span className="w-10 h-10" />
      </header>

      <main className="flex-1 px-5 pt-3 pb-12 space-y-5">
        <KindRow
          Icon={Bell}
          label={t("user.notification.settings.kind_event")}
          channels={event}
          onChange={setEvent}
          pushLabel={t("user.notification.settings.channel_push")}
          inappLabel={t("user.notification.settings.channel_inapp")}
        />
        <KindRow
          Icon={CalendarClock}
          label={t("user.notification.settings.kind_schedule")}
          channels={schedule}
          onChange={setSchedule}
          pushLabel={t("user.notification.settings.channel_push")}
          inappLabel={t("user.notification.settings.channel_inapp")}
        />
        <KindRow
          Icon={Info}
          label={t("user.notification.settings.kind_system")}
          channels={system}
          onChange={setSystem}
          pushLabel={t("user.notification.settings.channel_push")}
          inappLabel={t("user.notification.settings.channel_inapp")}
        />

        <section className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-sm font-semibold text-gray-900">
            {t("user.notification.settings.quiet_hours")}
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            {t("user.notification.settings.quiet_hours_hint")}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <input
              type="time"
              value={quietStart}
              onChange={(e) => setQuietStart(e.target.value)}
              className="flex-1 h-10 border border-gray-200 rounded-xl px-3 text-sm focus:outline-none focus:border-signup-accent"
            />
            <span className="text-sm text-gray-400">~</span>
            <input
              type="time"
              value={quietEnd}
              onChange={(e) => setQuietEnd(e.target.value)}
              className="flex-1 h-10 border border-gray-200 rounded-xl px-3 text-sm focus:outline-none focus:border-signup-accent"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function KindRow({
  Icon,
  label,
  channels,
  onChange,
  pushLabel,
  inappLabel,
}: {
  Icon: typeof Bell;
  label: string;
  channels: { push: boolean; inapp: boolean };
  onChange: (c: { push: boolean; inapp: boolean }) => void;
  pushLabel: string;
  inappLabel: string;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-gray-700">
          <Icon size={16} strokeWidth={1.5} aria-hidden />
        </div>
        <p className="text-sm font-semibold text-gray-900">{label}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Toggle
          label={pushLabel}
          checked={channels.push}
          onChange={(v) => onChange({ ...channels, push: v })}
        />
        <Toggle
          label={inappLabel}
          checked={channels.inapp}
          onChange={(v) => onChange({ ...channels, inapp: v })}
        />
      </div>
    </section>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="h-11 px-3 rounded-xl border border-gray-200 flex items-center justify-between gap-2"
    >
      <span className="text-xs text-gray-700">{label}</span>
      <span
        className={`w-9 h-5 rounded-full relative transition shrink-0 ${
          checked ? "bg-signup-accent" : "bg-gray-300"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
