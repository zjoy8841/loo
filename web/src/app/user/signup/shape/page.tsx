"use client";

import Link from "next/link";
import { useState } from "react";

const TAGS = [
  { emoji: "🚩", label: "살찌고\n싶어요" },
  { emoji: "🏃‍♀️", label: "다이어트\n중" },
  { emoji: "💪", label: "벌크업\n중" },
  { emoji: "♾️", label: "네버엔딩\n다이어터" },
  { emoji: "🧘", label: "그냥 유지만 할래요", wide: true },
];

export default function SignupShape() {
  const [selected, setSelected] = useState<number>(3);

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
          <div className="h-full bg-emerald-500" style={{ width: "42.9%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">🎯</div>
        <h1 className="text-2xl font-bold mb-2">요즘 체형 목표는요?</h1>
        <p className="text-gray-500 mb-8 text-sm">
          하나만 골라주세요. 메뉴 추천에 활용돼요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {TAGS.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`rounded-2xl p-4 text-left border-2 transition ${
                t.wide ? "col-span-2" : ""
              } ${
                selected === i
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
          href="/user/signup/diet"
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center"
        >
          건너뛰기
        </Link>
        <Link
          href="/user/signup/diet"
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          다음
        </Link>
      </div>
    </main>
  );
}
