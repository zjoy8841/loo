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
| U-02-2 기본정보 (성별·생년월일) | `317:1068` | https://www.notion.so/36fc2986e140815bbb03f517ad8fa76d |
| U-02-3 건강 | `2:510` | https://www.notion.so/35fc2986e140817d8618ffc225ec27f7 |
| U-02-4 체형 | `2:591` | https://www.notion.so/35fc2986e140814aac67f8ebaffe2356 |
| U-02-5 식이/알레르기 | `2:672` | https://www.notion.so/35fc2986e1408110ae35c55a5eac02ff |
| U-02-6 라이프스타일 | `2:753` | https://www.notion.so/35fc2986e140811e9320dce3c64ed9d9 |
| U-02-7 직업 | `2:834` | https://www.notion.so/35fc2986e140810b918dd1623291a72e |
| U-02-8 관심사 | `2:915` | https://www.notion.so/35fc2986e14081708d2bc44b4a3e63ae |

- 노션 description 부모: https://www.notion.so/35fc2986e14081cc9890efbd525ab46d
- U-02 공통 패턴 (SignupContext · 라우팅 가드 · 접근성 · 분석): https://www.notion.so/35fc2986e14081d88fbef8d8763f82d2
- 코드:
  - U-01 스플래시: `web/src/app/user/page.tsx`
  - U-02 회원가입 7단계: `web/src/app/user/signup/*/page.tsx`
- 미작성 description: U-02-1-terms (약관 본문) · U-02-SNS (SNS 가입) · U-02-1-login (로그인)
- git wireframe (활성): `기획/01 회원가입/v0.5/` — v0.4의 성별·생년월일을 신규 U-02-2 기본정보 화면으로 분리. 7단계 → 8단계. 기존 U-02-2~7 → U-02-3~8 ID 시프트. 생년월일은 select 드롭다운(연/월/일), 오늘 이후 차단.
- git wireframe (이력): `기획/01 회원가입/v0.3/` · `v0.4/` 보존.
- **v0.5 신규 필드 근거**: 큐레이션 도메인(U-15) 코호트 추천 + 생일 쿠폰 카드 시연. DB 영향: User 모델에 `gender` (enum) + `birthdate` (Date) 컬럼 추가, Prisma migration 필요.
- **노션 ID 시프트 미정합**: 노션 description 페이지 7개의 URL은 그대로지만 페이지 본문의 "U-02-N XXX" 헤더 표기는 여전히 v0.4 기준 — 다음 라운드 일괄 시프트.

### 02 메인 (U-03) — 화면 2 상태 (active + idle)

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-03 메인 · active (알림 인터럽트) | `70:3216` | https://www.notion.so/366c2986e14081569cafc2b8e64d3893 |
| U-03 메인 · idle (알림 없음) | `70:2751` | https://www.notion.so/366c2986e14081569cafc2b8e64d3893 |

- Figma 페이지 `메인_v1`: `39:9079`
- 같은 노션 description 페이지에 active/idle 두 섹션 (단일 페이지 구조)
- git wireframe: `기획/02 메인/v0.1/` (active + idle 2장 + index)
- 코드: `web/src/app/user/home/page.tsx` + `web/src/components/home/*` (active/idle mode state 분기, 2026-05-20 v0.1 구현)

### 03 알림 (U-04) — 공통 패턴 + 8화면

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-04 공통 패턴 | — | https://www.notion.so/366c2986e14081a9a917c5899c59ca04 |
| U-04-1 알림 센터 | _TBD_ | https://www.notion.so/366c2986e1408123b1b8c7c5e44c8815 |
| U-04-2 알림 도착 | _TBD_ | https://www.notion.so/366c2986e14081a5b96ed963829206ca |
| U-04-3 일정 타임라인 | _TBD_ | https://www.notion.so/366c2986e1408135b227ce031db580d6 |
| U-04-4 생성·편집 폼 | _TBD_ | https://www.notion.so/366c2986e1408151a876dee891b26af4 |
| U-04-5 알림 설정 | _TBD_ | https://www.notion.so/366c2986e140817fab4ff27a01e083ea |
| U-04-6 결과 상세 | _TBD_ | https://www.notion.so/366c2986e14081ad97dfd062c317e953 |
| U-04-7 라이언과 대화 | _TBD_ | https://www.notion.so/366c2986e14081cb8e75f9ff60350754 |
| U-04-8 플랜 풀뷰 | _TBD_ | https://www.notion.so/366c2986e14081d99647d9bb23328a8c |

- git wireframe: `기획/03 알림/v0.3/` (6장) + `v0.31/` (2장)
- Figma node: 사용자가 옮기면 갱신
- 코드 (2026-05-20 v0.1 구현):
  - U-04-1 센터: `web/src/app/user/notifications/page.tsx`
  - U-04-2 도착: `web/src/app/user/notifications/[id]/page.tsx`
  - U-04-3 타임라인: `web/src/app/user/schedule/page.tsx`
  - U-04-4 폼: `web/src/app/user/schedule/new/page.tsx`
  - U-04-5 설정: `web/src/app/user/notifications/settings/page.tsx`
  - U-04-6 결과 상세: `web/src/app/user/notifications/[id]/result/page.tsx`
  - U-04-7 대화: `web/src/app/user/notifications/chat/page.tsx`
  - U-04-8 플랜 풀뷰: `web/src/app/user/plan/[id]/page.tsx`
