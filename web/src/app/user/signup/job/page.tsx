"use client";

import Link from "next/link";
import { useState } from "react";

const JOBS = [
  { emoji: "🎓", label: "학생", desc: "전공·시험·공모전" },
  { emoji: "💼", label: "직장인", desc: "경제·산업·시사" },
  { emoji: "👨‍⚕️", label: "의료인", desc: "논문·학회·가이드" },
  { emoji: "💻", label: "프리랜서", desc: "스타트업·기술·세션" },
  { emoji: "👶", label: "부모", desc: "육아·교육·학교" },
  { emoji: "👴", label: "시니어", desc: "건강·복지·동네" },
];

export default function SignupJob() {
  const [selected, setSelected] = useState<number>(1);

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <Link href="/user/signup/lifestyle" className="text-2xl text-gray-500">
          ←
        </Link>
        <span className="text-sm text-gray-500">6 / 7</span>
      </header>
      <div className="px-6">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: "85.7%" }} />
        </div>
      </div>

      <div className="flex-1 px-6 pt-10">
        <div className="text-3xl mb-3">💼</div>
        <h1 className="text-2xl font-bold mb-2">어떻게 일하세요?</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          하나만 골라주세요. 직업에 맞는 인사이트와 뉴스를 메인에 보여드려요.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {JOBS.map((j, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`rounded-2xl p-4 text-left border-2 transition ${
                selected === i
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="text-2xl mb-1.5">{j.emoji}</div>
              <div className="text-sm font-semibold leading-tight">{j.label}</div>
              <div
                className={`text-[10px] mt-1 ${
                  selected === i ? "opacity-80" : "text-gray-400"
                }`}
              >
                {j.desc}
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected(6)}
            className={`col-span-2 rounded-2xl p-4 text-left border-2 transition ${
              selected === 6
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-2xl mb-1.5">✨</div>
            <div className="text-sm font-semibold">기타 / 직접 선택할게요</div>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-3 gap-3">
        <Link
          href="/user/signup/interests"
          className="col-span-1 bg-white border border-gray-200 text-gray-500 font-semibold py-4 rounded-xl text-center"
        >
          건너뛰기
        </Link>
        <Link
          href="/user/signup/interests"
          className="col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          다음
        </Link>
      </div>
    </main>
  );
}
