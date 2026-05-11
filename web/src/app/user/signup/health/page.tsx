"use client";

import Link from "next/link";
import { useState } from "react";

const TAGS = [
  { emoji: "🥚", label: "콜레스테롤\n걱정중" },
  { emoji: "💧", label: "고혈압\n투약중" },
  { emoji: "🍬", label: "혈당\n관리중" },
  { emoji: "😮‍💨", label: "만성\n피곤러" },
  { emoji: "🦴", label: "관절이\n좀…" },
  { emoji: "💚", label: "일단은\n멀쩡" },
];

export default function SignupHealth() {
  const [selected, setSelected] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

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
          <div className="h-full bg-emerald-500" style={{ width: "28.6%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">🩺</div>
        <h1 className="text-2xl font-bold mb-2">몸 상태는 어떠세요?</h1>
        <p className="text-gray-500 mb-8 text-sm">
          해당되는 것 모두 골라주세요. 추천이 더 정확해져요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {TAGS.map((t, i) => (
            <button
              key={i}
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
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <Link
          href="/user/signup/shape"
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center"
        >
          건너뛰기
        </Link>
        <Link
          href="/user/signup/shape"
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          다음
        </Link>
      </div>
    </main>
  );
}
