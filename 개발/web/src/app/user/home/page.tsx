import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  getPersonaChips,
  getMetaChips,
  getGreetingForHour,
  getAvatarInitial,
  parseJsonArray,
} from "@/lib/persona";

// 뉴스·미션·추천 등은 아직 mock — DB·LLM 연동은 후속 작업.
// 이번 단계에서는 헤더 인사·메타·아바타·"나의 페르소나" 칩만 실제 DB 바인딩.

const HEADLINES = [
  { emoji: "📉", tag: "증시", tagBg: "bg-red-50", tagText: "text-red-700", gradient: "from-red-100 to-orange-200", title: "코스피 2,890 (-1.2%) · 호르무즈 긴장에 유가 5%↑", meta: "매일경제 · 28분 전" },
  { emoji: "🏦", tag: "금리", tagBg: "bg-blue-50", tagText: "text-blue-700", gradient: "from-blue-100 to-indigo-200", title: "한은 기준금리 동결 결정… 내년 인하 시점은 언제", meta: "한국경제 · 1시간 전" },
  { emoji: "🤖", tag: "IT·테크", tagBg: "bg-emerald-50", tagText: "text-emerald-700", gradient: "from-emerald-100 to-teal-200", title: "Anthropic Claude 5 출시 임박… \"추론·코드 모두 30% 향상\"", meta: "디지털타임스 · 3시간 전" },
  { emoji: "📚", tag: "자기계발", tagBg: "bg-purple-50", tagText: "text-purple-700", gradient: "from-purple-100 to-pink-200", title: "\"하루 30분 독서 6개월 챌린지\" 모집… 직장인 1만 명 신청", meta: "동아일보 · 어제" },
];

const HEALTH_NEWS = [
  { emoji: "🥚", tag: "콜레스테롤", tagBg: "bg-emerald-50", tagText: "text-emerald-700", gradient: "from-emerald-100 to-emerald-200", title: "달걀 노른자, 정말 콜레스테롤에 안 좋을까? 2026년 최신 연구", meta: "헬스조선 · 3시간 전" },
  { emoji: "☕", tag: "카페인", tagBg: "bg-amber-50", tagText: "text-amber-700", gradient: "from-amber-100 to-orange-200", title: "오후 2시 이후 커피, 수면 질에 미치는 영향은?", meta: "한국영양학회지 · 어제" },
];

const RECOMMEND = [
  { emoji: "🥗", name: "닭가슴살 샐러드", meta: "B카페 · 4.7 ★", gradient: "from-emerald-100 to-emerald-200" },
  { emoji: "🍜", name: "우동 한 그릇", meta: "C식당 · 4.5 ★", gradient: "from-amber-100 to-orange-200" },
  { emoji: "🥙", name: "그릭 랩", meta: "D키친 · 4.8 ★", gradient: "from-rose-100 to-pink-200" },
];

const QUICK_ACTIONS = [
  { emoji: "🍽️", label: "맛집 찾기", href: "/user/map" },
  { emoji: "🏃", label: "운동 시작", href: "#" },
  { emoji: "📅", label: "일정 보기", href: "#" },
  { emoji: "📊", label: "기록 입력", href: "#" },
];

