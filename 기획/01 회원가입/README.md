# 회원가입 (U-02) — 작업 진입점

신규 사용자 7단계 회원가입 (account · health · shape · diet · lifestyle · job · interests) + 스플래시.

## 🎯 SSoT 우선순위

화면별 **Figma node-id + 노션 description URL** 포인터는 프로젝트 매니페스트에 통합:
**→ `기획/FIGMA-MANIFEST.md`** (회원가입 8화면 = 스플래시 + U-02-1~7)

순서: **Figma**(화면 설계, 캐노니컬) → **노션 description**(정책·API·DB·zod·ICU·접근성) → **git**(코드 + wireframe 산출물 보존).
셋이 어긋나면 Figma 캐노니컬.

## 📁 폴더 인벤토리

| 폴더 | 내용 | 날짜 |
|---|---|---|
| `v1.0/` | 디자이너 컬러 시안 8장 (Figma 기반) | 2026-05-11 |
| `v0.1/` | 그레이스케일 와이어프레임 + v1.0 5가지 약점 보완 8장 | 2026-05-13 |
| `v0.2/` | v0.1 wireframe + 노션 description Critical 인터랙션 ①~⑧ 캡션 매핑 7장 + index | 2026-05-13 |
| `v0.3/` | Base 화면 1개 + 컴포넌트 단위 인터랙션 fragment N개 (Figma 2-463 구조 정합) 7장 + index | 2026-05-14 |

**최신 = v0.3** — Base + fragment 구조. 시멘틱 색 4종 + 라인 아이콘. Figma 디자이너가 Base 위에 fragment 슬라이스 이식.

## 👨‍💻 개발 Claude 시작 절차

1. **Figma fetch** (위 nodeId 7개) — 화면 + 인터랙션 캡션 확보
2. **노션 description 9 페이지 fetch** — API·DB·검증·접근성·zod·ICU 디테일
3. **git** `web/src/app/user/signup/*/page.tsx` 코드 작업
4. **3 source cross-check** — Figma(what) + 노션(how/why) + git(code)

⚠️ Figma·노션·git 셋이 어긋나면 **Figma가 캐노니컬**. 노션·git을 그에 맞춰 보정.

## 🔗 상위 인덱스

- Life OS ONE_v2 인덱스: https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486
- 코드: `web/src/app/user/signup/*/page.tsx`
- API: `/api/auth/signup`, `/api/auth/email-check`, `/api/auth/[...nextauth]`
- 별도 description 필요: U-02-1-terms (약관 본문) · U-02-SNS (SNS 가입 흐름) · U-02-1-login (로그인 화면)
