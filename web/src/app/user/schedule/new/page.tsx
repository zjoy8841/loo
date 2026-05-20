"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { findRule } from "@/lib/notifications/mock";
import { useT } from "@/lib/i18n";

const PATTERNS = ["daily", "weekly", "weekday", "once"] as const;
type Pattern = (typeof PATTERNS)[number];

export default function NewRulePage() {
  const t = useT();
  const router = useRouter();
  const search = useSearchParams();
  const ruleId = search.get("rule");
  const existing = ruleId ? findRule(ruleId) : undefined;
  const isEdit = !!existing;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [pattern, setPattern] = useState<Pattern>(existing?.pattern ?? "daily");
  const [time, setTime] = useState(existing?.time ?? "12:00");
  const [condition, setCondition] = useState("");
  const [action, setAction] = useState("");

  const canSave = title.trim().length > 0;

  function handleSave() {
    if (!canSave) return;
    // v0.1 mock: 그냥 일정 화면으로 복귀
    router.push("/user/schedule");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-28">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href="/user/schedule"
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          {isEdit
            ? t("user.notification.create.title_edit")
            : t("user.notification.create.title_new")}
        </h1>
        <span className="w-10 h-10" />
      </header>

      <main className="flex-1 px-5 pt-3 space-y-5">
        <Field
          label="제목"
          control={
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 점심 메뉴 추천"
              className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-signup-accent"
            />
          }
        />

        <Field
          label={t("user.notification.create.pattern_label")}
          control={
            <div role="radiogroup" className="grid grid-cols-2 gap-2">
              {PATTERNS.map((p) => {
                const selected = pattern === p;
                return (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPattern(p)}
                    className={`h-12 rounded-xl border-2 text-sm font-semibold transition ${
                      selected
                        ? "border-signup-accent bg-signup-accent text-white"
                        : "border-gray-200 bg-white text-gray-900"
                    }`}
                  >
                    {t(`user.notification.create.pattern_${p}` as const)}
                  </button>
                );
              })}
            </div>
          }
        />

        <Field
          label={t("user.notification.create.time_label")}
          control={
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm focus:outline-none focus:border-signup-accent"
            />
          }
        />

        <Field
          label={t("user.notification.create.condition_label")}
          hint="예: 단백질 부족 페르소나일 때만 / 비 오는 날만"
          control={
            <textarea
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-signup-accent resize-none"
            />
          }
        />

        <Field
          label={t("user.notification.create.action_label")}
          hint="예: 점심 메뉴 추천 카드 띄우기 / 우산 챙기라고 알림"
          control={
            <textarea
              value={action}
              onChange={(e) => setAction(e.target.value)}
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-signup-accent resize-none"
            />
          }
        />
      </main>

      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto space-y-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className="w-full h-14 rounded-xl bg-signup-accent hover:bg-signup-accent-hover disabled:bg-gray-300 text-white font-semibold text-base transition"
          >
            {t("user.notification.create.save")}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => router.push("/user/schedule")}
              className="w-full h-12 text-sm text-gray-600 font-semibold"
            >
              {t("user.notification.create.delete")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  control,
}: {
  label: string;
  hint?: string;
  control: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      {control}
      {hint && <p className="mt-1 text-[11px] text-gray-500">{hint}</p>}
    </div>
  );
}
