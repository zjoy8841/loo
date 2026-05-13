# 📌 2026-05-13 저녁 세션 종료 노트 · 디자인 가이드 v8.0 + 라이언 마스코트 워크플로우

> 같은 날 오전 세션(`SESSION-2026-05-13.md`)은 Figma 8화면 description 작업 → 노션 MCP 등록 완료가 주제.
> 이 저녁 세션은 완전 별개 주제 — **디자인 가이드 v8.0 정식 명세화** + **라이언 마스코트 제작 도구 결정**.
> 다음 세션 첫 메시지에 통째 붙여넣거나 "SESSION-2026-05-13-design-v8.md 읽고 이어가줘"로 참조.

---

## 🎯 다음 세션 첫 액션

> 오다환님이 Recraft Basic ($10/월) + Rive Cadet ($9/월) 결제 완료 → API key 두 개 핸드오버. 그 즉시 MCP 등록(`claude mcp add`) + 라이언 마스터 일러스트 세트 1차 생성 시작 (정면·측면·6 표정·4 포즈 × 풀컬러/모노). 자세한 흐름은 본 노트 § 3 참조.

---

## ✅ 이번 세션 산출물

### 1. 디자인 가이드 v8.0 (정식 명세)

- **`디자인/디자인 가이드/design-guide-v8.0.md`** (24 KB) — 정식 명세, 9 섹션. v7.1 초안을 Apple HIG 공식 페이지 fetch(2026-05-13)로 검증·교정해 정식화
- **`디자인/디자인 가이드/design-guide-v8.0.html`** (58 KB) — 시각 가이드. Light/Dark/High Contrast 라이브 토글, Material 4단계 blur 데모, Dynamic Type 11 스타일 라이브 렌더, 4-mode 컬러 매트릭스

### 2. Apple HIG fetch 자료 (재사용용 별도 패키지)

- **`디자인/Apple-HIG/`** — 다른 프로젝트로 폴더 통째 복사 가능
  - `README.md` — 사용법·인용법·cheat sheet 6건
  - `HIG-fetch-2026-05-13.md` — 정리본 (5개 페이지 사람 검증)
  - `*.json` (9개) — Playwright raw

### 3. 폴더 구조 재정리

```
디자인/
├── Apple-HIG/                       ← 재사용 가능 묶음
├── 디자인 가이드/                    ← 모든 가이드 자산 통합
│   ├── design-guide-v8.0.{md,html}  ← 최종
│   └── old/                         ← v7 본문 + v7.1 초안 보존
└── 라이언 디자인 시안_v.1~v.7.html
```

### 4. v.6 / v.7 시안 신규 생성

- **`디자인/라이언 디자인 시안_v.6.html`** (95 KB) — v.5.1 베이스 + v8.0 토큰 인프라 입힘 (`:root`에 토큰 풀세트, safe-area-top, prefers-reduced-motion, viewport-fit=cover). 4개 시안(SD/MK/PURE 원본/REFINED) 비교
- **`디자인/라이언 디자인 시안_v.7.html`** (90 KB) — v.6에서 PURE 원본 제거. **SD · MK · REFINED 3개만** 유지

---

## 🔑 v7.1 → v8.0 6가지 핵심 교정

1. **WCAG 대비 경계**: `14pt+bold` (W3C 정의) → Apple **17pt 경계** + Bold any-size = 3:1
2. **Material 단계**: 3단계 → **4단계** (`ultraThin` 추가) + Liquid Glass 별도 functional 레이어
3. **컬러 토큰 스키마**: 2-mode → **4-mode** (Default L/D + Increased Contrast L/D)
4. **hex hard-code 비권장**: Apple 공식 caveat 명문화
5. **터치 타깃**: 44×44pt 기본 + **최소 28×28pt** 명시
6. **safe-area**: 픽셀값 검증 → **`env()` 의무화**

---

## 🎨 라이언 마스코트 제작 — 결정된 워크플로우

### 결제 도구 (시연 1개월용, 시연 후 해지 가능)

| 도구 | 플랜 | 비용 |
|---|---|---|
| Recraft | Basic | $10/월 (1,000 credits, 상업 라이선스) |
| Rive | Cadet | $9/월 (.riv export, 3인 협업) |
| **합계** | | **$19/월 (~28,000원)** |

### 보류·폐기 결정

- **HeyGen 보류** — 사람 영상 전용, 라이언(사자) 못 씀. v9 마케팅 영상 시점에 재검토
- **3D AI 등장 시퀀스 폐기** — Rive 단독 불가(2D), iteration 일정 부담. **옵션 C(라이언 → 자비스 링 변형 0.8초 트랜지션)로 대체**
- **Rive 리깅 외주 안 함** — 오다환 직접 학습 (8~12시간, 분산 2~3일)

### 도구 능력 매핑

