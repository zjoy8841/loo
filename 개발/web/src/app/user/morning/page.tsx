import Link from "next/link";

export default function Morning() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
        <Link href="/user/home" className="text-2xl text-gray-500">
          ←
        </Link>
        <div className="w-2 h-2 rounded-full bg-mustard" />
        <h1 className="font-bold">🌅 아침 브리핑</h1>
        <span className="ml-auto text-xs text-gray-500 font-mono">7:30</span>
      </header>

      <div className="px-6 pt-4 pb-3">
        <div className="bg-mustard/10 border border-mustard/30 rounded-xl p-3 flex items-center gap-3 text-sm">
          <span>🔔</span>
          <span className="flex-1 text-mustard">
            <strong>오전 7:30</strong> · 알림을 확인했어요
          </span>
        </div>
      </div>

      <div className="flex-1 px-6 pt-4 space-y-4 pb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">☁️</span>
            <h3 className="font-bold">오늘 날씨</h3>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold">14°</span>
            <span className="text-gray-500 text-sm">최저 7° · 최고 22°</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <Stat label="강수" value="80%" valueClass="text-blue-500" />
            <Stat label="바람" value="3m/s" />
            <Stat label="미세먼지" value="보통" valueClass="text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📅</span>
            <h3 className="font-bold">오늘 일정</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <span className="text-gray-500 font-mono text-xs pt-1 w-10">
                09:00
              </span>
              <span>출근</span>
            </div>
            <div className="flex gap-3">
              <span className="text-mustard font-mono text-xs pt-1 w-10 font-bold">
                14:00
              </span>
              <span className="font-semibold">클라이언트 미팅 (디자인 리뷰)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">👔</span>
            <h3 className="font-bold">옷차림 추천</h3>
          </div>
          <p className="text-sm leading-relaxed">
            기온차 큰 날이에요. <strong>가벼운 옷차림에 미팅용 자켓</strong>을 챙기세요. 비 확률 높으니 <strong>우산 필수</strong>예요.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Tag label="🧥 자켓" bg="bg-mustard/10" text="text-mustard" />
            <Tag label="☂️ 우산" bg="bg-blue-100" text="text-blue-700" />
            <Tag label="👞 편한 신발" bg="bg-gray-100" text="text-gray-700" />
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg py-2">
      <div className="text-gray-500">{label}</div>
      <div className={`font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}

function Tag({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
}
