<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Life OS.ONE — 프로젝트 컨벤션

> 위 Next.js 자체 안내 외에 이 프로젝트만의 규칙입니다. AI 코딩 도구는 코드 변경 전 이 섹션 먼저 확인.

## 1. 프로젝트 컨텍스트 한 줄

청중이 본인 모바일에서 직접 체험하는 **베타 데모**용 풀스택 웹앱. 기획·정책은 [노션](https://www.notion.so/35ac2986e140806fa535f3f609682306)이 단일 진실 공급원, 이 코드 리포는 그 산출물.

## 2. "use client" 사용 기준

**클라이언트 컴포넌트로**:
- React 훅 (`useState`, `useEffect`)
- Next 클라이언트 훅 (`usePathname`, `useRouter`)
- 브라우저 API (Web Speech, Geolocation, 카카오 SDK)
- 사용자 인터랙션 (클릭으로 setState 등)

**서버 컴포넌트로 (기본)**:
- 정적 콘텐츠
- DB·노션 fetch
- Link 만 사용하는 페이지

회원가입 단계의 칩 토글, AIVoiceFAB의 pathname 체크는 클라이언트. 메인·시점 페이지 대부분은 서버.

## 3. AIVoiceFAB 노출 규칙

`src/components/AIVoiceFAB.tsx`는 `usePathname()`으로 다음 경로에서 자신을 숨깁니다:
- `/user` (Splash)
- `/user/signup/*` (회원가입 7단계)
- `/user/voice` (음성 화면 자체)

새 페이지 추가 시 FAB 노출 여부 검토 → 필요시 위 조건에 추가.

## 4. 디자인 토큰 사용

Tailwind v4 `@theme`로 정의된 커스텀 토큰:
- `bg-ivory`, `text-charcoal`, `bg-mustard`, `bg-lavender`
- alpha 표현 가능: `bg-mustard/10`, `bg-lavender/15`
- emerald·gray·red·blue 등은 Tailwind 기본

새 컬러 추가 시 `globals.css`의 `@theme` 블록 + 노션 [화면 IA v1](https://www.notion.so/35bc2986e14081b09047c9683428ee93) 디자인 시스템 표 둘 다 갱신.

## 5. Mockups 와 동기화

프로젝트 루트의 `../mockups/`에 Tailwind CDN 기반 정적 HTML 시안 16개 (인수인계·관계자 공유용). 디자인을 큰 폭으로 바꾸면:

1. 노션 기획서·디자인 가이드 갱신 (의사결정)
2. `mockups/` HTML 갱신 (시각 시안)
3. `web/` React 컴포넌트 갱신 (구현)

순서를 지키면 *문서 → 시안 → 코드*가 일관됩니다.

## 6. 환경변수

- 클라이언트 노출이 필요한 키만 `NEXT_PUBLIC_` 접두 (예: 카카오맵 JS 키 — 도메인 제한이 보안)
- 서버 전용 (Anthropic·노션 토큰 등)은 접두사 없이
- `.env.local`은 gitignored, `.env.example`은 커밋 — 새 키 추가 시 둘 다 업데이트

## 7. 라우트 구조 한눈에

```
/                                   → /user 리다이렉트
/user                               Splash
/user/signup/{account..interests}   회원가입 7단계
/user/home                          메인 (개인화 허브)
/user/notifications                 알림
/user/voice                         음성 입력 풀스크린
/user/morning|lunch|evening         시점 시나리오
/user/lunch/{payment,confirmed}     점심 결제 흐름
/user/map                           카카오맵 + 가맹점
/merchant                           가맹점 메인
/api/*                              계획 (현재 없음)
```

## 8. 자주 만나는 함정

- **카카오맵이 안 보일 때**: `.env.local`의 `NEXT_PUBLIC_KAKAO_JS_KEY` 확인 → 브라우저 콘솔 → 배포 도메인이라면 [Kakao Developers → JavaScript SDK 도메인] 등록
- **메인 빨간 배지 숫자**: 하드코딩된 `3`. 알림 데이터 모델 셋업 후 동적 바인딩 필요
- **점심 "예약+결제" → 결제 화면**: 현재 단순 Link 흐름. DB 셋업 후 진짜 reservation 생성 + WebSocket 알림으로 변경
- **AI 비서 FAB**: 현재 `/user/voice` Link (mock 화면). LLM 미연결

## 9. 미완료 작업 가이드

다음 큰 작업들은 외부 의존이 있어 별도 세션으로 미뤘습니다:
1. DB (Prisma + 노션 fetch + 시드)
2. API Routes
3. NextAuth ID/PW 로그인
4. Claude API 연결 (`/api/chat`)
5. Web Speech STT/TTS 음성 입력
6. WebSocket 핸드셰이크
7. Vercel 배포

작업 시작 전 노션 [Task Tracker](https://www.notion.so/29e3bfd01388459eb21ccd68651efd82)에서 해당 Task를 In Progress로 갱신.

## 10. 관련 문서

- [Life Os One 노션 인덱스](https://www.notion.so/35ac2986e140806fa535f3f609682306) — 단일 진실 공급원
- [기획서 v3](https://www.notion.so/35bc2986e14081afa9c7e78dac549774)
- [화면 IA v1](https://www.notion.so/35bc2986e14081b09047c9683428ee93)
- [기술 스펙 v1](https://www.notion.so/35cc2986e140819eb86ff32677869776)
- [API 명세 v1](https://www.notion.so/35cc2986e140810ead70f50e62f50bff)
- [README.md](./README.md) — 인간 개발자용 셋업 how-to
