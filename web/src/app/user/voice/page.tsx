import Link from "next/link";

export default function VoicePage() {
  return (
    <div className="min-h-screen flex flex-col text-white relative bg-gradient-to-b from-emerald-700 via-emerald-800 to-charcoal">
      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(16,185,129,0.6); transform: scale(1); }
          70% { box-shadow: 0 0 0 40px rgba(16,185,129,0); transform: scale(1.05); }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,0); transform: scale(1); }
        }
        .pulse-ring { animation: pulse-ring 2s infinite; }
        @keyframes wave {
          0%, 100% { height: 12%; }
          50% { height: 100%; }
        }
        .wave-bar { animation: wave 1s infinite ease-in-out; transform-origin: bottom; }
        .wave-bar:nth-child(1), .wave-bar:nth-child(9) { animation-delay: 0s; }
        .wave-bar:nth-child(2), .wave-bar:nth-child(8) { animation-delay: 0.12s; }
        .wave-bar:nth-child(3), .wave-bar:nth-child(7) { animation-delay: 0.24s; }
        .wave-bar:nth-child(4), .wave-bar:nth-child(6) { animation-delay: 0.36s; }
        .wave-bar:nth-child(5) { animation-delay: 0.48s; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.4s ease-out; }
      `}</style>

      <header className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link
          href="/user/home"
          aria-label="닫기"
          className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white text-lg backdrop-blur"
        >
          ✕
        </Link>
        <span className="font-bold tracking-tight opacity-80">AI 비서</span>
        <button
          type="button"
          title="텍스트로 입력"
          className="ml-auto w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base backdrop-blur"
        >
          ⌨️
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        <p className="text-xs uppercase tracking-widest opacity-60 mb-3 fade-up">
          듣고 있어요
        </p>

        <div className="relative mb-12">
          <div className="w-44 h-44 rounded-full bg-emerald-500/20 backdrop-blur flex items-center justify-center pulse-ring">
            <div className="w-32 h-32 rounded-full bg-emerald-500 flex items-end justify-center gap-1 shadow-2xl shadow-emerald-500/50 px-6 py-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} className="wave-bar w-1.5 bg-white rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center min-h-[100px]">
          <p className="text-2xl font-bold leading-snug fade-up">
            &quot;오늘 점심 뭐 먹지?&quot;
          </p>
          <p className="text-sm opacity-60 mt-3">실시간 인식 중...</p>
          <p className="text-[10px] opacity-40 mt-2">
            ⚠️ Mock 화면입니다. STT/LLM 연결 후 실제 음성 인식 동작합니다.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2.5 w-full max-w-sm">
          <SuggestionCard text='"내일 일정 알려줘"' />
          <SuggestionCard text='"가벼운 운동 추천해줘"' />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-white/10 backdrop-blur flex items-center justify-around">
        <button
          type="button"
          className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition"
        >
          <span className="text-xl">🌐</span>
          <span className="text-[10px]">번역</span>
        </button>
        <Link
          href="/user/home"
          title="대화 종료"
          className="w-14 h-14 rounded-full bg-white text-emerald-600 flex items-center justify-center text-2xl shadow-lg active:scale-95 transition"
        >
          ⏹
        </Link>
        <button
          type="button"
          className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition"
        >
          <span className="text-xl">🔇</span>
          <span className="text-[10px]">음소거</span>
        </button>
      </div>
    </div>
  );
}

function SuggestionCard({ text }: { text: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl px-4 py-3 text-center">
      <p className="text-[10px] opacity-60 uppercase tracking-wider mb-1">
        이렇게 말해보세요
      </p>
      <p className="text-xs font-semibold">{text}</p>
    </div>
  );
}
