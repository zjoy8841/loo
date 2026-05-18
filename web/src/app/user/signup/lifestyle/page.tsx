"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LIFESTYLE_TAGS } from "@/lib/enums";

export default function SignupLifestyle() {
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
        const lifestyleTags = selected.map((i) => LIFESTYLE_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lifestyleTags }),
        });
      }
      router.push("/user/signup/job");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/diet" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">5 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: "71.4%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">☕</div>
        <h1 className="text-2xl font-bold mb-2">평소 라이프는요?</h1>
        <p className="text-gray-500 mb-8 text-sm">
          이제 두 단계 남았어요. 모두 골라주세요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {LIFESTYLE_TAGS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => toggle(i)}
              className={`rounded-2xl p-4 text-left border-2 transition ${
                selected.includes(i)
                  ? "bg-emerald-500 text-white border-emerald-500"
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

        <div className="mt-8 bg-emerald-50 rounded-2xl px-4 py-3 flex gap-3 items-start">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-emerald-700 leading-relaxed">
            두 단계 남았어요!
          </p>
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
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          {submitting ? "저장 중…" : "다음"}
        </button>
      </div>
    </main>
  );
}
