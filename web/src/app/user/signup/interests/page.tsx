"use client";

import Link from "next/link";
import { useState } from "react";

const INTERESTS = [
  { emoji: "📈", label: "경제·시사" },
  { emoji: "🎬", label: "엔터·연예" },
  { emoji: "⚽", label: "스포츠" },
  { emoji: "💻", label: "IT·테크" },
  { emoji: "🩺", label: "의료·헬스" },
  { emoji: "👗", label: "패션·라이프" },
  { emoji: "📚", label: "자기계발" },
  { emoji: "👶", label: "육아·교육" },
  { emoji: "🍜", label: "음식·요리" },
  { emoji: "✈️", label: "여행" },
];

export default function SignupInterests() {
  const [selected, setSelected] = useState<number[]>([0, 3, 6]);
  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

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
          <div className="h-full w-full bg-emerald-500" />
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
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={`rounded-xl px-3 py-3 text-left border-2 transition ${
                selected.includes(i)
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-xl mb-1">{it.emoji}</div>
              <div className="text-sm font-semibold">{it.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-emerald-50 rounded-2xl px-4 py-3 flex gap-3 items-start mt-6">
          <span className="text-xl">🎉</span>
          <p className="text-sm text-emerald-700 leading-relaxed">
            완료! 이제 다환님만의 라이프 OS가 시작돼요.
          </p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <Link
          href="/user/home"
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center"
        >
          건너뛰기
        </Link>
        <Link
          href="/user/home"
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          완료
        </Link>
      </div>
    </main>
  );
}
