"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AIVoiceFAB() {
  const pathname = usePathname();

  // 회원가입·Splash·Voice 자체 화면 + ChatInputBar에 마이크가 있는 메인 + 결제·예약·알림 흐름에서는 FAB 숨김.
  if (
    pathname === "/user" ||
    pathname.startsWith("/user/signup") ||
    pathname === "/user/voice" ||
    pathname === "/user/home" ||
    pathname.startsWith("/user/order") ||
    pathname.startsWith("/user/reservation") ||
    pathname.startsWith("/user/notifications") ||
    pathname.startsWith("/user/schedule") ||
    pathname.startsWith("/user/plan")
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
