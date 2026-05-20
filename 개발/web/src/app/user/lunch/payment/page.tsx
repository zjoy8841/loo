import Link from "next/link";

export default function LunchPayment() {
  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
        <div className="text-[120px] font-black text-gray-200/80 -rotate-12 select-none">DEMO</div>
      </div>

      <header className="relative px-6 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100 bg-ivory">
        <Link href="/user/lunch" className="text-2xl text-gray-500" aria-label="닫기">✕</Link>
        <h1 className="font-bold">결제</h1>
        <span className="ml-auto px-2 py-0.5 bg-mustard text-white text-xs rounded-full font-bold">DEMO</span>
      </header>

      <div className="relative flex-1 px-6 pt-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl">🥗</div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">닭가슴살 샐러드 세트</h3>
              <p className="text-xs text-gray-500 mt-0.5">B카페 · 12:30 예약</p>
              <p className="font-bold mt-1">8,500원</p>
            </div>
          </div>
        </div>

        <h3 className="text-sm font-bold mb-3">카드 정보</h3>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <CardField label="카드 번호" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-3">
            <CardField label="유효기간" placeholder="MM / YY" />
            <CardField label="CVC" placeholder="123" />
          </div>
          <CardField label="카드 소유자" placeholder="HONG GIL DONG" />
        </div>

        <div className="mt-5 bg-mustard/10 border border-mustard/30 rounded-xl p-3 flex gap-2">
          <span className="text-mustard">⚠️</span>
          <p className="text-xs text-mustard leading-relaxed">데모 환경입니다. 실제 결제는 일어나지 않으며 입력하신 카드 정보도 저장되지 않아요.</p>
        </div>

        <div className="mt-4 mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">결제 금액</span>
          <span className="text-2xl font-bold">8,500원</span>
        </div>
      </div>

      <div className="relative px-6 py-4 border-t border-gray-200 bg-white">
        <Link href="/user/lunch/confirmed" className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition">
          결제하기 (DEMO)
        </Link>
      </div>
    </main>
  );
}

function CardField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-ivory rounded-lg px-3 py-2.5 text-sm border border-gray-200 focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
}
