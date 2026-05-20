import Link from "next/link";

export default function LunchConfirmed() {
  return (
    <main className="min-h-screen flex flex-col">
      <style>{`
        @keyframes scale-in {
          0% { transform: scale(0); }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .scale-in { animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-5xl text-white mb-6 scale-in shadow-lg">
          ✓
        </div>
        <h1 className="text-2xl font-bold mb-2">예약이 확정됐어요</h1>
        <p className="text-gray-500 text-sm mb-8">B카페 사장님이 수락하셨어요</p>

        <div className="w-full bg-white rounded-2xl p-5 shadow-sm space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-xl">🥗</div>
            <div>
              <h3 className="font-bold text-sm">닭가슴살 샐러드 세트</h3>
              <p className="text-xs text-gray-500">8,500원 · 결제 완료(DEMO)</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
            <Row label="📍 식당" value="B카페 (강남점)" />
            <Row label="🕐 예약 시간" value="오후 12:30" />
            <Row label="🚶 도보" value="약 5분" />
          </div>
        </div>

        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 flex gap-2 items-start">
          <span>💡</span>
          <p className="text-left leading-relaxed">예약 5분 전에 한 번 더 알려드릴게요</p>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-200 grid grid-cols-2 gap-3">
        <Link href="/user/home" className="bg-white border border-gray-200 text-charcoal font-semibold py-3.5 rounded-xl text-center">
          홈으로
        </Link>
        <Link href="#" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl text-center transition">
          길찾기
        </Link>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
