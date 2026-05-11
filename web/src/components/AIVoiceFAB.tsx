"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AIVoiceFAB() {
  const pathname = usePathname();

  // 회원가입·Splash·Voice 자체 화면에서는 FAB 숨김.
  if (
    pathname === "/user" ||
    pathname.startsWith("/user/signup") ||
    pathname === "/user/voice"
  ) {
    return null;
  }

  return (
    <Link
      href="/user/voice"
      aria-label="AI 비서에게 말하기"
      className="fixed bottom-20 right-5 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-lg shadow-emerald-500/40 flex items-center justify-center text-2xl transition z-50"
    >
      <span aria-hidden>🎤</span>
    </Link>
  );
}
