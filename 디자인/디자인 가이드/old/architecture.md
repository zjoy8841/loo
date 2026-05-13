# 아키텍처 가이드

> 담당: **C** · 상태: 스켈레톤

## 1. 사용 언어 · 프레임워크

| 영역 | 선택 | 버전 |
|------|------|------|
| 언어 | TypeScript | 5.x |
| 프레임워크 | Next.js (App Router) | 16.2.6 |
| UI | React | 19.2.4 |
| 스타일 | Tailwind CSS | v4 |
| ORM | Prisma | 6.19.3 (v7 회피) |
| DB | SQLite (로컬) → Postgres (배포) | — |
| 인증 | NextAuth.js v5 (Auth.js) | 5.0.0-beta |
| 실시간 | Socket.io | — |
| 패키지 매니저 | npm | 11.x |

## 2. 폴더 구조

```
lifeosone/
├── mockups/                # 정적 HTML 시안 (현재 톤)
├── mockups-trendy/         # 정적 HTML 시안 (트렌디 안)
├── web/                    # Next.js 풀스택 앱
│   ├── src/
│   │   ├── app/
│   │   │   ├── user/       # 사용자 앱 (라이언)
│   │   │   ├── merchant/   # 가맹점 시스템
│   │   │   └── api/        # API 라우트
│   │   ├── components/
│   │   ├── lib/
│   │   │   ├── prisma.ts   # Prisma 싱글톤
│   │   │   ├── enums.ts    # 회원가입 태그 상수
│   │   │   └── persona.ts  # 페르소나 헬퍼
│   │   ├── auth.ts         # NextAuth 설정
│   │   └── types/          # 타입 정의
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── docs/                   # 이 폴더 (가이드 문서)
└── 자료/                   # 가맹점 자료 (xlsx 등, gitignored)
```

## 3. 도메인 경계 (3인 분담)

> 각 작업자는 본인 도메인의 **화면 + 컴포넌트 + API 라우트**까지 직접 담당.

### A: 사용자 온보딩 + 메인
- `src/app/user/page.tsx` (Splash)
- `src/app/user/signup/*`
- `src/app/user/home/`
- `src/app/user/notifications/`
- `src/app/api/auth/*`, `src/app/api/me/*`

### B: 사용자 시점 시나리오
- `src/app/user/{morning,lunch,evening,voice,map}/`
- `src/app/api/chat/` (Claude SDK)
- `src/app/api/reservations/`
- `src/components/KakaoMap.tsx`, Web Speech 훅

### C: 가맹점 + 공통 인프라
- `src/app/merchant/*`
- `src/app/api/merchants/*`, `src/app/api/menus/*`, `src/app/api/inventory/*`
- `src/app/api/socket/` (Socket.io 서버 — Vercel 한계로 별도 호스팅 고려)
- `prisma/schema.prisma`
- 배포·환경변수 설정

## 4. 데이터 흐름

```
[사용자 폰] --(HTTPS)--> [Next.js Server] --(SQL)--> [Postgres]
                              |
                              +--(WebSocket)--> [가맹점 PC]
                              |
                              +--(API)--> [Claude · Kakao]
```

## 5. 모듈 의존성 규칙

- **UI → lib → DB** 단방향. UI에서 직접 Prisma client 호출 금지 (API 경유)
- **공통 enum/타입은 `src/lib/enums.ts` · `src/types/`** 에서 import
- **컴포넌트 간 참조**: 같은 도메인 내 자유, 도메인 외부는 `src/components/` 공통 컴포넌트만

## 6. "use client" 사용 기준

- 클라이언트: useState·useEffect·브라우저 API·이벤트 핸들러
- 서버: 정적 콘텐츠·DB fetch·Link만 사용하는 페이지

자세한 건 `web/AGENTS.md` 참조.

## 7. 빌드·검증

```bash
cd web
npm run dev      # 로컬 개발
npm run build    # 프로덕션 빌드 (배포 전 필수)
npm run lint     # ESLint
```

## 8. 새 화면 추가 시 체크리스트

- [ ] 적절한 도메인 폴더에 위치하는가? (`user/` / `merchant/`)
- [ ] AIVoiceFAB 노출 규칙 갱신 필요한가? (`src/components/AIVoiceFAB.tsx`)
- [ ] DB 모델 변경 → 새 마이그레이션 생성
- [ ] API 라우트 변경 → 보안 가이드 ([security.md](./security.md)) 체크
- [ ] 빌드 통과 후 PR

---

**채울 차례인 작업자**: C
