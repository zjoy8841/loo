# 회원가입 (U-02) — 작업 진입점

신규 사용자 7단계 회원가입 (account · health · shape · diet · lifestyle · job · interests).

## 🎯 SSoT 우선순위

매 세션 시작 시 다음 순서로 fetch:

1. **Figma 화면설계서** (캐노니컬 SSoT) — 디자이너 시안 + 인터랙션 캡션
   - fileKey: `7gay0y94AxMz4Q82dMSdI7`
   - U-02-1 계정: `2:463`
   - U-02-2 건강: `2:510`
   - U-02-3 체형: `2:591`
   - U-02-4 식이/알레르기: `2:672`
   - U-02-5 라이프: `2:753`
   - U-02-6 직업: `2:834`
   - U-02-7 관심사: `2:915`

2. **노션 description** (정책·API·DB·접근성·zod·ICU·테스트)
   - 부모: https://www.notion.so/35fc2986e14081cc9890efbd525ab46d
   - U-02 공통 패턴: https://www.notion.so/35fc2986e14081d88fbef8d8763f82d2
   - U-02-1 계정: https://www.notion.so/35fc2986e1408192b124e0a13ed56469
   - U-02-2 건강: https://www.notion.so/35fc2986e140817d8618ffc225ec27f7
   - U-02-3 체형: https://www.notion.so/35fc2986e140814aac67f8ebaffe2356
   - U-02-4 식이: https://www.notion.so/35fc2986e1408110ae35c55a5eac02ff
   - U-02-5 라이프: https://www.notion.so/35fc2986e140811e9320dce3c64ed9d9
   - U-02-6 직업: https://www.notion.so/35fc2986e140810b918dd1623291a72e
   - U-02-7 관심사: https://www.notion.so/35fc2986e14081708d2bc44b4a3e63ae

3. **git** (이 폴더) — wireframe 산출물 보존 + 코드

## 📁 폴더 인벤토리

| 폴더 | 내용 | 날짜 |
|---|---|---|
| `v1.0/` | 디자이너 컬러 시안 8장 (Figma 기반) | 2026-05-11 |
| `v0.1/` | 그레이스케일 와이어프레임 + v1.0 5가지 약점 보완 8장 | 2026-05-13 |
| `v0.2/` | v0.1 wireframe + 노션 description의 Critical 인터랙션 ①~⑧ 캡션 매핑 7장 + index | 2026-05-13 |

**v0.2 폴더의 캡션 텍스트 = Figma 화면설계서에 들어갈 입력 원본**.

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