- mock 데이터: `web/src/lib/notifications/mock.ts`

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
- 코드 (2026-05-20 v0.1 구현):
  - U-05-1 메뉴 상세: `web/src/app/user/order/page.tsx`
  - U-05-2 결제 확인: `web/src/app/user/order/checkout/page.tsx`
  - U-05-3 예약 상태: `web/src/app/user/order/status/page.tsx` (query `?phase=waiting|confirmed|rejected`)
  - U-05-4 결제 실패: `web/src/app/user/order/failed/page.tsx` (query `?variant=method|context`)
  - U-05-5 예약 상세: `web/src/app/user/reservation/[id]/page.tsx` (query `?status=...`)
- 공통: `web/src/components/payment/PaymentHeader.tsx` · `web/src/components/payment/RyanBox.tsx`

#### 구독 결제 (U-14) — 화면 8개 + 공통 패턴

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-14 공통 패턴 | — | https://www.notion.so/366c2986e14081899273e8e940dabf5b |
| U-14-1 마이페이지/구독 | `39:14656` | https://www.notion.so/366c2986e140812bb383e00211f55950 |
| U-14-2 요금제 선택 | `39:14961` | https://www.notion.so/366c2986e14081f6b9a8e8c2f2e08680 |
| U-14-3 결제 확인 | `39:14907` | https://www.notion.so/366c2986e14081b6a5e4df7ffb127011 |
| U-14-4 결제 완료 | `39:14988` | https://www.notion.so/366c2986e14081f6972bf47ab29e3936 |
| U-14-5 구독 관리 | `39:15015` | https://www.notion.so/366c2986e14081d69e92e35942b11f4a |
| U-14-6 구독 해지 | `39:14934` | https://www.notion.so/366c2986e140819f9412ddd0269685d8 |
| U-14-7 결제 실패 | `39:15042` | https://www.notion.so/366c2986e1408133b68ede550466aa73 |
| U-14-8 Paywall | `39:14880` | https://www.notion.so/366c2986e14081849ebace70f33be381 |

- Figma 페이지 `결제_v1`: `39:9011`
- git wireframe: `기획/04 결제/구독/v0.2/`
- 단건 결제(U-05) 컴포넌트·PG·카피 공유

### 05 마이페이지 (U-12) — TBD

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-12 마이페이지 | _TBD_ | _TBD_ |

### 06 에러 — 화면 1 (단일 템플릿) + N 코드 변형

| 화면 | Figma node | 노션 description |
|---|---|---|
| 에러 페이지 (코드별 변형) | _TBD_ | _TBD_ |

- 같은 골격에서 헤드라인·설명·CTA 카피만 코드별로 교체되는 **1 템플릿 · N 코드** 구조. 코드 자체를 큰 숫자로 노출.
- 카탈로그 12종: 400 · 401 · 403 · 404 · 408 · 418 · 429 · 500 · 502 · 503 · 504 · UNKNOWN fallback
- 카피 톤: 위트 헤드라인("서버가 점심 먹으러 갔어요" 등) + 짧은 설명 + hint + CTA. **풀이 박스 X** (시도 후 제거).
- git wireframe: `기획/06 에러/v0.1/index.html` (인덱스 + 대표 화면 404 + 변형 비교 6장 + 카피 카탈로그 표)
- 코드 매핑 (v0.1 범위 외, 개발 라운드 추천): Next.js `app/not-found.tsx`(404) · `app/error.tsx`(500 런타임) · `app/global-error.tsx`(root) — 카탈로그를 props로 받는 단일 컴포넌트로

### 07 웨어러블 — 후속 차수 (6/12 시연 제외)

2026-05-28 회의에서 글래스·워치 모두 6/12 발대식 시연 제외 결정. 산출물(스토리보드 5편 + G-1~G-4 wireframe)은 후속 차수용으로 `기획/07 웨어러블/` 보존. 본 매니페스트 등재는 다음 라운드에서.

### 08 큐레이션 (U-15) — 화면 8개 · 2026-06-12 발대식 시연 신규 트랙

> ⚠️ **화면 ID 정정 (2026-05-29)**: 초안에 U-08로 박았으나 인벤토리 U-08(점심 결제 모달)과 충돌 — U-15로 재번호. 폴더 prefix `08 큐레이션`은 카테고리 8번 도메인 의미로 유지.

> 🔄 **v0.3 확장 (2026-05-29 야간)**: v0.1 5장 → v0.3 8장. 추가 화면: 캘린더 뷰(U-15-5) · 일자 상세(U-15-6) · 뉴스 리스트(U-15-7) · 뉴스 상세(U-15-8). 이모지 → Lucide line 아이콘 전체 교체. v0.1 폴더는 이력 보존.

