"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Mic, ArrowUp } from "lucide-react";
import RyanMascot from "@/components/RyanMascot";

type Msg = { who: "ryan" | "me"; text: string };

const INITIAL: Msg[] = [
  {
    who: "ryan",
    text: "안녕하세요. 어떤 알림 규칙을 만들고 싶으세요? 평소 점심 시간·아침 브리핑 등 익숙한 패턴부터 자유롭게 말씀해주세요.",
  },
];

const SUGGESTIONS = [
  "매주 화요일 12시 점심 추천",
  "비 오는 날 우산 알림",
  "오후 3시 물 한 잔",
];

export default function NotificationChatPage() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>(INITIAL);
  const [draft, setDraft] = useState("");

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((m) => [
      ...m,
      { who: "me", text: trimmed },
      {
        who: "ryan",
        text: "좋아요. 이 패턴으로 규칙을 만들어볼게요. 풀뷰에서 확인해주세요.",
      },
    ]);
    setDraft("");
    // 3초 후 mock 플랜 풀뷰 진입
    setTimeout(() => router.push("/user/plan/p-001"), 2000);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
        <Link
          href="/user/notifications"
          className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
          aria-label="이전"
        >
          <ChevronLeft size={22} strokeWidth={1.75} />
        </Link>
        <h1 className="mx-auto text-base font-semibold text-gray-900">
          라이언과 대화
        </h1>
        <span className="w-10 h-10" />
      </header>

      <main className="flex-1 px-5 pt-3 pb-3">
        <div className="flex flex-col items-center text-center mb-5">
          <RyanMascot size={72} />
        </div>

        <ul className="space-y-3" role="log" aria-live="polite">
          {msgs.map((m, i) => (
            <li
              key={i}
              className={`flex ${m.who === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.who === "ryan"
                    ? "bg-gray-100 text-gray-900"
                    : "bg-signup-accent text-white"
                }`}
              >
                {m.text}
              </div>
            </li>
          ))}
        </ul>

        {msgs.length === 1 && (
          <div className="mt-6">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
              자주 묻는 규칙
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="h-8 px-3 rounded-full border border-gray-300 text-xs text-gray-700"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            type="button"
            aria-label="파일 첨부"
            className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
          >
            <Plus size={18} strokeWidth={1.75} />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="만들고 싶은 규칙을 말씀하세요"
            className="flex-1 h-10 bg-gray-100 rounded-full px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border focus:border-gray-300"
          />
          <button
            type="button"
            aria-label="음성"
            className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
          >
            <Mic size={18} strokeWidth={1.75} />
          </button>
          <button
            type="submit"
            aria-label="전송"
            disabled={!draft.trim()}
            className="w-10 h-10 shrink-0 rounded-full bg-signup-accent text-white flex items-center justify-center disabled:bg-gray-300 transition"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
}
