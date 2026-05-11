# Life OS.ONE

> 실생활 데이터 기반 초개인화 AI 생활 운영체계
> 클로즈 베타 데모 D-day: **2026-05-29**

청중이 본인 모바일에서 직접 회원가입·체험하는 hands-on 베타 시연용 웹앱.

## 라이브 URL

- 메인 허브: https://zjoy8841.github.io/loo/
- 정적 시안 (현재 톤): https://zjoy8841.github.io/loo/mockups/
- 정적 시안 (트렌디 안): https://zjoy8841.github.io/loo/mockups-trendy/
- Next.js 풀스택 앱: 추후 Vercel 배포 예정

> GitHub Pages 활성화 후 위 URL이 동작합니다.

## 구조

```
.
├── mockups/          정적 HTML 시안 16 화면 (현재 톤: 아이보리 + 에메랄드 그린)
├── mockups-trendy/   정적 HTML 시안 6 화면 (트렌디 안: 다크 + 그라데이션 + Bento)
├── web/              Next.js 16 + React 19 풀스택 앱 (Vercel 배포 대상)
└── CLAUDE.md         AI 코딩 도구용 부트스트래퍼 (규칙은 노션에 단일 진실 공급원)
```

## 빠른 시작

### 정적 시안 보기

`mockups/index.html` 을 브라우저로 열면 끝. CDN 기반이라 빌드 불필요.

### Next.js 앱 로컬 실행

```bash
cd web
cp .env.example .env.local   # 카카오맵 키 등 채우기
npm install
npm run dev                  # http://localhost:3000
```

자세한 셋업은 [`web/README.md`](./web/README.md) 참조.

## 단일 진실 공급원 (노션)

기획·정책·스펙·Task는 모두 노션에서 관리합니다. 이 리포는 산출물.

- [Life Os One 인덱스](https://www.notion.so/35ac2986e140806fa535f3f609682306)
- [📘 기획서 v3](https://www.notion.so/35bc2986e14081afa9c7e78dac549774)
- [🛠️ 기술 스펙 v1](https://www.notion.so/35cc2986e140819eb86ff32677869776)
- [🔌 API 명세 v1](https://www.notion.so/35cc2986e140810ead70f50e62f50bff)
- [📐 화면 IA + 와이어프레임 v1](https://www.notion.so/35bc2986e14081b09047c9683428ee93)
- [📋 Task Tracker](https://www.notion.so/29e3bfd01388459eb21ccd68651efd82)

## 스택

Next 16 · React 19 · Tailwind v4 · Prisma (계획) · Postgres (계획) · NextAuth (계획) · Socket.io (계획) · Web Speech · Kakao Maps · Anthropic Claude (계획)
