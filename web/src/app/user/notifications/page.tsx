"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  Info,
  ChevronLeft,
  Settings,
  CalendarDays,
} from "lucide-react";
import { NOTIFICATIONS, type NotificationKind } from "@/lib/notifications/mock";
import { useT } from "@/lib/i18n";

const FILTERS: { key: "all" | NotificationKind; label: string }[] = [
  { key: "all", label: "all" },
  { key: "event", label: "event" },
  { key: "schedule", label: "schedule" },
  { key: "system", label: "system" },
];

const KIND_ICON: Record<NotificationKind, typeof Bell> = {
  event: Bell,
  schedule: CalendarClock,
  system: Info,
};

export default function NotificationCenterPage() {
  const t = useT();
  const [filter, setFilter] = useState<"all" | NotificationKind>("all");

  const items =
    filter === "all"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.kind === filter);

  const unread = items.filter((n) => n.status === "unread");
  const rest = items.filter((n) => n.status !== "unread");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href="/user/home"
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          {t("user.notification.center.title")}
        </h1>
        <Link
          href="/user/notifications/settings"
          className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-700"
          aria-label={t("user.notification.settings.title")}
        >
          <Settings size={20} strokeWidth={1.75} />
        </Link>
      </header>

      <div className="px-5 pt-2 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`h-8 px-3 rounded-full border text-xs font-semibold whitespace-nowrap transition ${
                active
                  ? "bg-signup-accent text-white border-signup-accent"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {t(`user.notification.filter.${f.label}`)}
            </button>
          );
        })}
        <Link
          href="/user/schedule"
          className="ml-auto shrink-0 h-8 px-3 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 inline-flex items-center gap-1.5 hover:bg-gray-50"
        >
          <CalendarDays size={13} strokeWidth={1.75} aria-hidden />
          {t("user.notification.timeline.title")}
        </Link>
      </div>

      <main className="flex-1 px-5 pb-12">
        {items.length === 0 && (
          <p className="mt-12 text-sm text-gray-500 text-center">
            {t("user.notification.center.empty")}
          </p>
        )}

        {unread.length > 0 && (
          <section className="mt-2">
            <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
              {t("user.notification.center.unread_section")}
            </h2>
            <ul className="space-y-2">
              {unread.map((n) => (
                <NotificationItem key={n.id} {...n} />
              ))}
            </ul>
          </section>
        )}

        {rest.length > 0 && (
          <section className="mt-5">
            <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
              {t("user.notification.center.recent_section")}
            </h2>
            <ul className="space-y-2">
              {rest.map((n) => (
                <NotificationItem key={n.id} {...n} />
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-center text-[11px] text-gray-400">
          {t("user.notification.center.retention_note")}
        </p>
      </main>
    </div>
  );
}

function NotificationItem({
  id,
  kind,
  title,
  body,
  time,
  status,
}: {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  time: string;
  status: "unread" | "read" | "actioned";
}) {
  const Icon = KIND_ICON[kind];
  const unread = status === "unread";
  return (
    <li>
      <Link
        href={`/user/notifications/${id}`}
        className={`block rounded-2xl border p-4 transition ${
          unread
            ? "border-gray-300 bg-white"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <article role="article" className="flex items-start gap-3">
          <div className="w-10 h-10 shrink-0 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-700">
            <Icon size={18} strokeWidth={1.5} aria-hidden />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                {kind}
              </span>
              {unread && (
                <span
                  aria-label="미확인"
                  className="w-1.5 h-1.5 rounded-full bg-gray-900"
                />
              )}
              {status === "actioned" && (
                <CheckCircle2
                  size={12}
                  strokeWidth={2}
                  className="text-gray-500"
                  aria-label="처리됨"
                />
              )}
              <span className="ml-auto text-[10px] text-gray-500">{time}</span>
            </div>
            <p
              className={`mt-1 text-sm leading-tight ${
                unread ? "font-semibold text-gray-900" : "text-gray-900"
              }`}
            >
              {title}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
              {body}
            </p>
          </div>
        </article>
      </Link>
    </li>
  );
}
