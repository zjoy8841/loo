import Link from "next/link";
import KakaoMap from "@/components/KakaoMap";

const NEAR = [
  { emoji: "🥗", name: "B카페 강남점", category: "카페·샐러드", distance: "도보 5분" },
  { emoji: "🥪", name: "SUBWAY 강남2호점", category: "양식", distance: "도보 7분" },
  { emoji: "🍜", name: "C식당", category: "한식", distance: "도보 4분" },
  { emoji: "🥙", name: "D키친", category: "지중해식", distance: "도보 6분" },
];

export default function MapPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-5 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100 bg-white">
        <Link href="/user/home" className="text-2xl text-gray-500">←</Link>
        <h1 className="font-bold">맛집</h1>
        <span className="ml-auto text-xs text-emerald-600 font-semibold">📍 강남역 인근</span>
      </header>

      <div className="flex-1 relative">
        <div className="absolute inset-0">
          <KakaoMap />
        </div>
      </div>

      <section className="bg-white border-t border-gray-200 max-h-72 overflow-y-auto">
        <div className="px-5 py-3 sticky top-0 bg-white border-b border-gray-100 flex items-center">
          <p className="text-sm font-bold">가까운 가맹점 {NEAR.length}곳</p>
          <span className="ml-auto text-[10px] text-gray-400">DEMO 데이터</span>
        </div>
        <div className="divide-y divide-gray-100">
          {NEAR.map((m) => (
            <div key={m.name} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">{m.emoji}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-gray-500">{m.category} · {m.distance}</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-semibold text-emerald-600">상세</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
