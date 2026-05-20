"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, CalendarClock, MapPin } from "lucide-react";
import { findNotification } from "@/lib/notifications/mock";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

export default function NotificationResultPage() {
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

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href={`/user/notifications/${n.id}`}
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          {t("user.notification.result.title")}
        </h1>
        <span className="w-10 h-10" />
      </header>

      <main className="flex-1 px-5 pt-3 space-y-5">
        <section className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
            {t("user.notification.result.summary_label")}
          </h2>
          <p className="text-base font-semibold text-gray-900 leading-snug">
            {n.title}
          </p>
          <p className="mt-1 text-sm text-gray-600 leading-relaxed">
            {n.body}
          </p>
        </section>

        {n.target?.type === "reservation" && (
          <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm">
            <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-1">
              관련 예약
            </h2>
            <Row Icon={CalendarClock} label="시간" value="오늘 12:30" strong />
            <Row Icon={MapPin} label="장소" value="B카페 · 강남점 (도보 3분)" />
            <Link
              href={`/user/reservation/${n.target.id}?status=confirmed`}
              className="mt-2 inline-block text-xs font-semibold text-signup-accent underline"
            >
              예약 상세 보기 →
            </Link>
          </section>
        )}

        {n.target?.type === "plan" && (
          <section className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-2">
              {t("user.notification.result.plan_label")}
            </h2>
            <p className="text-sm font-semibold text-gray-900">
              점심 메뉴 추천 (평일 매일 12:00)
            </p>
            <p className="mt-1 text-xs text-gray-500">
              단백질 부족 페르소나 기반 자동 추천
            </p>
            <Link
              href={`/user/schedule`}
              className="mt-3 inline-block text-xs font-semibold text-signup-accent underline"
            >
              일정 규칙 관리 →
            </Link>
          </section>
        )}

        <RyanBox
          variant="reason"
          heading="이 알림은 왜 도착했나요?"
          body={
            n.kind === "event"
              ? "결제 확정 이후 식당이 자리·메뉴를 준비했고, 도보 거리·예약 시간을 고려해 5분 전 미리 안내드렸어요."
              : n.kind === "schedule"
              ? "사용자가 등록한 일정 규칙이 다음 트리거 시점에 발화돼요. 규칙은 일정 관리에서 조정할 수 있어요."
              : "앱 자체 알림이라 사용자 페르소나와 무관해요. 설정에서 시스템 알림 채널을 조정할 수 있어요."
          }
        />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto space-y-2">
          {n.target?.type === "reservation" && (
            <button
              type="button"
              onClick={() =>
                router.push(`/user/reservation/${n.target!.id}?status=confirmed`)
              }
              className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-base transition"
            >
              {t("user.notification.result.cta_action")}
            </button>
          )}
          <button
            type="button"
            onClick={() => router.push("/user/notifications/chat")}
            className="w-full h-12 text-sm text-gray-700 font-semibold border border-gray-300 rounded-xl"
          >
            {t("user.notification.result.cta_chat")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  Icon,
  label,
  value,
  strong,
}: {
  Icon: typeof CalendarClock;
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} strokeWidth={1.5} className="text-gray-500" aria-hidden />
      <span className="text-gray-500">{label}</span>
      <span
        className={`ml-auto ${strong ? "font-bold text-gray-900" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
