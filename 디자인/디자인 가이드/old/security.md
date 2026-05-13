# 보안 가이드

> 담당: **C** · 상태: 스켈레톤

청중 hands-on 시연 환경 + 정식 서비스 준비. 시연 단계라도 **개인정보(이메일·비번)는 실제로 저장**되므로 최소 보안은 필수.

## 1. 인증 · 세션

- **NextAuth.js v5 Credentials Provider** (ID/PW). 세션은 **JWT (httpOnly 쿠키)**.
- 비밀번호는 **bcrypt** hash 10 round. plain 저장 금지.
- `NEXTAUTH_SECRET`: 32-byte base64 (`openssl rand -base64 32`). 노출 금지.
- 로그아웃: `signOut({ callbackUrl: "/user" })`
- 세션 만료: 기본 30일 (조정 가능). 시연 단계는 유지.

## 2. API 라우트 보안

### 인증 가드 (필수)

```ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // ...
}
```

### 권한 가드

- `role === "USER"` vs `role === "MERCHANT"` 분기
- 가맹점 자원 접근 시 `session.user.merchantId === resource.merchantId` 확인

### 입력 검증 — Zod 필수

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
const parsed = schema.safeParse(body);
if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
```

검증 없이 DB에 흘리지 말 것.

## 3. SQL 인젝션 방지

Prisma 사용 시 기본 안전 (parameterized query). **단** `$queryRawUnsafe()` 절대 사용 금지. `$queryRaw` template literal로만.

## 4. XSS 방지

React는 기본 escape. 다만:

- `dangerouslySetInnerHTML` 사용 시 반드시 sanitize (`dompurify` 등)
- 마크다운 렌더링 시 sanitize
- 사용자 입력은 절대 raw HTML로 삽입 X

## 5. CSRF 방지

NextAuth가 기본 보호. `sameSite=lax` 쿠키 + CSRF 토큰. 별도 처리 불필요.

다만 API 라우트에 외부 origin 요청 허용 시 CORS 명시 설정.

## 6. 환경변수 관리

| 카테고리 | 처리 |
|---------|------|
| **클라이언트 노출 가능** | `NEXT_PUBLIC_` 접두 (예: `NEXT_PUBLIC_KAKAO_JS_KEY` — 카카오 도메인 제한이 보안) |
| **서버 전용** | 접두사 없음 (예: `ANTHROPIC_API_KEY`, `NEXTAUTH_SECRET`, `DATABASE_URL`) |
| **개인 머신** | `.env.local` (gitignored) |
| **CI/배포** | Vercel 환경변수 |

`.env` 류 파일은 절대 git에 커밋 X. PR에서 토큰 노출 발견 시 즉시 rotate.

## 7. CORS

Next.js API 라우트는 기본 same-origin. 외부 도메인에서 호출 필요 시:

```ts
// src/middleware.ts
import { NextResponse } from "next/server";
export function middleware(req: Request) {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "https://trusted.com");
  return res;
}
```

시연 단계는 same-origin으로 충분.

## 8. 결제 정보

**저장 안 함**. 시연은 더미 결제만. 정식 서비스 시 PG와 직접 계약, 카드번호는 우리 DB 안 거치고 PG 토큰만 보관.

## 9. 개인정보

- 회원가입 정보: 이메일·이름·비번 hash·태그·일정. **민감 정보(주민번호·정확한 주소·의료 수치 등) 수집 X.**
- 음성 입력: 클라이언트에서 Web Speech로 STT → 텍스트만 서버로. 음성 raw 저장 X.
- 위치: 회의실 wifi 시연 단계는 사용자가 직접 입력. 자동 위치 수집 X.

## 10. 의존성 보안

```bash
npm audit              # 주기적 확인
npm audit fix          # 자동 수정 가능한 것
```

`audit fix --force`는 breaking change 가능 → 신중히.

## 11. 시연 환경 보안

- HTTPS 필수 (Vercel 자동)
- 회의실 wifi 청중 트래픽 분리 (가능하면)
- 데모 가맹점 계정은 시연 후 비번 변경 또는 비활성화
- 시연 데이터 (회원가입 정보)는 시연 후 정리 정책 결정

## 12. 사고 대응

토큰·비번 노출 시:
1. 해당 키 즉시 rotate (Anthropic·Kakao·Supabase 콘솔에서)
2. git history에서 제거 (`git filter-repo` 또는 BFG)
3. force push (사용자 합의 후)
4. 다른 작업자에게 알림

## 13. 작업자별 보안 책임

- **A**: 회원가입·인증 API · `/api/me/*` 권한 가드
- **B**: `/api/chat`에 LLM 키 노출 방지 (서버 측만 사용)
- **C**: DB 권한·API 공통·환경변수 관리·배포 시크릿

---

**채울 차례인 작업자**: C
