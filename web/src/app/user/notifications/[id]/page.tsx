"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, X, Bell, CalendarClock, Info } from "lucide-react";
import { findNotification, type NotificationKind } from "@/lib/notifications/mock";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

const KIND_ICON: Record<NotificationKind, typeof Bell> = {
  event: Bell,
  schedule: CalendarClock,
  system: Info,
};

export default function NotificationArrivalPage() {
  const t = useT();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const n = findNotification(params.id);

  if (!n) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        알림을 찾을 수 없어요
      </div>
    );
  }

  const Icon = KIND_ICON[n.kind];

  function handlePrimary() {
    if (n!.target?.type === "reservation") {
      router.push(`/user/reservation/${n!.target.id}?status=confirmed`);
    } else {
      router.push(`/user/notifications/${n!.id}/result`);
    }
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
          {t("user.notification.arrival.title")}
        </h1>
        <button
          type="button"
          onClick={() => router.push("/user/home")}
          className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-700"
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1.75} />
        </button>
      </header>

      <main className="flex-1 px-5 pt-6 space-y-5">
        <section
          role="status"
          aria-live="polite"
          className="text-center pt-2 pb-2"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
            <Icon size={32} strokeWidth={1.5} aria-hidden />
          </div>
          <p className="mt-4 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            {t(`user.notification.kind.${n.kind}`)} · {n.time}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900 leading-snug px-2">
            {n.title}
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed px-2">
            {n.body}
          </p>
        </section>

        <RyanBox
          variant="promise"
          heading={t("user.notification.arrival.from_ryan")}
          body="필요하시면 변경하거나 더 자세히 물어보셔도 돼요. 결정 압박은 X."
        />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto space-y-2">
          <button
            type="button"
            onClick={handlePrimary}
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-base transition"
          >
            {t("user.notification.arrival.cta_handle")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/user/notifications/chat")}
            className="w-full h-12 text-sm text-gray-700 font-semibold border border-gray-300 rounded-xl"
          >
            {t("user.notification.arrival.cta_chat")}
          </button>
        </div>
      </div>
    </div>
  );
}
