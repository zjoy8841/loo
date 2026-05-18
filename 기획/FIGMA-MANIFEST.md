# 📍 FIGMA-MANIFEST — 기획서 참조 진입점

> **이 파일은 "주소록"입니다.** 실제 기획 내용은 여기 없습니다.
> 화면별로 **① Figma node**(화면 설계 — 레이아웃·텍스트·색·치수)와
> **② 노션 description**(정책 — API·DB·zod·ARIA·동작 시퀀스) **포인터만** 들고 있습니다.
>
> 개발 ClaudeCode는 이 표에서 화면 → node-id / URL을 찾아 **Figma·노션을 핀포인트로 직접 참조**합니다.
> git에 기획 내용을 미러링하지 않습니다 (Figma에서 수정되면 미러는 즉시 옛 것이 되므로).

## 🎯 SSoT 우선순위

**Figma > 노션 > git.** 셋이 어긋나면 Figma가 캐노니컬. 노션·git을 그에 맞춰 보정.

- **Figma** = 화면 설계 (what — 어떻게 생겼나)
- **노션 description** = 정책 본체 (how/why — 어떻게 동작하나: API·DB·zod·ICU·접근성·테스트)
- **git** = 코드 + 이 매니페스트(포인터) + wireframe 산출물 보존

## 🔑 Figma 파일

- fileKey: `7gay0y94AxMz4Q82dMSdI7` (LIFE OS ONE_사용자 APP)
- 화면설계서 페이지 노드: `1:18`

## 📋 화면별 포인터

### 01 회원가입 (U-02) — 화면 8개

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-01 스플래시 | `1:211` | https://www.notion.so/35fc2986e140810593dcd80f2786e026 |
| U-02-1 계정 | `2:463` | https://www.notion.so/35fc2986e1408192b124e0a13ed56469 |
| U-02-2 건강 | `2:510` | https://www.notion.so/35fc2986e140817d8618ffc225ec27f7 |
| U-02-3 체형 | `2:591` | https://www.notion.so/35fc2986e140814aac67f8ebaffe2356 |
| U-02-4 식이/알레르기 | `2:672` | https://www.notion.so/35fc2986e1408110ae35c55a5eac02ff |
| U-02-5 라이프스타일 | `2:753` | https://www.notion.so/35fc2986e140811e9320dce3c64ed9d9 |
| U-02-6 직업 | `2:834` | https://www.notion.so/35fc2986e140810b918dd1623291a72e |
| U-02-7 관심사 | `2:915` | https://www.notion.so/35fc2986e14081708d2bc44b4a3e63ae |

- 노션 description 부모: https://www.notion.so/35fc2986e14081cc9890efbd525ab46d
- U-02 공통 패턴 (SignupContext · 라우팅 가드 · 접근성 · 분석): https://www.notion.so/35fc2986e14081d88fbef8d8763f82d2
- 코드: `web/src/app/user/signup/*/page.tsx`
- 미작성 description: U-02-1-terms (약관 본문) · U-02-SNS (SNS 가입) · U-02-1-login (로그인)

### 02 메인 (U-03) — TBD

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-03 메인 | _TBD_ | _TBD_ |

### 03 알림 (U-04) — TBD

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-04 알림 | _TBD_ | _TBD_ |

### 04 결제 — 단건 (U-05) v1, 구독 TBD

#### 단건 결제 (U-05) — 화면 5개 + 공통 패턴

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-05-1 메뉴 상세 | `39:11205` | https://www.notion.so/364c2986e140814d8b80c2b89c2d783d |
| U-05-2 결제 확인 | `39:11585` | https://www.notion.so/364c2986e14081478c7ae6194e5139f7 |
| U-05-3 예약 상태 (수락 대기/확정/거절) | `39:11809` | https://www.notion.so/364c2986e140816fb419f5861d0ebbd3 |
| U-05-4 결제 실패 | `39:12212` | https://www.notion.so/364c2986e140816ea4d4f35887f2c096 |
| U-05-5 예약 상세 | `39:12794` | https://www.notion.so/364c2986e14081a1bb7ad1593e33009e |

- Figma 페이지 `결제_v1`: `39:9011`
- U-05 공통 패턴 (라이언 박스·영수증·환불 박스·PG 오버레이·슬롯 그리드·상태 머신·다국어·접근성): https://www.notion.so/364c2986e14081d6980ade96f86c561c
- git wireframe: `기획/04 결제/단건/v0.2/` (시니어 검토 라운드 1)

#### 구독 결제 — TBD

| 화면 | Figma node | 노션 description |
|---|---|---|
| 마이페이지 / 요금제 / 결제 확인 / 결제 완료 / 구독 관리 / 해지 / 결제 실패 / Paywall | Figma `결제_v1` 페이지 노드 박힘 (`39:14656`/`14961`/`14907`/`14988`/`15015`/`14934`/`15042`/`14880`) | _TBD_ — 단건 패턴 그대로 작성 예정 |

- git wireframe: `기획/04 결제/구독/v0.2/`

### 05 마이페이지 (U-12) — TBD

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-12 마이페이지 | _TBD_ | _TBD_ |

## 👨‍💻 개발 ClaudeCode 시작 절차

1. 이 매니페스트에서 작업할 화면의 **Figma node + 노션 URL** 확인
2. **Figma fetch** (`get_figma_data` with fileKey + nodeId) — 화면 설계 확보
3. **노션 description fetch** — API·DB·검증·접근성·zod·ICU 디테일 확보
4. **git** 코드 작업 (`web/src/app/...`)
5. 셋이 어긋나면 **Figma 캐노니컬**

⚠️ 선결 조건: 개발 환경에 `figma-developer-mcp` MCP + File content:read scope PAT 설정 필요.

---

## 🔗 동기화 — 이 정책은 3곳에 박혀 있습니다

**이 파일 / 아래 2곳 중 하나라도 바뀌면 나머지도 함께 갱신할 것:**

1. **이 파일** `기획/FIGMA-MANIFEST.md` — 화면별 포인터 표 (실데이터)
2. **`lifeosone/CLAUDE.md`** — 세션 자동 로드용 포인터 한 줄 ("기획서 참조: 이 파일")
3. **노션 작업 정책 페이지** (`35dc2986e14081eea042fbc2b97b2152`) — "기획서 참조 정책" 섹션

세 곳이 같은 정책을 가리키므로, 한 곳만 고치면 팀원의 ClaudeCode가 어긋난 안내를 받게 됩니다.