| 화면 | Figma node | 노션 description |
|---|---|---|
| U-15-1 진입점 (메인 챗봇 UI 시간대 칩 3개) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-2 아침 큐레이션 (+ 관심사 뉴스 + 생일 쿠폰) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-3 점심 큐레이션 (+ 속보) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-4 저녁 큐레이션 (+ 주요 뉴스 + 콘텐츠) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-5 캘린더 뷰 (월/주) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-6 일자 상세 일정 (오전/오후 + 결제 통합) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-7 뉴스 리스트 (카테고리 + 추천) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |
| U-15-8 뉴스 상세 (라이언 한 줄 요약 + 관련 추천) | _TBD_ | https://www.notion.so/36fc2986e1408170bcbfc3e389e9c4c9 |

- **One Big Thing 패턴**: 시간대마다 메인 카드 1장 + 보조 카드 2~3장 (Oura/Gemini/Samsung Now Brief 공통).
- **시간대 전환**: 시연 편의용 morning/noon/evening 버튼 칩 3개. 자동 전환 X.
- **저녁 슬롯 차별 카드**: Fantastical 8 PM trigger 모티브 — "내일 미리보기" + [전체 보기]로 U-15-5 풀스크린 타임라인 전환.
- **회원가입 신규 항목**: 성별 (남/여/선택안함), 생년월일 (YYYY-MM-DD) — U-02-2 (계정/기본정보) 확장. Google Calendar OAuth는 7단계 마지막. 생일 쿠폰 카드(U-15-2)가 생년월일을 받는 명분의 시각화.
- **외부 의존**: Google Calendar API + 날씨 API + 가맹점 DB (1·2단계 트랙 공유) + 뉴스 API (또는 시연 mock 30-50건).
- **역할 분담**: 1·2단계(GPS 알림 + 양방향) 타 팀원 / 3단계(시간대별 큐레이션) 오다환+ClaudeCode.
- **아이콘 시스템**: Lucide line (CDN) · 1.5px stroke · currentColor 상속 (그레이스케일 유지).
- **햄버거 메뉴 통합**: `/menu` → "일정" 항목 → `/user/curation/calendar` (U-15-5)로 도달. UI 별도 작업.
- **03 알림 도메인 통합 가능성**: 기존 `U-04-3 schedule-timeline`은 본 캘린더(U-15-5)로 발전 통합 가능 — 다음 라운드 검토.
- git wireframe (활성): `기획/08 큐레이션/v0.4/` (인덱스 + 8장) — 캘린더 진입 아이콘 헤더 한 단 아래 + 02 아침 [전체 보기]→일자 상세(오늘) + 04 저녁 "내일 미리보기" 카드 = 아침 "오늘 일정" 동일 형식 + 03 점심 [예약]→04 결제 U-05-1
- git wireframe (이력): `기획/08 큐레이션/v0.1/` (5장) · `v0.3/` (8장) 보존
- 회의 근거: `회의록/텍스트파일/260528_LOO 회의_정리.txt` + 2026-05-29 v0.2/v0.3 컨펌
- 코드 (예정): `web/src/app/user/curation/{morning,noon,evening,calendar,calendar/[date],news,news/[id]}/page.tsx` + `web/src/components/home/CurationChips.tsx`

## 👨‍💻 개발 ClaudeCode 시작 절차

1. 이 매니페스트에서 작업할 화면의 **Figma node + 노션 URL** 확인
2. **Figma fetch** (`get_figma_data` with fileKey + nodeId) — 화면 설계 확보
3. **노션 description fetch** — API·DB·검증·접근성·zod·ICU 디테일 확보
4. **git** 코드 작업 (`개발/web/src/app/...`)
5. 셋이 어긋나면 **Figma 캐노니컬**

⚠️ 선결 조건: 개발 환경에 `figma-developer-mcp` MCP + File content:read scope PAT 설정 필요.

---

## 📋 횡단 정책 문서

도메인 화면을 가로지르는 정책. 노션 = SSoT, git markdown = 미러.

| 문서 | 위치 (git) | 노션 원본 | 용도 |
|---|---|---|---|
| 추천 알고리즘 정책 v0.1 | `docs/추천-알고리즘.md` | https://www.notion.so/36fc2986e14081b0898fe14554b43466 | 큐레이션 도메인(U-15)·뉴스·가맹점 추천. 콜드 스타트 + 활동 학습 + 시간 감쇠 + 다양성 + 진화 룰 |

## 🔗 동기화 — 이 정책은 3곳에 박혀 있습니다

**이 파일 / 아래 2곳 중 하나라도 바뀌면 나머지도 함께 갱신할 것:**

1. **이 파일** `기획/FIGMA-MANIFEST.md` — 화면별 포인터 표 (실데이터)
2. **`lifeosone/CLAUDE.md`** — 세션 자동 로드용 포인터 한 줄 ("기획서 참조: 이 파일")
3. **노션 작업 정책 페이지** (`35dc2986e14081eea042fbc2b97b2152`) — "기획서 참조 정책" 섹션

세 곳이 같은 정책을 가리키므로, 한 곳만 고치면 팀원의 ClaudeCode가 어긋난 안내를 받게 됩니다.
