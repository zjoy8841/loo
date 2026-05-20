"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, CalendarClock, Bell, Sparkles, Edit3 } from "lucide-react";
import RyanBox from "@/components/payment/RyanBox";

const MOCK_PLAN = {
  id: "p-001",
  title: "매주 화요일 12시 점심 추천",
  description:
    "단백질 부족 페르소나 기반으로 매주 화요일 정오에 단백질 메뉴를 자동 추천합니다.",
  pattern: "매주 화요일",
  time: "12:00",
  steps: [
    { time: "11:45", label: "후보 메뉴 3개 조립", detail: "근처 식당·날씨·페르소나 기반" },
    { time: "11:55", label: "라이언이 메인 카드로 띄움", detail: "예약·결제 CTA 포함" },
    { time: "12:30", label: "예약 시간 진입", detail: "선택한 시간 슬롯에 자동 5분 전 알림" },
  ],
};

export default function PlanFullViewPage() {
  const params = useParams<{ id: string }>();
  const plan = MOCK_PLAN; // v0.1 단일 mock — 추후 id별 fetch

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
          플랜 풀뷰
        </h1>
        <span className="w-10 h-10" />
      </header>

      <main className="flex-1 px-5 pt-3 space-y-5">
        <section className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
            <Sparkles size={12} strokeWidth={1.75} aria-hidden />
            대화로 만든 플랜
          </div>
          <h2 className="mt-2 text-xl font-bold text-gray-900 leading-snug">
            {plan.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            {plan.description}
          </p>
          <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <CalendarClock
                size={13}
                strokeWidth={1.75}
                className="text-gray-500"
                aria-hidden
              />
              {plan.pattern}
            </span>
            <span className="inline-flex items-center gap-1">
              <Bell size={13} strokeWidth={1.75} className="text-gray-500" aria-hidden />
              {plan.time}
            </span>
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase mb-3">
            진행 단계
          </h3>
          <ol role="list" className="relative pl-5 space-y-3">
            <span
              aria-hidden
              className="absolute left-[5px] top-1 bottom-1 w-px bg-gray-200"
            />
            {plan.steps.map((s, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full border border-dashed border-gray-400 bg-white"
                />
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-gray-500 font-mono w-12">
                    {s.time}
                  </span>
                  <span className="text-sm text-gray-900 font-semibold">
                    {s.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 ml-14 leading-relaxed">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <RyanBox
          variant="promise"
          heading="필요하시면 언제든 조정해드릴게요"
          body="플랜을 일시 중지하거나 패턴·시간을 바꿀 수 있어요. 편집 버튼으로 폼에 들어가시면 됩니다."
        />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto flex gap-2">
          <Link
            href={`/user/schedule/new?rule=${params.id}`}
            className="flex-1 h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover text-white font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <Edit3 size={16} strokeWidth={1.75} aria-hidden />
            편집
          </Link>
          <Link
            href="/user/schedule"
            className="px-4 h-14 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm flex items-center justify-center"
          >
            일정으로
          </Link>
        </div>
      </div>
    </div>
  );
}
