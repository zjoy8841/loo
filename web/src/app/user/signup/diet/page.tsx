"use client";

import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";

const DIET = [
  { emoji: "🥗", label: "채식" },
  { emoji: "🌱", label: "비건" },
  { emoji: "🐟", label: "페스코" },
  { emoji: "☪️", label: "할랄" },
  { emoji: "🍖", label: "다 먹어요", wide: true },
];

const ALLERGY = [
  { emoji: "🥜", label: "견과류\n알레르기" },
  { emoji: "🦐", label: "갑각류\n알레르기" },
  { emoji: "🥛", label: "유당 못 견딤", wide: true },
];

export default function SignupDiet() {
  const [diet, setDiet] = useState<number[]>([4]);
  const [allergy, setAllergy] = useState<number[]>([]);

  const toggle = (
    setter: Dispatch<SetStateAction<number[]>>,
    i: number,
  ) => setter((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/shape" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">4 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: "57.1%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10 overflow-y-auto">
        <div className="text-3xl mb-3">🍽️</div>
        <h1 className="text-2xl font-bold mb-2">음식은 어떠세요?</h1>
        <p className="text-gray-500 mb-6 text-sm">해당되는 것 모두 골라주세요</p>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          식이 성향
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {DIET.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(setDiet, i)}
              className={`rounded-2xl p-3 text-left border-2 transition ${
                t.wide ? "col-span-2" : ""
              } ${
                diet.includes(i)
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-xl mb-1">{t.emoji}</div>
              <div className="text-sm font-semibold whitespace-pre-line">
                {t.label}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          알레르기 / 못 먹는 것
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ALLERGY.map((t, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(setAllergy, i)}
              className={`rounded-2xl p-3 text-left border-2 transition ${
                t.wide ? "col-span-2" : ""
              } ${
                allergy.includes(i)
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-xl mb-1">{t.emoji}</div>
              <div className="text-sm font-semibold leading-tight whitespace-pre-line">
                {t.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <Link
          href="/user/signup/lifestyle"
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center"
        >
          건너뛰기
        </Link>
        <Link
          href="/user/signup/lifestyle"
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          다음
        </Link>
      </div>
    </main>
  );
}
