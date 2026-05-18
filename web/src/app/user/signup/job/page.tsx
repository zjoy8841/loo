"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { JOBS } from "@/lib/enums";

// Mock 초기값: index 1 = employee
const DEFAULT_INDEX = 1;
const ETC_INDEX = JOBS.findIndex((j) => j.key === "etc");

export default function SignupJob() {
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
          body: JSON.stringify({ jobKey: JOBS[selected].key }),
        });
      }
      router.push("/user/signup/interests");
    } finally {
      setSubmitting(false);
    }
  }

  // 메인 6개 카드 + 마지막 etc 카드 (col-span-2)는 별도 렌더
  const mainJobs = JOBS.filter((j) => j.key !== "etc");

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
          {mainJobs.map((j, i) => (
            <button
              key={j.key}
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
                {j.description}
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelected(ETC_INDEX)}
            className={`col-span-2 rounded-2xl p-4 text-left border-2 transition ${
              selected === ETC_INDEX
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-2xl mb-1.5">{JOBS[ETC_INDEX].emoji}</div>
            <div className="text-sm font-semibold">{JOBS[ETC_INDEX].label}</div>
          </button>
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
