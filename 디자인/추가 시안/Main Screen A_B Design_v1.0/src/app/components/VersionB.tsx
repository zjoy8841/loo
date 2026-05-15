import { Star, MapPin } from 'lucide-react';
import { BottomNav } from './BottomNav';

export function VersionB() {
  return (
    <div className="h-[852px] w-[393px] bg-[#F4F6FA] flex flex-col relative overflow-hidden">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Header greeting */}
        <div className="pt-16 px-6 pb-8">
          <h1 className="text-[28px] leading-tight tracking-tight mb-1" style={{ fontWeight: 500 }}>
            다하님,<br />좋은 아침이에요
          </h1>
          <p className="text-[13px] text-[#8A93A3]">2026년 5월 14일 · 수요일</p>
        </div>

        {/* Today's Briefing Card - HERO */}
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-br from-[#5B5FE0] to-[#7C7FE8] rounded-3xl p-6 shadow-[0_8px_32px_rgba(91,95,224,0.3)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-lg">🦁</span>
              </div>
              <span className="text-white/90 text-[13px]">오늘의 브리핑</span>
            </div>

            <p className="text-white text-[15px] leading-relaxed mb-6">
              오늘은 비 80%에 10시 강남 미팅이 있어요. 수면 7시간 12분으로 컨디션은 충분하니, 우산만 챙기면 든든한 하루예요.
            </p>

            <div className="flex gap-3">
              <BriefingStat label="날씨" value="비·14°" />
              <BriefingStat label="강수" value="80%" />
              <BriefingStat label="수면" value="7h 12m" />
            </div>
          </div>
        </div>

        {/* Headlines Section */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] text-[#0F1419]" style={{ fontWeight: 500 }}>오늘의 헤드라인</h2>
            <span className="text-[13px] text-[#8A93A3]">관심사 기반</span>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden">
            <HeadlineItem
              category="증시"
              categoryColor="#5B5FE0"
              headline="코스피 2,890 (-1.2%) · 호르무즈 긴장에 유가 5% 상승"
              source="매일경제"
              time="28분 전"
              isFirst
            />
            <div className="h-px bg-[#0F1419]/6 mx-5"></div>
            <HeadlineItem
              category="IT·테크"
              headline="Anthropic Claude 5 출시 임박 '추론·코드 30% 향상'"
              source="디지털타임스"
              time="3시간 전"
            />
            <div className="h-px bg-[#0F1419]/6 mx-5"></div>
            <HeadlineItem
              category="자기계발"
              headline="'하루 30분 독서 챌린지' 직장인 1만 명 신청"
              source="동아일보"
              time="어제"
              isLast
            />
          </div>
        </div>

        {/* Lunch Recommendation */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] text-[#0F1419]" style={{ fontWeight: 500 }}>오늘의 점심</h2>
            <span className="text-[13px] text-[#8A93A3]">페르소나 기반</span>
          </div>

          <button className="w-full bg-white rounded-2xl p-5 flex items-center gap-4 hover:bg-white/80 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#F4F6FA] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🥗</span>
            </div>
            <div className="flex-1 text-left">
              <div className="text-[13px] text-[#5B5FE0] mb-1" style={{ fontWeight: 500 }}>미팅 많은 날·단백질</div>
              <p className="text-[15px] text-[#0F1419] mb-1" style={{ fontWeight: 500 }}>닭가슴살 샐러드</p>
              <div className="flex items-center gap-2 text-[13px] text-[#8A93A3]">
                <span>B카페</span>
                <span>·</span>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-[#5B5FE0] text-[#5B5FE0]" />
                  <span>4.7</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>도보 3분</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Today's Missions */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] text-[#0F1419]" style={{ fontWeight: 500 }}>오늘의 미션</h2>
            <span className="text-[13px] text-[#8A93A3]">1 / 3 완료</span>
          </div>

          <div className="bg-white rounded-2xl p-5">
            <div className="h-1.5 bg-[#F4F6FA] rounded-full mb-5 overflow-hidden">
              <div className="h-full w-1/3 bg-[#5B5FE0] rounded-full"></div>
            </div>

            <div className="space-y-4">
              <MissionItem text="아침 브리핑 확인" completed />
              <MissionItem text="물 8잔 마시기" progress="3/8" />
              <MissionItem text="저염 메뉴 1번 선택" />
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeTab="home" />
    </div>
  );
}

function BriefingStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-white/15 backdrop-blur-sm rounded-xl p-3">
      <p className="text-white/70 text-[11px] mb-1">{label}</p>
      <p className="text-white text-[15px]" style={{ fontWeight: 500 }}>{value}</p>
    </div>
  );
}

interface HeadlineItemProps {
  category: string;
  categoryColor?: string;
  headline: string;
  source: string;
  time: string;
  isFirst?: boolean;
  isLast?: boolean;
}

function HeadlineItem({ category, categoryColor, headline, source, time, isFirst, isLast }: HeadlineItemProps) {
  return (
    <button className={`w-full px-5 text-left hover:bg-[#F4F6FA]/50 transition-colors ${isFirst ? 'pt-5 pb-4' : isLast ? 'pt-4 pb-5' : 'py-4'}`}>
      <p className="text-[13px] mb-1.5" style={{ color: categoryColor || '#8A93A3', fontWeight: 500 }}>
        {category}
      </p>
      <p className="text-[15px] text-[#0F1419] mb-2 leading-snug">
        {headline}
      </p>
      <p className="text-[13px] text-[#8A93A3]">
        {source} · {time}
      </p>
    </button>
  );
}

interface MissionItemProps {
  text: string;
  completed?: boolean;
  progress?: string;
}

function MissionItem({ text, completed, progress }: MissionItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        completed ? 'bg-[#5B5FE0] border-[#5B5FE0]' : 'border-[#E0E0E0]'
      }`}>
        {completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`flex-1 text-[15px] ${completed ? 'text-[#8A93A3] line-through' : 'text-[#0F1419]'}`}>
        {text}
      </span>
      {progress && (
        <span className="text-[13px] text-[#8A93A3]">{progress}</span>
      )}
    </div>
  );
}
