import Link from "next/link";

export default function UserSplash() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center text-white font-bold text-5xl mb-8 shadow-lg">
          L
        </div>
        <h1 className="text-3xl font-bold text-center mb-3">
          Life OS<span className="text-emerald-500">.ONE</span>
        </h1>
        <p className="text-gray-500 text-center leading-relaxed">
          내 일상을 운영체계처럼
          <br />
          다음 한 걸음을 비서가 먼저 챙겨요
        </p>
      </div>
      <div className="px-8 pb-12 space-y-3">
        <Link
          href="/user/signup/account"
          className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 rounded-xl text-center transition"
        >
          3분 만에 시작하기
        </Link>
        <p className="text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-emerald-600 font-semibold">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
