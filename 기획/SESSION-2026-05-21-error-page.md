# SESSION 2026-05-21 — 에러 페이지 v0.1

## 결과물

- `기획/06 에러/v0.1/index.html` (단일 파일, 그레이스케일 wireframe)
- `기획/FIGMA-MANIFEST.md` — "06 에러" 섹션 신규 추가 (Figma node·노션 description은 TBD)

## 구조

1 템플릿 · N 코드 — 같은 골격에서 헤드라인·설명·CTA 카피만 코드별로 교체. 코드 자체(120px 숫자)가 시각 anchor.

한 파일에 다음을 모두 담음:
- 스코프 + 디자인 원칙 (코드 우선 노출 / HTTP 영문 병기 / 위트 ≠ 무책임 / CTA 막다른 길 회피 / 접근성)
- 대표 화면 **404** — Phone 420 + Caption 320, ①~⑤ 인터랙션 매핑 마커 (회원가입 v0.2 wireframe 표준 따름)
- 코드별 변형 비교 — mini phone 6장 (403 · 401 · 500 · 503 · 429 · 418)
- 카피 카탈로그 표 — 12종 + UNKNOWN fallback, **책임 주체**(사용자/서비스/농담) 컬럼 포함
- 후속 정책 추천안 (Next.js 라우트 매핑·ERR-ID·i18n·모션·모달 모드)

## 카탈로그 12종

| 코드 | HTTP 라벨 | 헤드라인 (위트) | 책임 |
|---|---|---|---|
| 400 | BAD REQUEST | 라이언이 못 알아들었어요 | 사용자 |
| 401 | UNAUTHORIZED | 누구세요? 처음 뵙는데요 | 사용자 |
| 403 | FORBIDDEN | 여긴 회원님 자리가 아니에요 | 사용자 |
| 404 | NOT FOUND | 여긴 아무것도 없어요 | 사용자 |
| 408 | TIMEOUT | 너무 오래 기다렸나봐요 | 사용자 |
| 418 | I'M A TEAPOT | 전 주전자라서요 | 농담 |
| 429 | TOO MANY REQUESTS | 잠깐, 숨 좀 돌릴게요 | 사용자 |
| 500 | SERVER ERROR | 서버가 잠깐 졸고 있어요 | 서비스 |
| 502 | BAD GATEWAY | 중간에서 길이 막혔어요 | 서비스 |
| 503 | UNAVAILABLE | 서버가 점심 먹으러 갔어요 | 서비스 |
| 504 | GATEWAY TIMEOUT | 응답이 안 오네요 | 서비스 |
| ? | UNKNOWN | 어… 이거 처음 보는 에러예요 | 미상 |

## 결정 이력 (라운드)

1. **v0.1-r1** — 위트 헤드라인 + 짧은 설명 + hint + CTA + ERR-ID. 라이언 마스코트 tilt 자동 트리거. (초안)
2. **r2** — 하단에 "이 에러가 뭐냐면" 풀이 박스(11px gray-500 border-top) 추가. 대표 화면 + mini phone 6 + 카탈로그 표 컬럼 + ⑤ 인터랙션 마커.
3. **r3** — ⑤ 인터랙션 마커 제거 (풀이 영역은 시각적으로 자명).
4. **r4 (final)** — 풀이 박스 자체 전면 제거. 대표 화면·mini phone·카탈로그 컬럼·스코프 정책 문구까지 일괄 원복. 책임 주체 컬럼만 카탈로그 표에 잔류.

최종 화면 구성: **헤드라인(위트) → 짧은 설명(2줄) → hint(1줄) → CTA → ERR-ID**.

## 그레이스케일 정책 정합

[[feedback_wireframe_grayscale]] 따라 시멘틱·브랜드 컬러 X. 강조는 보더·굵기·코드 숫자 크기로.
[[feedback_planning_dev_doc_separation]] 따라 라우트·zod·API는 wireframe에 박지 않고 "후속 정책 추천안" 섹션에서 개발 라운드로 이양.

## 후속 (개발 라운드)

- Next.js `app/not-found.tsx` (404) · `app/error.tsx` (500 런타임) · `app/global-error.tsx` (root)
- 카탈로그를 props로 받는 단일 `<ErrorScreen code={...}/>` 컴포넌트
- 500번대만 ERR-ID 6자리 생성 + 서버 로그 동일 ID 기록
- i18n 키 `error.{code}.title|description|hint`
- RyanMascot mount 시 tilt 1회 (`prefers-reduced-motion`이면 skip)
- 결제·예약 중간 실패는 BottomSheet에 같은 ErrorScreen 임베드 검토 (U-05 §4 정합)

## 메모 — 메인 추천 로직 문답 (같은 세션 별개 토픽)

사용자 질문 "메인 추천이 로직이야, 더미야?"에 대한 정리:
- **추천 로직**: 진짜 동작 (`web/src/lib/recommendation/recommend.ts` `pickMenuCandidates`). 알레르기 제외 → diet 필터 → healthTags 점수 → user별 deterministic hash. 회원가입 입력값을 바꾸면 결과가 실제로 달라짐.
- **메뉴 풀**: 손코딩 mock 16종 (`menus.ts`). POS·실가맹점 API X.
- **LLM·실시간**: 없음. 인사이트 한 줄은 `now.getHours()` 분기뿐. 캘린더·영양 누적 계산은 v0.2.
- 요약: **"분기는 진짜, 데이터는 더미"**.

이 문답은 메모리 박지 않음 — `recommend.ts`·`menus.ts` 코드에서 직접 읽으면 답이 명확.
