"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SHAPE_GOALS } from "@/lib/enums";

// Mock 초기값 (index 3 = never-ending-dieter)
const DEFAULT_INDEX = 3;

export default function SignupShape() {
  const router = useRouter();
  const [selected, setSelected] = useState<number>(DEFAULT_INDEX);
  const [submitting, setSubmitting] = useState(false);

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shapeKey: SHAPE_GOALS[selected].key }),
        });
      }
      router.push("/user/signup/diet");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/health" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">3 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F8BD9]" style={{ width: "42.9%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">🎯</div>
        <h1 className="text-2xl font-bold mb-2">요즘 체형 목표는요?</h1>
        <p className="text-gray-500 mb-8 text-sm">
          하나만 골라주세요. 메뉴 추천에 활용돼요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {SHAPE_GOALS.map((t, i) => {
            const wide = t.key === "maintain";
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelected(i)}
                className={`rounded-2xl p-4 text-left border-2 transition ${
                  wide ? "col-span-2" : ""
                } ${
                  selected === i
                    ? "bg-[#4F8BD9] text-white border-[#4F8BD9]"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-2xl mb-1.5">{t.emoji}</div>
                <div className="text-sm font-semibold leading-tight whitespace-pre-line">
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => handleNext(true)}
          disabled={submitting}
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center disabled:opacity-50"
        >
          건너뛰기
        </button>
        <button
          type="button"
          onClick={() => handleNext(false)}
          disabled={submitting}
          className="col-span-2 bg-[#4F8BD9] hover:bg-[#3B73C2] disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          {submitting ? "저장 중…" : "다음"}
        </button>
      </div>
    </main>
  );
}
