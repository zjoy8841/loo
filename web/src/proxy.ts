import { NextResponse, type NextRequest } from "next/server";

/**
 * 회원가입·로그인 라우팅 가드.
 *
 * 정책 (description §4 Pattern A 보정안):
 *  - 비로그인 사용자가 보호 경로 진입 → 회원가입 1단계로
 *  - 로그인 사용자가 회원가입 1단계(account) 진입 → 메인으로
 *    (2~7단계는 로그인 후 프로필 보강 단계라 통과)
 *  - 음성·시점·지도 등 사용자 앱 보호 경로 차단
 *
 * 보안 수준: 쿠키 존재만 검사 (데모급).
 * 실제 권한은 각 API route / Server Component가 `auth()`로 다시 검증한다.
 */

const PROTECTED_ROUTES = [
  "/user/home",
  "/user/notifications",
  "/user/voice",
  "/user/morning",
  "/user/lunch",
  "/user/evening",
  "/user/map",
];

const SESSION_COOKIES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

function hasSession(req: NextRequest): boolean {
  return SESSION_COOKIES.some((name) => req.cookies.has(name));
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const signedIn = hasSession(req);

  if (pathname === "/user/signup/account" && signedIn) {
    return NextResponse.redirect(new URL("/user/home", req.url));
  }

  const needsAuth = PROTECTED_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (needsAuth && !signedIn) {
    return NextResponse.redirect(new URL("/user/signup/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/signup/account",
    "/user/home/:path*",
    "/user/notifications/:path*",
    "/user/voice/:path*",
    "/user/morning/:path*",
    "/user/lunch/:path*",
    "/user/evening/:path*",
    "/user/map/:path*",
  ],
};
