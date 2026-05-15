import { ArrowRight, Cloud, Calendar } from 'lucide-react';
import { BottomNav } from './BottomNav';

export function VersionA() {
  return (
    <div className="h-[852px] w-[393px] bg-[#F4F6FA] flex flex-col relative overflow-hidden">
      {/* Header greeting */}
      <div className="pt-16 px-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B6FE8] to-[#8C8FEE] flex items-center justify-center shadow-sm">
            <span className="text-xl">🦁</span>
          </div>
          <div>
            <h1 className="text-[26px] leading-tight tracking-tight" style={{ fontWeight: 500 }}>
              다하님, 좋은 아침이에요
            </h1>
            <p className="text-[13px] text-[#8A93A3] mt-0.5">함께한 47일 · 수요일</p>
          </div>
        </div>
      </div>

      {/* Hero - Lion sphere */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-8">
        <div className="relative mb-6">
          {/* Outer glow rings */}
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-[#5B5FE0]/10 to-transparent blur-2xl"></div>
          <div className="absolute inset-0 -m-4 rounded-full border border-[#5B5FE0]/20"></div>
          <div className="absolute inset-0 -m-2 rounded-full border border-[#5B5FE0]/10"></div>

          {/* Main sphere */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#5B5FE0] to-[#7C7FE8] flex items-center justify-center shadow-[0_8px_32px_rgba(91,95,224,0.4)]">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#6B6FE8] to-[#8C8FEE] flex items-center justify-center">
              <span className="text-6xl">🦁</span>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-[#8A93A3] mb-2">오늘, 무엇을 도와드릴까요</p>
        <p className="text-[15px] text-[#5A6372] text-center leading-relaxed px-4">
          비 <span className="text-[#5B5FE0]" style={{ fontWeight: 500 }}>80%</span>에 강남 미팅 있는 날이에요.<br />
          우산이랑 트렌치, 제가 챙길게요.
        </p>
      </div>

      {/* Suggested questions */}
      <div className="px-6 space-y-3 mb-6">
        <SuggestionChip text="오늘 점심 뭐 먹는 게 좋을까?" />
        <SuggestionChip text="10시 미팅 자료 정리해줘" />
        <SuggestionChip text="이번 주 일정 한눈에 보여줘" />
      </div>

      {/* Info pins */}
      <div className="px-6 mb-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 flex gap-4">
          <div className="flex-1 flex items-start gap-3">
            <Cloud className="w-5 h-5 text-[#5A6372] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-[13px] text-[#8A93A3] mb-0.5">오늘 날씨</p>
              <p className="text-[15px] text-[#0F1419]">비 80% · 우산</p>
            </div>
          </div>
          <div className="w-px bg-[#0F1419]/6"></div>
          <div className="flex-1 flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#5A6372] mt-0.5 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <p className="text-[13px] text-[#8A93A3] mb-0.5">다음 일정</p>
              <p className="text-[15px] text-[#0F1419]">10:00 미팅</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat input bar */}
      <div className="px-6 pb-6 mb-20">
        <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          <input
            type="text"
            placeholder="라이언에게 말 걸기"
            className="flex-1 bg-transparent text-[15px] text-[#0F1419] placeholder:text-[#8A93A3] outline-none"
          />
          <button className="text-[#8A93A3]" aria-label="음성 입력">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="w-9 h-9 rounded-full bg-[#5B5FE0] flex items-center justify-center" aria-label="전송">
            <ArrowRight className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}

function SuggestionChip({ text }: { text: string }) {
  return (
    <button className="w-full bg-white/60 backdrop-blur-sm rounded-xl px-5 py-4 flex items-center justify-between group hover:bg-white/80 transition-colors">
      <span className="text-[15px] text-[#5A6372] text-left">{text}</span>
      <ArrowRight className="w-4 h-4 text-[#8A93A3] flex-shrink-0 ml-3" strokeWidth={1.5} />
    </button>
  );
}
