"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import {
  Navigation,
  Phone,
  CalendarClock,
  XCircle,
  Check,
  Circle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import PaymentHeader from "@/components/payment/PaymentHeader";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

type Status = "waiting" | "confirmed" | "completed" | "rejected" | "cancelled";

const MOCK = {
  merchant: "B카페 · 강남점",
  menu: "닭가슴살 샐러드",
  time: "오늘 12:30",
  amount: 9800,
  address: "강남구 테헤란로 145, B타워 1F",
  walking: "도보 3분",
} as const;

function won(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export default function ReservationDetailPage() {
  const t = useT();
  const router = useRouter();
  const search = useSearchParams();
  const params = useParams<{ id: string }>();
  const reservationId = params.id;
  const status: Status = (search.get("status") as Status) || "confirmed";

  const actions = actionsFor(status);

  function handleCta() {
    if (status === "rejected" || status === "cancelled") {
      router.push("/user/order");
    } else if (status === "confirmed") {
      // 길찾기 mock
      alert("외부 지도 앱 진입 (mock)");
    } else if (status === "completed") {
      router.push("/user/order");
    } else {
      router.back();
    }
  }

  const statusPill = pillFor(status, t);
  const hero = heroFor(status, t);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <PaymentHeader
        left="back"
        backHref="/user/home"
        title={t("user.lunch_payment.reservation.header")}
        statusPill={statusPill}
      />

      <main className="flex-1 px-5 pt-5 space-y-5">
        <section
          role="status"
          aria-live="polite"
          className="text-center pt-2 pb-2"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700">
            <hero.Icon size={32} strokeWidth={1.5} aria-hidden />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {hero.heading}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">{hero.subhead}</p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm">
          <Row
            label={t("user.lunch_payment.reservation.number_label")}
            value={reservationId}
            mono
          />
          <Row
            label={t("user.lunch_payment.reservation.time_label")}
            value={MOCK.time}
            strong
          />
          <Row
            label={t("user.lunch_payment.reservation.merchant_label")}
            value={MOCK.merchant}
          />
          <Row
            label={t("user.lunch_payment.reservation.menu_label")}
            value={`${MOCK.menu} · ${won(MOCK.amount)}`}
          />
          <div className="my-2 h-px bg-gray-200" />
          <Row label="주소" value={`${MOCK.address} (${MOCK.walking})`} />
        </section>

        {(status === "confirmed" || status === "waiting") && (
          <section className="grid grid-cols-4 gap-2">
            <ActionTile
              Icon={Navigation}
              label={t("user.lunch_payment.reservation.directions")}
              disabled={!actions.directions}
            />
            <ActionTile
              Icon={Phone}
              label={t("user.lunch_payment.reservation.call")}
              disabled={!actions.call}
            />
            <ActionTile
              Icon={CalendarClock}
              label={t("user.lunch_payment.reservation.reschedule")}
              disabled={!actions.reschedule}
            />
            <ActionTile
              Icon={XCircle}
              label={t("user.lunch_payment.reservation.cancel")}
              disabled={!actions.cancel}
            />
          </section>
        )}

        {(status === "confirmed" || status === "waiting") && (
          <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900">
              {t("user.lunch_payment.reservation.refund_box_heading")}
            </p>
            <p className="mt-1 text-xs text-gray-700">
              {t("user.lunch_payment.reservation.refund_full")}
            </p>
            <ul className="mt-2 space-y-1 text-[11px] text-gray-500">
              <li>· {t("user.lunch_payment.refund.rule0")}</li>
              <li>· {t("user.lunch_payment.refund.rule1")}</li>
              <li>· {t("user.lunch_payment.refund.rule2")}</li>
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-[11px] font-semibold tracking-wider text-gray-500 mb-3 uppercase">
            {t("user.lunch_payment.reservation.activity_label")}
          </h2>
          <ol role="list" className="relative pl-5 space-y-3">
            <span
              aria-hidden
              className="absolute left-[5px] top-1 bottom-1 w-px bg-gray-200"
            />
            <ActivityItem done time="12:24" label="결제 완료" detail={won(MOCK.amount)} />
            <ActivityItem
              done={status === "confirmed" || status === "completed"}
              time="12:26"
              label="식당 수락"
              detail={status === "rejected" ? "거절" : undefined}
            />
            <ActivityItem
              done={status === "completed"}
              time="12:25"
              label="5분 전 안내"
              detail="예정"
            />
            <ActivityItem
              done={status === "completed"}
              time="12:30"
              label="예약 시간"
              detail={MOCK.merchant}
            />
          </ol>
        </section>

        {(status === "rejected" || status === "cancelled") && (
          <RyanBox
            variant="alternative"
            heading="다른 메뉴를 골라드릴까요?"
            body="비슷한 가격대 · 도보 5분 내 식당으로 두세 개 추천 준비해뒀어요."
          />
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={handleCta}
            disabled={!hero.ctaLabel}
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold text-base transition"
          >
            {hero.ctaLabel ?? "닫기"}
          </button>
        </div>
      </div>
    </div>
  );
}

function pillFor(
  status: Status,
  t: (k: string) => string,
): { label: string; tone: "neutral" | "success" | "warning" | "danger" } {
  switch (status) {
    case "confirmed":
      return { label: t("user.lunch_payment.status.confirmed"), tone: "success" };
    case "completed":
      return { label: t("user.lunch_payment.status.completed"), tone: "neutral" };
    case "rejected":
      return { label: t("user.lunch_payment.status.rejected"), tone: "danger" };
    case "cancelled":
      return { label: t("user.lunch_payment.status.cancelled"), tone: "warning" };
    default:
      return { label: t("user.lunch_payment.status.waiting"), tone: "neutral" };
  }
}

function heroFor(
  status: Status,
  t: (k: string, p?: Record<string, string | number>) => string,
): { Icon: typeof Check; heading: string; subhead: string; ctaLabel: string | null } {
  switch (status) {
    case "confirmed":
      return {
        Icon: Check,
        heading: "예약이 확정됐어요",
        subhead: `${MOCK.merchant}에서 ${MOCK.time}에 만나요.`,
        ctaLabel: t("user.lunch_payment.cta.directions"),
      };
    case "completed":
      return {
        Icon: CheckCircle2,
        heading: "식사 완료",
        subhead: "다음 점심도 같은 곳으로 가시겠어요?",
        ctaLabel: t("user.lunch_payment.cta.again"),
      };
    case "rejected":
      return {
        Icon: XCircle,
        heading: "이 자리는 못 잡았어요",
        subhead: "결제는 전액 자동 환불됩니다.",
        ctaLabel: t("user.lunch_payment.cta.alternatives"),
      };
    case "cancelled":
      return {
        Icon: XCircle,
        heading: "예약을 취소했어요",
        subhead: "환불 정책에 따라 환불이 진행돼요.",
        ctaLabel: t("user.lunch_payment.cta.alternatives"),
      };
    default:
      return {
        Icon: Clock,
        heading: "수락 대기 중",
        subhead: "보통 1~2분 내 답이 와요.",
        ctaLabel: null,
      };
  }
}

function actionsFor(status: Status) {
  if (status === "confirmed") {
    return { directions: true, call: true, reschedule: true, cancel: true };
  }
  if (status === "waiting") {
    return { directions: false, call: false, reschedule: false, cancel: true };
  }
  return { directions: false, call: false, reschedule: false, cancel: false };
}

function ActionTile({
  Icon,
  label,
  disabled,
}: {
  Icon: typeof Navigation;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition ${
        disabled
          ? "border-gray-200 bg-gray-50 text-gray-300"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
      }`}
    >
      <Icon size={20} strokeWidth={1.5} aria-hidden />
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}

function ActivityItem({
  done,
  time,
  label,
  detail,
}: {
  done?: boolean;
  time: string;
  label: string;
  detail?: string;
}) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className={`absolute -left-5 top-1 w-2.5 h-2.5 rounded-full ${
          done ? "bg-gray-900" : "border border-dashed border-gray-400 bg-white"
        }`}
      />
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-gray-500 font-mono w-12">{time}</span>
        <span className={`text-sm ${done ? "text-gray-900" : "text-gray-500"}`}>
          {label}
        </span>
      </div>
      {detail && <p className="text-xs text-gray-500 ml-14">{detail}</p>}
    </li>
  );
}

function Row({
  label,
  value,
  strong,
  mono,
}: {
  label: string;
  value: string;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span
        className={`${strong ? "font-bold text-gray-900" : "text-gray-900"} ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
