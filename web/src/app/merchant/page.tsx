export default function MerchantHome() {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
            B
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">B카페 (강남점)</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <p className="text-xs text-gray-500">영업 중 · 사장님 김민수</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">
            설정
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-bold mb-4">📥 새 예약 알림</h2>
            <div className="bg-white rounded-2xl p-12 shadow-sm border-2 border-dashed border-gray-200 text-center">
              <div className="text-5xl mb-3 opacity-30">🔔</div>
              <p className="text-gray-500 font-semibold">대기 중</p>
              <p className="text-sm text-gray-400 mt-1">
                새 예약이 들어오면 여기서 바로 알려드려요
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">📅 오늘 예약 현황</h2>
              <span className="text-sm text-gray-500">총 3건</span>
            </div>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <ReservationRow time="11:30" name="김OO · 2명" desc="아메리카노 + 샌드위치 세트" />
              <ReservationRow time="12:00" name="이OO · 1명" desc="닭가슴살 샐러드" />
              <ReservationRow time="13:30" name="박OO · 3명" desc="파스타 세트" last />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold mb-4">📊 오늘 요약</h2>
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <SummaryRow label="예약" value="3" suffix="건" />
              <SummaryRow label="매출" value="38,500" suffix="원" topBorder />
              <SummaryRow label="평균 평점" value="4.7" suffix="/ 5.0" topBorder />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ReservationRow({
  time,
  name,
  desc,
  last,
}: {
  time: string;
  name: string;
  desc: string;
  last?: boolean;
}) {
  return (
    <div
      className={`px-5 py-4 flex items-center gap-4 ${
        last ? "" : "border-b border-gray-100"
      }`}
    >
      <span className="font-mono text-sm text-gray-500 w-14">{time}</span>
      <div className="flex-1">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full font-semibold">
        수락됨
      </span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  suffix,
  topBorder,
}: {
  label: string;
  value: string;
  suffix: string;
  topBorder?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between ${
        topBorder ? "border-t border-gray-100 pt-4" : ""
      }`}
    >
      <span className="text-sm text-gray-500">{label}</span>
      <div>
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-500 ml-1">{suffix}</span>
      </div>
    </div>
  );
}
