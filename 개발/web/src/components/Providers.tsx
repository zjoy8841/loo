"use client";

import { SessionProvider } from "next-auth/react";

// 회원가입·로그인 흐름에서 client-side signIn() 호출이 필요해
// SessionProvider로 트리 전체를 감쌉니다.
// 서버 컴포넌트에서는 직접 auth()를 호출해도 OK (둘은 독립).
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
