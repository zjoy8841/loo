"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HEALTH_TAGS } from "@/lib/enums";

export default function SignupHealth() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([0]);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const healthTags = selected.map((i) => HEALTH_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ healthTags }),
        });
      }
      router.push("/user/signup/shape");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/account" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">2 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#4F8BD9]" style={{ width: "28.6%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">🩺</div>
        <h1 className="text-2xl font-bold mb-2">몸 상태는 어떠세요?</h1>
        <p className="text-gray-500 mb-8 text-sm">
          해당되는 것 모두 골라주세요. 추천이 더 정확해져요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {HEALTH_TAGS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => toggle(i)}
              className={`rounded-2xl p-4 text-left border-2 transition ${
                selected.includes(i)
                  ? "bg-[#4F8BD9] text-white border-[#4F8BD9]"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-2xl mb-1.5">{t.emoji}</div>
              <div className="text-sm font-semibold leading-tight whitespace-pre-line">
                {t.label}
              </div>
            </button>
          ))}
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
