import Link from "next/link";

export default function Evening() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
        <Link href="/user/home" className="text-2xl text-gray-500">
          ←
        </Link>
        <div className="w-2 h-2 rounded-full bg-lavender" />
        <h1 className="font-bold">🌙 저녁 마무리</h1>
        <span className="ml-auto text-xs text-gray-500 font-mono">19:00</span>
      </header>

      <div className="flex-1 px-6 py-5 space-y-4 pb-8">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🚶</span>
            <h3 className="font-bold">오늘 활동량</h3>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold">5,200</span>
            <span className="text-gray-500 text-sm">걸음 / 목표 7,000</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-lavender rounded-full" style={{ width: "74%" }} />
          </div>
          <p className="text-xs text-gray-500 mt-3">
            목표까지 1,800걸음 더 필요해요
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold mb-1">누구와 함께 드실 건가요?</h3>
          <p className="text-xs text-gray-500 mb-4">분위기에 맞는 메뉴를 추천해드려요</p>
          <div className="grid grid-cols-3 gap-2">
            <button className="py-3 bg-lavender text-white rounded-xl text-sm font-semibold">
              🧘‍♂️ 혼자
            </button>
            <button className="py-3 bg-white border border-gray-200 rounded-xl text-sm">
              👨‍👩‍👧 가족·친구
            </button>
            <button className="py-3 bg-white border border-gray-200 rounded-xl text-sm">
              🍻 회식
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-5xl">
            🍜
          </div>
          <div className="p-5">
            <h3 className="font-bold">조용한 C식당 우동 한 그릇</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              도보 4분 · 점심과 안 겹치는 따뜻한 한 끼
            </p>
            <div className="flex gap-1.5 mt-2">
              <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs rounded font-semibold">
                380kcal
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded font-semibold">
                저자극
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏃</span>
            <h3 className="font-bold">내일은 가볍게 움직여볼까요?</h3>
          </div>
          <div className="bg-lavender/10 rounded-xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-lavender flex items-center justify-center text-2xl">
              🌅
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">아침 산책 30분</p>
              <p className="text-xs text-gray-500 mt-0.5">한강공원 · 출근 전</p>
            </div>
            <button className="px-3 py-1.5 bg-lavender text-white text-xs font-semibold rounded-lg">
              추가
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
