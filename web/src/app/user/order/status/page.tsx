"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, Check, AlertCircle } from "lucide-react";
import PaymentHeader from "@/components/payment/PaymentHeader";
import RyanBox from "@/components/payment/RyanBox";
import { useT } from "@/lib/i18n";

type Phase = "waiting" | "confirmed" | "rejected";

const MOCK = {
  merchant: "B카페 · 강남점",
  menu: "닭가슴살 샐러드",
  time: "오늘 12:30",
  amount: 9800,
  reservationId: "LO-26052012-742",
} as const;

function won(n: number) {
  return `₩${n.toLocaleString("ko-KR")}`;
}

export default function OrderStatusPage() {
  const t = useT();
  const router = useRouter();
  const search = useSearchParams();
  const initialPhase = (search.get("phase") as Phase) || "waiting";

  const [phase, setPhase] = useState<Phase>(initialPhase);

  // mock 시연: waiting → 3초 후 confirmed 자동 전환
  useEffect(() => {
    if (phase !== "waiting") return;
    const id = setTimeout(() => setPhase("confirmed"), 3000);
    return () => clearTimeout(id);
  }, [phase]);

  const config = phaseConfig(phase, t);

  function handleCta() {
    if (phase === "confirmed") {
      router.push(`/user/reservation/${MOCK.reservationId}`);
    } else if (phase === "rejected") {
      router.push("/user/order");
    } else {
      router.push("/user/home");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <PaymentHeader
        left={phase === "waiting" ? "none" : "close"}
        backHref="/user/home"
        title={t("user.lunch_payment.status_screen.header")}
        statusPill={{ label: config.chip, tone: config.tone }}
      />

      <main className="flex-1 px-5 pt-6 space-y-5">
        <StateHero
          Icon={config.Icon}
          heading={config.heading}
          subhead={config.subhead}
          animate={phase === "waiting"}
          alert={phase === "rejected"}
        />

        <section className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm">
          <Row label="식당" value={MOCK.merchant} />
          <Row label="메뉴" value={MOCK.menu} />
          <Row label="시간" value={MOCK.time} strong />
          <div className="my-2 h-px bg-gray-200" />
          <Row label="결제 금액" value={won(MOCK.amount)} />
          <Row label="예약번호" value={MOCK.reservationId} mono />
        </section>

        {phase === "waiting" && (
          <RyanBox
            variant="wait"
            heading="식당 응답을 기다리는 중이에요"
            body="보통 1~2분 내 답이 와요. 결제는 완료됐고 거절되면 전액 자동 환불됩니다."
          />
        )}
        {phase === "rejected" && (
          <RyanBox
            variant="alternative"
            heading="다른 메뉴를 골라드릴까요?"
            body="비슷한 가격대 · 도보 5분 내 식당으로 두세 개 추천 준비해뒀어요."
          />
        )}
        {phase === "confirmed" && (
          <RyanBox
            variant="promise"
            heading="5분 전에 길찾기를 띄워드릴게요"
            body="혼잡도 변동이 생기면 미리 알려드릴게요."
          />
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={handleCta}
            disabled={!config.ctaLabel}
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold text-base transition"
          >
            {config.ctaLabel ?? "기다리는 중"}
          </button>
        </div>
      </div>
    </div>
  );
}

function phaseConfig(phase: Phase, t: (k: string, p?: Record<string, string | number>) => string) {
  if (phase === "confirmed") {
    return {
      Icon: Check,
      heading: t("user.lunch_payment.status_screen.confirmed_heading"),
      subhead: t("user.lunch_payment.status_screen.confirmed_subhead", {
        merchant: MOCK.merchant,
        time: MOCK.time,
      }),
      chip: t("user.lunch_payment.status_screen.confirmed_chip"),
      tone: "success" as const,
      ctaLabel: t("user.lunch_payment.cta.detail"),
    };
  }
  if (phase === "rejected") {
    return {
      Icon: AlertCircle,
      heading: t("user.lunch_payment.status_screen.rejected_heading"),
      subhead: t("user.lunch_payment.status_screen.rejected_subhead"),
      chip: t("user.lunch_payment.status_screen.rejected_chip"),
      tone: "danger" as const,
      ctaLabel: t("user.lunch_payment.cta.alternatives"),
    };
  }
  return {
    Icon: Clock,
    heading: t("user.lunch_payment.status_screen.waiting_heading"),
    subhead: t("user.lunch_payment.status_screen.waiting_subhead"),
    chip: t("user.lunch_payment.status_screen.wait_chip"),
    tone: "neutral" as const,
    ctaLabel: null,
  };
}

function StateHero({
  Icon,
  heading,
  subhead,
  animate,
  alert,
}: {
  Icon: typeof Clock;
  heading: string;
  subhead: string;
  animate?: boolean;
  alert?: boolean;
}) {
  return (
    <section
      role={alert ? "alert" : "status"}
      aria-live={alert ? "assertive" : "polite"}
      className="text-center pt-8 pb-4"
    >
      <div
        className={`w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 ${
          animate ? "animate-pulse" : ""
        }`}
      >
        <Icon size={36} strokeWidth={1.5} aria-hidden />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-gray-900">{heading}</h1>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed px-2">
        {subhead}
      </p>
    </section>
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