export default async function UserHome() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/user/signup/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });
  if (!user) {
    redirect("/user/signup/account");
  }

  const profile = {
    shapeKey: user.profile?.shapeKey ?? null,
    jobKey: user.profile?.jobKey ?? null,
    healthTags: parseJsonArray(user.profile?.healthTags),
    dietTags: parseJsonArray(user.profile?.dietTags),
    allergyTags: parseJsonArray(user.profile?.allergyTags),
    lifestyleTags: parseJsonArray(user.profile?.lifestyleTags),
    interests: parseJsonArray(user.profile?.interests),
  };

  const personaChips = getPersonaChips(profile);
  const metaChips = getMetaChips(profile);
  const greeting = getGreetingForHour(new Date().getHours());
  const avatarInitial = getAvatarInitial(user.name);
  const dateStr = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <header className="px-5 pt-6 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold">L</div>
        <span className="font-bold tracking-tight">Life OS<span className="text-emerald-500">.ONE</span></span>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/user/notifications" className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center relative">
            <span className="text-base">🔔</span>
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </Link>
          <button className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-sm">{avatarInitial}</button>
        </div>
      </header>

      <main className="flex-1 px-5">
        <section className="pt-4 pb-2">
          <p className="text-xs text-gray-500 mb-1">{dateStr}</p>
          <h1 className="text-2xl font-bold leading-snug">{greeting.phrase},<br />{user.name}님 {greeting.emoji}</h1>
          {metaChips.length > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {metaChips.map((c) => `${c.emoji} ${c.label}`).join(" · ")}
            </p>
          )}
        </section>

        <section className="mt-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow-md shadow-emerald-200">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">오늘의 한 줄</p>
                <p className="text-sm leading-relaxed">어제 5,200걸음 걸으셨네요. 미팅 많은 날이니 점심엔 단백질 챙기시면 딱이에요. <strong>닭가슴살 샐러드</strong>, B카페에서 이미 단골 메뉴죠 😉</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="text-3xl">☁️</div>
            <div className="flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold">14°</span>
                <span className="text-xs text-gray-500">최고 22° · 비 80%</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">우산 챙기세요 · 자켓 추천</p>
            </div>
            <button className="text-xs font-semibold text-emerald-600">자세히</button>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">📰 오늘의 헤드라인</h2>
            <span className="text-[10px] text-gray-400">관심사 기반</span>
          </div>
          <div className="space-y-2.5">
            {HEADLINES.map((n) => (
              <article key={n.title} className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${n.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>{n.emoji}</div>
                <div className="flex-1 min-w-0">
                  <span className={`px-2 py-0.5 ${n.tagBg} ${n.tagText} text-[10px] rounded font-bold`}>{n.tag}</span>
                  <p className="font-semibold text-sm mt-1.5 leading-snug">{n.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{n.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">💼 직장인 인사이트</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-2xl flex-shrink-0">📊</div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">BC카드 데이터 인사이트</p>
                <p className="font-semibold text-sm mt-1 leading-snug">강남 직장인 점심 트렌드: 단백질 메뉴 32% 증가, 한식 -8%</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">최근 6개월 강남역 상권 결제 데이터 분석. {user.name}님과 비슷한 페르소나가 가장 많이 결제한 곳: <strong>B카페·SUBWAY·샐러디</strong></p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">✅ 오늘의 미션</h2>
            <span className="text-[10px] text-gray-400">1 / 4 완료</span>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <MissionItem done label="아침 브리핑 확인" />
            <MissionItem label="물 8잔 마시기" right="4 / 8" />
            <MissionItem label="30분 산책하기" />
            <MissionItem label="저염 메뉴 1번 선택" />
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "25%" }} />
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">⚡ 빠른 액션</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {QUICK_ACTIONS.map((a) => (
              <Link key={a.label} href={a.href} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:bg-emerald-50 transition">
                <span className="text-2xl">{a.emoji}</span>
                <span className="text-sm font-semibold">{a.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">📊 오늘의 기록</h2>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2"><span className="text-base">🚶</span><span className="text-xs text-gray-500">걸음</span></div>
              <div className="flex items-baseline gap-1"><span className="text-xl font-bold">5,200</span><span className="text-[10px] text-gray-400">/ 7,000</span></div>
              <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: "74%" }} /></div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-1.5 mb-2"><span className="text-base">🔥</span><span className="text-xs text-gray-500">칼로리</span></div>
              <div className="flex items-baseline gap-1"><span className="text-xl font-bold">320</span><span className="text-[10px] text-gray-400">kcal 소모</span></div>
              <p className="text-[10px] text-gray-400 mt-2">목표까지 200kcal</p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">나의 페르소나</h2>
            <button className="text-xs text-emerald-600 font-semibold">편집</button>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            {personaChips.length > 0 ? (
              <>
                <p className="text-xs text-gray-500 mb-3">
                  선택하신 {personaChips.length}개의 태그로 추천이 만들어져요
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {personaChips.map((t) => (
                    <span key={t.label} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs rounded-full font-semibold">
                      {t.emoji} {t.label}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500 mb-3">아직 태그가 비어 있어요</p>
                <Link href="/user/signup/health" className="inline-block text-xs font-semibold text-emerald-600 hover:underline">
                  3분 만에 페르소나 채우기 →
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">🩺 건강·식음 뉴스</h2>
          <div className="space-y-2.5">
            {HEALTH_NEWS.map((n) => (
              <article key={n.title} className="bg-white rounded-2xl p-4 shadow-sm flex gap-3">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${n.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>{n.emoji}</div>
                <div className="flex-1 min-w-0">
                  <span className={`px-2 py-0.5 ${n.tagBg} ${n.tagText} text-[10px] rounded font-bold`}>{n.tag}</span>
                  <p className="font-semibold text-sm mt-1.5 leading-snug">{n.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{n.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">이번 주 페르소나가 좋아한</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            {RECOMMEND.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl shadow-sm overflow-hidden flex-shrink-0 w-40">
                <div className={`aspect-square bg-gradient-to-br ${r.gradient} flex items-center justify-center text-4xl`}>{r.emoji}</div>
                <div className="p-3">
                  <p className="text-sm font-bold leading-tight">{r.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{r.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 grid grid-cols-4 max-w-[420px] mx-auto">
        <NavItem icon="🏠" label="홈" active />
        <NavItem icon="📊" label="기록" />
        <NavItem icon="🍽️" label="맛집" href="/user/map" />
        <NavItem icon="👤" label="마이" />
      </nav>
    </div>
  );
}

function MissionItem({ done, label, right }: { done?: boolean; label: string; right?: string }) {
  return (
    <div className="flex items-center gap-3">
      {done ? (
        <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</span>
      ) : (
        <span className="w-6 h-6 rounded-full border-2 border-gray-300" />
      )}
      <span className={`text-sm flex-1 ${done ? "line-through text-gray-400" : ""}`}>{label}</span>
      {right && <span className="text-[10px] text-gray-400 font-mono">{right}</span>}
    </div>
  );
}

function NavItem({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href?: string }) {
  const className = `flex flex-col items-center gap-0.5 py-1 ${active ? "text-emerald-600" : "text-gray-400"}`;
  const content = (
    <>
      <span className="text-lg">{icon}</span>
      <span className={`text-[10px] ${active ? "font-bold" : ""}`}>{label}</span>
    </>
  );
  return href ? <Link href={href} className={className}>{content}</Link> : <button className={className}>{content}</button>;
}
