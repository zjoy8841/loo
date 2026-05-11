# Life OS.ONE — Web

> 실생활 데이터 기반 초개인화 AI 생활 운영체계.
> 5/29 클로즈 베타 데모 — 청중이 본인 모바일에서 hands-on 체험.

**프로젝트 개요·기획·정책은 노션이 단일 진실 공급원입니다**:
[Life Os One 인덱스](https://www.notion.so/35ac2986e140806fa535f3f609682306) — 기획서 v3 / 디자인 가이드 / 가맹점 데이터 / 기술 스펙 / API 명세

---

## 빠른 시작 (1시간 안에 로컬 띄우기)

### 사전 요구사항
- **Node.js 20+** (개발은 24.15.0)
- **Git**
- (Windows) PowerShell 실행 정책: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 셋업 5단계

```bash
git clone <repo>
cd lifeosone/web
npm install
cp .env.example .env.local           # 그리고 키 채우기 (아래 표 참조)
npm run dev                          # http://localhost:3000
```

브라우저에서 `http://localhost:3000` → 자동 `/user` Splash 진입.

---

## 환경변수

`.env.local` 파일에 채웁니다 (gitignored). 템플릿은 `.env.example`.

| 키 | 필수 | 설명 | 발급처 |
|---|---|---|---|
| `NEXT_PUBLIC_KAKAO_JS_KEY` | ✅ | 카카오맵 SDK. localhost는 도메인 등록 없이도 동작, 배포 시 도메인 등록 필요 | [Kakao Developers](https://developers.kakao.com) → 내 애플리케이션 → 플랫폼 키 → JavaScript 키 |
| `NOTION_TOKEN` | ⏳ 계획 | 가맹점/메뉴 DB 빌드타임 fetch | [노션 Integrations](https://www.notion.so/my-integrations) |
| `NOTION_MERCHANT_DS_ID` | ⏳ | Merchant data source ID | 노션 SPEC 페이지 참조 |
| `NOTION_MENU_DS_ID` | ⏳ | Menu data source ID | 노션 SPEC 페이지 참조 |
| `ANTHROPIC_API_KEY` | ⏳ | Claude API (LLM·음성 비서) | [console.anthropic.com](https://console.anthropic.com) |
| `NEXTAUTH_SECRET` | ⏳ | 세션 서명 | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | ⏳ | 베이스 URL | 로컬 `http://localhost:3000` |
| `DATABASE_URL` | ⏳ | Prisma 연결 문자열 | 로컬 `"file:./dev.db"` |

`⏳` 항목은 다음 단계(DB·인증·LLM·실시간)에서 사용. 현재 카카오 키만 있어도 UI 전체가 동작.

---

## 기술 스택 한눈에

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 16.2.6 (App Router, TS) | **Next 16 + React 19** 새 버전. `AGENTS.md` 주의 |
| 스타일 | Tailwind CSS v4 | `tailwind.config` 파일 없음. `globals.css`의 `@theme` |
| 폰트 | Pretendard Variable (CDN) | `layout.tsx`의 `<link>` |
| ORM (계획) | Prisma + SQLite → Postgres | |
| 인증 (계획) | NextAuth.js (Credentials) | 소셜 로그인은 UI만 |
| 실시간 (계획) | Socket.io | 사용자 ↔ 가맹점 핸드셰이크 |
| 음성 | Web Speech API | 외부 키 X |
| 지도 | Kakao Maps SDK | `components/KakaoMap.tsx` 동적 SDK 로드 |
| LLM (계획) | Claude API | Anthropic SDK |
| 노션 fetch (계획) | `@notionhq/client` | 빌드타임 시드 |
| 배포 | Vercel | Next 표준 |

전체 결정 사유는 노션 [기술 스펙 v1](https://www.notion.so/35cc2986e140819eb86ff32677869776).

---

## 폴더 구조

```
web/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                  # 루트 (Pretendard, viewport)
│  │  ├─ globals.css                 # Tailwind v4 @theme 토큰
│  │  ├─ page.tsx                    # / → /user
│  │  ├─ user/
│  │  │  ├─ layout.tsx               # AIVoiceFAB 포함
│  │  │  ├─ page.tsx                 # U-01 Splash
│  │  │  ├─ signup/{account..interests}/page.tsx   # 7단계
│  │  │  ├─ home/page.tsx            # 메인 (개인화 허브)
│  │  │  ├─ notifications/page.tsx
│  │  │  ├─ voice/page.tsx           # 음성 입력 풀스크린
│  │  │  ├─ morning|lunch|evening/page.tsx
│  │  │  ├─ lunch/{payment,confirmed}/page.tsx
│  │  │  └─ map/page.tsx             # 카카오맵 + 가맹점 리스트
│  │  └─ merchant/page.tsx           # 가맹점 메인
│  └─ components/
│     ├─ AIVoiceFAB.tsx              # 마이크 FAB (pathname 체크)
│     └─ KakaoMap.tsx                # 카카오 SDK 동적 로드
├─ public/
├─ .env.local                        # gitignored
├─ .env.example                      # 템플릿 (커밋됨)
├─ AGENTS.md / CLAUDE.md             # AI 코딩 도구용 메타
├─ next.config.ts
├─ tsconfig.json
└─ package.json
```

흐름: Splash → 회원가입 7단계 → 메인 → (시점 알림 / 음성 / 맛집) → 시나리오.

---

## 디자인 시스템

`src/app/globals.css`의 `@theme`로 토큰 정의 (Tailwind v4 표준):

```css
@theme {
  --color-ivory: #FAF7F0;       /* 바탕 */
  --color-charcoal: #1F2937;    /* 본문 */
  --color-mustard: #F59E0B;     /* 아침 시점 */
  --color-lavender: #8B5CF6;    /* 저녁 시점 */
  --font-sans: "Pretendard Variable", system-ui, sans-serif;
}
```

사용 예: `bg-ivory`, `text-charcoal`, `bg-mustard/10`. emerald·gray·red 등은 Tailwind 기본.

전체 디자인 가이드는 노션 [📐 화면 IA + 와이어프레임 v1](https://www.notion.so/35bc2986e14081b09047c9683428ee93).

---

## mockups/ 와의 관계

프로젝트 루트의 `mockups/`는 **Tailwind CDN 기반 정적 HTML 디자인 시안**입니다 (16개 화면 + 가맹점 2개). 검토·인수인계·관계자 공유용.

- 디자인 변경 시 **둘 다 갱신** 권장 (노션 기획서 → mock → 코드 순서)
- mockups는 React 의존 없이 브라우저에서 직접 열림 — `mockups/index.html` 시작
- 코드(`web/`)와 mockups의 디자인이 1:1 동일하지 않을 수 있음 (코드는 동작 우선, mock은 시안 우선)

---

## 배포 (Vercel)

```bash
npm i -g vercel
vercel                               # 로그인 + 프로젝트 연결
# 환경변수는 Vercel 대시보드 → Settings → Environment Variables
vercel --prod
```

배포 도메인이 정해지면 [Kakao Developers → 플랫폼 키 → JavaScript SDK 도메인]에 추가.

---

## 다음 작업 (현재 미완료)

1. **DB 셋업** — Prisma 스키마 + 노션 가맹점 fetch + 시드
2. **API Routes** — `/api/chat`(LLM), `/api/merchants`, `/api/reservations`, `/api/socket`
3. **NextAuth** — ID/PW 로그인
4. **Claude API 연결** — 음성 입력 → STT → `/api/chat` → 응답 → TTS
5. **WebSocket** — 사용자/가맹점 실시간 핸드셰이크
6. **Vercel 배포** + 도메인

자세한 계획은 노션 [기술 스펙 v1 § 8](https://www.notion.so/35cc2986e140819eb86ff32677869776).

---

## 도움이 필요할 때

- 기획·UX 결정 → 노션 [기획서 v3](https://www.notion.so/35bc2986e14081afa9c7e78dac549774)
- 화면별 디자인 → 노션 [화면 IA v1](https://www.notion.so/35bc2986e14081b09047c9683428ee93) + `mockups/` 폴더
- API/스펙 → 노션 [API 명세 v1](https://www.notion.so/35cc2986e140810ead70f50e62f50bff)
- AI 코딩 도구 사용 시 → `AGENTS.md` 먼저 확인
