import Link from "next/link";

export default function Lunch() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 pt-6 pb-4 flex items-center gap-3 border-b border-gray-100">
        <Link href="/user/home" className="text-2xl text-gray-500">
          ←
        </Link>
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <h1 className="font-bold">🍽️ 점심 추천</h1>
        <span className="ml-auto text-xs text-gray-500 font-mono">12:00</span>
      </header>

      <div className="flex-1 px-5 py-5 space-y-3">
        <div className="text-center text-xs text-gray-400 mb-2">
          — 오늘 12:00 —
        </div>

        <Bubble role="ai">
          오늘 컨디션 보니{" "}
          <span className="bg-mustard/20 px-1 rounded">콜레스테롤</span> 신경쓰고
          계시죠. 메뉴 생각해두신 거 있어요?
        </Bubble>

        <Bubble role="user">🎤 삼겹살</Bubble>

        <Bubble role="ai">
          필 받으셨군요 ㅎㅎ <strong>네버엔딩 다이어터</strong>시잖아요. 오늘은{" "}
          <strong>단백질 중심</strong>으로 가시고, 삼겹살은 주말로 미루실래요?
        </Bubble>

        <MenuCard
          best
          emoji="🥗"
          gradient="from-emerald-100 to-emerald-200"
          name="닭가슴살 샐러드 세트"
          place="B카페 · 도보 5분 · 평점 4.7"
          tags={[
            { label: "420kcal", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "단백질 38g", bg: "bg-blue-50", text: "text-blue-700" },
            { label: "저염", bg: "bg-orange-50", text: "text-orange-700" },
          ]}
          price="8,500원"
        />

        <Bubble role="ai">
          아니면 빨리 드실 거면 <strong>서브웨이</strong>도 괜찮아요. 단백질 챙기면서 15분 안에 끝나요 👇
        </Bubble>

        <MenuCard
          emoji="🥪"
          gradient="from-yellow-100 to-amber-200"
          name="스테이크 & 치즈 (15cm)"
          place="SUBWAY 강남2호점 · 도보 7분 · 평점 4.5"
          tags={[
            { label: "380kcal", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "단백질 23g", bg: "bg-blue-50", text: "text-blue-700" },
            { label: "⚡ 15분 컷", bg: "bg-purple-50", text: "text-purple-700" },
          ]}
          price="7,900원"
        />
      </div>

      <div className="px-5 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button className="text-gray-400 text-xl px-2">⌨️</button>
          <div className="flex-1 bg-emerald-50 rounded-full px-4 py-3 flex items-center gap-2">
            <span className="text-sm text-emerald-700 font-semibold">
              말씀하세요...
            </span>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-1 h-3 bg-emerald-500 rounded-full" />
              <span className="w-1 h-4 bg-emerald-500 rounded-full" />
              <span className="w-1 h-2 bg-emerald-500 rounded-full" />
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl shadow-lg">
            🎤
          </button>
        </div>
      </div>
    </main>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "ai" | "user";
  children: React.ReactNode;
}) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-emerald-500 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm max-w-[80%]">
          <p className="text-sm">{children}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2 items-end">
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm flex-shrink-0">
        L
      </div>
      <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm max-w-[80%]">
        <p className="text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function MenuCard({
  best,
  emoji,
  gradient,
  name,
  place,
  tags,
  price,
}: {
  best?: boolean;
  emoji: string;
  gradient: string;
  name: string;
  place: string;
  tags: { label: string; bg: string; text: string }[];
  price: string;
}) {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm flex-shrink-0">
        L
      </div>
      <div className="relative bg-white rounded-2xl rounded-bl-sm shadow-sm max-w-[90%] overflow-hidden">
        {best && (
          <div className="absolute top-2 left-3 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full z-10">
            베스트 매치
          </div>
        )}
        <div
          className={`aspect-video bg-gradient-to-br ${gradient} flex items-center justify-center text-5xl`}
        >
          {emoji}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-base">{name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{place}</p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {tags.map((t) => (
              <span
                key={t.label}
                className={`px-2 py-0.5 ${t.bg} ${t.text} text-xs rounded font-semibold`}
              >
                {t.label}
              </span>
            ))}
          </div>
          <p className="text-lg font-bold mt-3">{price}</p>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Link
              href="/user/lunch/payment"
              className={`col-span-2 ${
                best
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              } font-semibold py-2.5 rounded-lg text-sm transition text-center`}
            >
              예약 + 결제
            </Link>
            <button className="bg-white border border-gray-200 text-gray-500 font-semibold py-2.5 rounded-lg text-xs">
              {best ? "원래 선택" : "자세히"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
