"use client";

import Link from "next/link";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { DIET_TAGS, ALLERGY_TAGS } from "@/lib/enums";

// Mock 초기값: diet[4]='omnivore' 선택
const DEFAULT_DIET = [4];
const DEFAULT_ALLERGY: number[] = [];

export default function SignupDiet() {
  const router = useRouter();
  const [diet, setDiet] = useState<number[]>(DEFAULT_DIET);
  const [allergy, setAllergy] = useState<number[]>(DEFAULT_ALLERGY);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (
    setter: Dispatch<SetStateAction<number[]>>,
    i: number,
  ) => setter((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const dietTags = diet.map((i) => DIET_TAGS[i].key);
        const allergyTags = allergy.map((i) => ALLERGY_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dietTags, allergyTags }),
        });
      }
      router.push("/user/signup/lifestyle");
    } finally {
      setSubmitting(false);
    }
  }

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
          <div className="h-full bg-[#4F8BD9]" style={{ width: "57.1%" }} />
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
          {DIET_TAGS.map((t, i) => {
            const wide = t.key === "omnivore";
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => toggle(setDiet, i)}
                className={`rounded-2xl p-3 text-left border-2 transition ${
                  wide ? "col-span-2" : ""
                } ${
                  diet.includes(i)
                    ? "bg-[#4F8BD9] text-white border-[#4F8BD9]"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-xl mb-1">{t.emoji}</div>
                <div className="text-sm font-semibold whitespace-pre-line">
                  {t.label}
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          알레르기 / 못 먹는 것
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ALLERGY_TAGS.map((t, i) => {
            const wide = t.key === "lactose";
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => toggle(setAllergy, i)}
                className={`rounded-2xl p-3 text-left border-2 transition ${
                  wide ? "col-span-2" : ""
                } ${
                  allergy.includes(i)
                    ? "bg-[#4F8BD9] text-white border-[#4F8BD9]"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="text-xl mb-1">{t.emoji}</div>
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
