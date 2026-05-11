import Link from "next/link";

export default function NotificationsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
        <Link href="/user/home" className="text-2xl text-gray-500">←</Link>
        <h1 className="font-bold">알림</h1>
        <button className="ml-auto text-xs font-semibold text-emerald-600">모두 읽음</button>
      </header>

      <div className="flex-1 px-5 pb-8">
        <section className="mt-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-[10px] font-bold text-red-500 uppercase tracking-wider">지금 · 새 알림</h2>
          </div>
          <Link href="/user/lunch" className="block bg-white rounded-2xl shadow-sm p-4 border-2 border-emerald-500 mb-2.5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">🍽️</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] rounded font-bold">시점 알림</span>
                  <span className="text-[10px] text-gray-400">방금</span>
                </div>
                <p className="font-bold text-sm mt-1.5">점심 시간 — 오늘 뭐 드시고 싶으세요?</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">컨디션 보니 단백질 챙기시면 좋겠어요. 음성으로 메뉴 말씀해보세요</p>
              </div>
            </div>
          </Link>
        </section>

        <section className="mt-6">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">오늘 받은 알림</h2>
          <div className="space-y-2.5">
            <Link href="/user/morning" className="block bg-white rounded-2xl shadow-sm p-4 opacity-70">
              <NotiHeader badge={{ label: "시점 알림", bg: "bg-mustard text-white" }} extra={<span className="text-[10px] text-emerald-600 font-bold">✓ 확인됨</span>} time="7:30" />
              <p className="font-semibold text-sm mt-1.5">아침 브리핑이 도착했어요</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">14° · 비 80% · 자켓 + 우산 챙기세요</p>
            </Link>

            <NotificationCard
              icon="✅"
              iconBg="bg-emerald-50"
              badge={{ label: "미션", bg: "bg-gray-100 text-gray-600" }}
              time="9:42"
              title="잘 하셨어요! 아침 미션 1/4 완료"
              desc="남은 미션 3개 · 물 마시기·산책·저염 메뉴"
            />

            <NotificationCard
              icon="📅"
              iconBg="bg-blue-50"
              badge={{ label: "일정", bg: "bg-blue-100 text-blue-700" }}
              time="10:30"
              title="14:00 클라이언트 미팅 (디자인 리뷰)"
              desc="강남역 · 3시간 30분 후"
            />

            <Link href="/user/evening" className="block bg-white rounded-2xl shadow-sm p-4">
              <NotiHeader badge={{ label: "시점 알림", bg: "bg-lavender text-white" }} extra={<span className="text-[10px] text-gray-500">19:00 예정</span>} />
              <div className="flex items-start gap-3 mt-2">
                <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center text-2xl">🌙</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">저녁 마무리 알림 예정</p>
                  <p className="text-xs text-gray-500 mt-1">동반자 토글 + 메뉴/운동 추천</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">최근 알림</h2>
          <div className="space-y-2.5">
            <NotificationCard
              icon="🎉"
              iconBg="bg-rose-50"
              badge={{ label: "달성", bg: "bg-rose-100 text-rose-700" }}
              time="어제"
              title="7,000걸음 목표 달성! 7일 연속 🔥"
              desc="이번 주 평균보다 12% 높음"
              dim
            />
            <NotificationCard
              icon="📰"
              iconBg="bg-purple-50"
              badge={{ label: "관심사", bg: "bg-purple-100 text-purple-700" }}
              time="어제"
              title="관심 기업 소식: Anthropic Claude 5 출시 임박"
              desc="IT·테크 키워드로 발견됨"
              dim
            />
          </div>
        </section>

        <p className="text-center text-xs text-gray-400 mt-8">알림은 30일간 보관돼요</p>
      </div>
    </main>
  );
}

function NotiHeader({ badge, extra, time }: { badge: { label: string; bg: string }; extra?: React.ReactNode; time?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`px-1.5 py-0.5 text-[10px] rounded font-bold ${badge.bg}`}>{badge.label}</span>
      {extra}
      {time && <span className="text-[10px] text-gray-400 ml-auto">{time}</span>}
    </div>
  );
}

function NotificationCard({
  icon,
  iconBg,
  badge,
  time,
  title,
  desc,
  dim,
}: {
  icon: string;
  iconBg: string;
  badge: { label: string; bg: string };
  time: string;
  title: string;
  desc: string;
  dim?: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 ${dim ? "opacity-70" : ""}`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-2xl`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <NotiHeader badge={badge} time={time} />
          <p className="font-semibold text-sm mt-1.5">{title}</p>
          <p className="text-xs text-gray-500 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}
