"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { INTERESTS } from "@/lib/enums";

// Mock 초기 선택: economy, it, self-dev
const DEFAULT_INDICES = [0, 3, 6];

export default function SignupInterests() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>(DEFAULT_INDICES);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleFinish(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const interests = selected.map((i) => INTERESTS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interests }),
        });
      }
      router.push("/user/home");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/job" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">7 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-full bg-[#4F8BD9]" />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10 overflow-y-auto">
        <div className="text-3xl mb-3">🎯</div>
        <h1 className="text-2xl font-bold mb-2">어떤 소식이 궁금하세요?</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          관심 있는 분야 모두 골라주세요. 메인 화면의 헤드라인에 반영돼요.
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {INTERESTS.map((it, i) => (
            <button
              key={it.key}
              type="button"
              onClick={() => toggle(i)}
              className={`rounded-xl px-3 py-3 text-left border-2 transition ${
                selected.includes(i)
                  ? "bg-[#4F8BD9] text-white border-[#4F8BD9]"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-xl mb-1">{it.emoji}</div>
              <div className="text-sm font-semibold">{it.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-[#EEF3FB] rounded-2xl px-4 py-3 flex gap-3 items-start mt-6">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-[#2A5BA0] leading-relaxed">
            완료! 이제 나만의 라이프 OS가 시작돼요.
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleFinish(true)}
          disabled={submitting}
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center disabled:opacity-50"
        >
          건너뛰기
        </button>
        <button
          type="button"
          onClick={() => handleFinish(false)}
          disabled={submitting}
          className="col-span-2 bg-[#4F8BD9] hover:bg-[#3B73C2] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          {submitting ? "저장 중…" : "완료"}
        </button>
      </div>
    </main>
  );
}