| 단계 | 도구 | 자동화 |
|---|---|---|
| 일러스트 생성 | Recraft MCP `text-to-image` | ✅ ClaudeCode 자율 |
| SVG 벡터화 | Recraft MCP `vectorize` | ✅ |
| Rive 리깅 (파트 분리 + bone) | Rive Editor (GUI) | ❌ **사람 손 필수** |
| Rive state machine | Rive Editor MCP | ✅ 자연어 생성 |
| React 통합 코드 | ClaudeCode | ✅ |

---

## 📅 D-day 일정 (2026-05-29 시연 기준)

| Day | 작업 | 책임 |
|---|---|---|
| **5/14 (D-15)** | 결제 + MCP 등록 + Recraft 마스터 세트 1차 생성 | ClaudeCode |
| 5/15 (D-14) | 검수 → 1세트 확정 + SVG 벡터화 | 오다환 |
| 5/16 (D-13) | Rive 기초 학습 (Getting Started 영상) | 오다환 |
| 5/17~18 (D-12, 11) | Rive 캐릭터 import + 리깅 + timeline 3개 | 오다환 |
| **5/18 (D-12) 게이트** | 호흡·깜박임·끄덕임 3개 자연스럽지 않으면 → CSS fallback (퀄리티 65% 하향, 일정 지킴) | 결정 |
| 5/19 (D-10) | Rive MCP state machine + React 통합 | ClaudeCode |
| 5/20~24 (D-9~5) | v.7 시안 라이언 박스 적용 + Mode A/B/C 모션 + 옵션 C(자비스 변형) | ClaudeCode |
| 5/25~27 (D-4~2) | 시뮬레이터 테스트 + reduce-motion 대응 | ClaudeCode |
| 5/28 (D-1) | 리허설 | 오다환 |
| **5/29** | **시연** | — |

---

## 📐 v.7 시안의 Apple HIG 적용 정도 (정직 평가)

- **토큰 인프라 레벨**: ✅ 적용됨 — `:root`에 v8.0 토큰 풀세트, safe-area-top, prefers-reduced-motion 등
- **컴포넌트 레벨**: ⚠️ **미적용** — 1500+줄 본문은 v.5.1 시절 hex/픽셀 hard-code 그대로
- 컴포넌트 토큰화 마이그레이션 = v8.0.md § 5 "마이그레이션 룰" 별도 작업
  - 옵션 A: 현재 유지 (시각 변화 없음)
  - 옵션 B: font-size만 Dynamic Type 토큰화 (2~3시간)
  - 옵션 C: 풀 마이그레이션 (6~8시간) — 라이트/다크 토글·Increased Contrast 추종 가능

→ 라이언 마스코트 작업이 우선이면 A 유지, 시연에 다크모드 토글 임팩트 원하면 C. 다음 세션 결정.

---

## 🎯 예상 퀄리티 (정직)

- 외주 디자이너·모션 전문가의 **80~85%** 수준
- 비전문가 청중(베타 사용자): 90% 만족 — 충분히 프로 인상
- 디자인 전문가 청중: 75% 만족 — AI 흔적 약간 보임
- 시연 청중이 클로즈 베타 사용자 + 일반 투자자급이면 충분

### 리스크 3가지 + 백업

1. Recraft 첫 마스터 세트 만족도 미스 → 외주 일러스트레이터 (크몽 ~50만원, 3~5일)
2. Rive 리깅 시간 미스 → CSS 호흡 단순화 fallback (퀄리티 65%)
3. 셰이더 3D AI 등장 — **이미 폐기**, 옵션 C(자비스 변형)로 대체

---

## 🗒️ 사용·결정 기록

- 워크스페이스 글로벌 `CLAUDE.md` "정리하자" 룰에 따라 본 세션 마무리
- 메모리 3건 신규 추가: [project_design_v8](memory/project_design_v8.md), [project_mascot_recraft_rive](memory/project_mascot_recraft_rive.md), [reference_apple_hig](memory/reference_apple_hig.md). `MEMORY.md` 인덱스 갱신
- Apple HIG fetch 자료(`디자인/Apple-HIG/`) = 다른 프로젝트에서도 재사용 가능한 self-contained 묶음으로 분리

---

## 🔗 참조

- [디자인 가이드 v8.0 (md)](디자인/디자인%20가이드/design-guide-v8.0.md)
- [디자인 가이드 v8.0 (html)](디자인/디자인%20가이드/design-guide-v8.0.html)
- [Apple HIG fetch 정리본](디자인/Apple-HIG/HIG-fetch-2026-05-13.md)
- [Apple HIG 폴더 README](디자인/Apple-HIG/README.md)
- [v.7 시안 (SD · MK · REFINED 3개)](디자인/라이언%20디자인%20시안_v.7.html)
- 노션 (활성 — v2 단독 운영): [Life OS ONE_v2 인덱스](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486)

---

**문서 끝.** 다음 세션 — 결제 완료 신호 + API key 핸드오버 시점에 § 3 워크플로우 즉시 실행.
