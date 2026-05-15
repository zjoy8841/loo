# 📌 2026-05-15 세션 결과 노트 · Claude Design v7·v8 + 11 시안 비교 보드

> **다음 세션 첫 메시지에 "SESSION-2026-05-15-claude-design-comparison.md 읽고 이어가줘"라고 하면 됩니다.**
> 같은 날짜 다른 세션 노트:
> - `SESSION-2026-05-15-design-quality.md` — A·B 방향 비교 (오전)
> - `SESSION-2026-05-15-ios-hig-iteration.md` — Stitch v6 10회 iteration (이 세션 전반부)
> - 이 노트 (이 세션 후반부) — Claude Design 도구 전환 + v7·v8 + _compare 통합 보드

---

## 🎯 다음 세션 첫 액션

> **사용자 결정 대기**: 11 시안 (v6.10 + v7 5개 + v8 5개) 시각 검수 끝. 다음 단계는 사용자가 보고 자리(`_compare/index.html` 더블클릭)에서 검토 후 결정.
>
> 결정 옵션:
> 1. **1개 골라서 web/ 통합** — React 의존성 제거 후 Next.js 컴포넌트로 이식
> 2. **2-3개 골라 Claude Design에서 더 다듬기** — 세부 수정 후 재핸드오프
> 3. **v9 한 번 더** — 제3 방향(예: 포스트-디지털 브루탈리즘 / 다른 회귀)
> 4. **보존 + 다른 화면 작업** — 알림·결제·마이페이지 등을 Claude Design으로

---

## 📋 이번 세션 후반 한 일

전제: v6 작업 정리 후, 사용자 "이번에는 스티치가 아니라 Claude Design으로 만들어보자"로 도구 전환.

### Claude Design 도구 전환

`https://claude.ai/design` (Anthropic Labs, 2026-04-17 출시) — Opus 4.7 기반 디자인 도구. 라이브 HTML 프로토타입 + **공식 핸드오프 to Claude Code** 기능. 사용자가 claude.ai 웹 인터페이스에서 직접 운전 (MCP·API 없음).

**워크플로우 확정** (재사용 가능):
1. 사용자가 brief를 claude.ai/design에 paste
2. 12개 질문 답변
3. 결과 받으면 우상단 Share → "Handoff to Claude Code..." → "Send to local coding agent"
4. 명령(`Fetch this design file ... https://api.anthropic.com/v1/design/h/<TOKEN>?open_file=index.html`) Copy
5. ClaudeCode 채팅에 paste
6. ClaudeCode가 WebFetch로 가져옴 (gzip 번들 ~50KB) → tar -xzf로 풀기 → 분석·통합

→ [[reference_claude_design_handoff]]

### v7 — Claude Design 첫 시도 (따뜻 톤)

폴더: `디자인/추가 시안/메인_ClaudeDesign_v7/`
- `brief.md` — 제가 만든 입력 (앱 정체성·페르소나·기능, "어떻게/콘텐츠/금지" 다 빼고 "무엇" 집중)
- `handoff.tar.gz` — 원본 50KB
- `extracted/life-os-one/project/` — React 프로토타입 풀세트
  - `index.html`, `single.html` (제가 만든 시안 단독 마운트), `variations.jsx`, `shared.jsx`, `ios-frame.jsx`, `design-canvas.jsx`, `tweaks-panel.jsx`
  - `chats/chat1.md` — 12 질문 답변·디자인 시스템 선언 흐름

**디자인 시스템 (자동 선언)**:
- Warm cream `#FAF6EF` + 시점별 그라데이션 (peach/sand/dusk)
- Pretendard 메인 + Noto Serif KR (D만)
- 페르소나: **서연** · 디자이너 (성수) · 글루텐 민감 · 한강 러닝
- 마스코트: placeholder만 (LionMark — radial gradient + dashed border + "라이언 일러스트" 캡션)

**5 시안**:
| | 한 줄 |
|---|---|
| A · Soft Stack | 익숙한 카드 베이스라인, hero + 2×2 보조 |
| B · Conversation | 시간 누적 타임라인 — "라이언이 옆에서 한 일" |
| C · Orbit Focus | 정중앙 원형 hero + 위성 chip 4개 |
| D · Editorial | 편지 톤, "AI가 아니라 옆사람" |
| E · Card Fan | 부채형 3장 — 점심 추천 메타포 |

**살아있는 인터랙션**: VoiceDock → 풀스크린(listen→think) / LunchSheet 3 phase (list→reserving→confirmed).

### v8 — 정반대 방향 강제 (정갈 톤 + 음성 메인)

`brief.md`에 한 줄 추가:
> *음성이 메인. 카드가 아니라 음성 인터랙션이 화면의 중심. 마스코트는 음성 파형 / 광원 자체. 카드형 레이아웃 회피.*

폴더: `디자인/추가 시안/메인_ClaudeDesign_v8/`
- 같은 구조 + `app.jsx` (분리됨), `lion-shared.jsx` (이름 변경), `.design-canvas.state.json`

**디자인 시스템 (완전히 다름)**:
- Off-white **`#F4F1EC`** (정갈) + **단색 액센트** — 테라코타 `#C8722A` · 포레스트 `#5B7C5A` · 브릭 `#A14242`
- **Noto Serif KR (디스플레이) + Pretendard (본문) + JetBrains Mono + Spectral** — 세리프 적극
- 페르소나: **지원** (Tweaks로 변경 가능) · UX 디자이너 · 글루텐 줄이는 중 · 식물·사이클링 · PersonaStrip 컴포넌트로 명시 가능
- 마스코트: **5종 다른 추상도** — LionFace · LionMonogram · LionOrb · LionLine · LionWordmark
- 탭바: **4개** (홈·맛집 지도·채팅·나) — 라이언 별도 탭 없음, voice pill로
- Primary time: **아침** (v7은 점심)

**5 시안**:
| | 한 줄 · 마스코트 |
|---|---|
| A · Quiet Brief | 미니멀 에디토리얼, 카드 1장 · Wordmark |
| B · Companion | 사자 캐릭터 + 말풍선 인사 · LionFace |
| C · Single Focus | 포스터형 큰 세리프 헤드라인 · Monogram |
| D · Editorial | 신문 마스트헤드 + 컬럼 · LionLine |
| **E · Presence (Dark)** | **다크 모드 + 빛나는 오브 + 음성 중심** · LionOrb ← **강제 방향 결실** |

### _compare 보드 — 보고용 단일 HTML

폴더: `디자인/추가 시안/_compare/`
- `index.html` — 마스터 (한 파일!) — 11 iframe grid (다크 테마, 그룹 헤더, lazy load)
- `v6_10.html` (v6 시리즈 best 복사)
- `v7_A.html ~ v7_E.html` — self-contained (모든 jsx 인라인, ~71KB each)
- `v8_A.html ~ v8_E.html` — self-contained (~85KB each)

**작동**: `index.html` 더블클릭만 하면 file:// 환경에서도 11 시안 한 화면에 다 보임. React+Babel·Pretendard·Noto·Spectral CDN 의존만 (인터넷 필요). 인터랙션도 작동.

---

## 🔑 핵심 결론 — 다음 세션 알아야 할 것

1. **Claude Design > Stitch** (이 프로젝트 기준) — 한국어 보존도, 페르소나·콘텐츠 정확도, 마스코트 표현, 디자인 시스템 선언 모두 우월. Stitch의 mojibake / 콘텐츠 회귀 / DOM 패치 비영속 등의 함정 없음. → [[project_main_v7_v8_claude_design]]
2. **공식 핸드오프 워크플로우 확립** — Share → Handoff → Send to local agent → command paste. WebFetch로 50KB gzip 받아 tar -xzf. → [[reference_claude_design_handoff]]
3. **v7·v8 모두 "동일 brief에서 정반대 결과 강제 가능"** — brief 끝에 한 줄 박는 방식 효과 검증.
4. **single.html 패턴** — 시안별 단독 검수용 harness HTML 작성법 (URL 파라미터로 v=1..5, time=morning/lunch/evening 전환). v9 이후 시안들도 같은 방식으로 단독 검수 가능.
5. **_compare 마스터 HTML 패턴** — file:// 더블클릭으로 다 보이는 보고 자료. 모든 코드 인라인 + iframe grid. 미래 비교 보드도 같은 패턴 재사용.
6. **결정 미정 — SSoT 후보**: v6.10, v7 A·B·D, v8 A·D·E (특히 E Dark Orb는 차별화 강함). 사용자가 보고 자리에서 결정.

---

## 🗂 활성 산출물

```
디자인/추가 시안/
├── 메인_iOS_HIG_v6/        (Stitch · iOS HIG · 10회 iteration)
│   ├── README.md
│   ├── iterations/v6.1.html ~ v6.10.html
│   ├── renders/v6.1.png ~ v6.10.png
│   └── critique/v6.1.md ~ v6.10.md
├── 메인_ClaudeDesign_v7/    (Claude Design · 따뜻 톤)
│   ├── brief.md · handoff.tar.gz
│   └── extracted/life-os-one/...
├── 메인_ClaudeDesign_v8/    (Claude Design · 정갈 톤 + 음성 강제)
│   ├── brief.md · handoff.tar.gz
│   └── extracted/life-os-one-v2/...
└── _compare/                ⭐ 보고용 — index.html 더블클릭
    ├── index.html           (마스터)
    ├── v6_10.html
    ├── v7_A.html ~ v7_E.html
    └── v8_A.html ~ v8_E.html
```

http-server 5개가 떠 있을 수 있음 (8765/8766/8767/8768/8769) — 다음 세션 시작 시 죽어 있으면 PowerShell 한 줄로 재시작. 단순 file:// 더블클릭이 가장 편함.

---

## 🔗 메모리 갱신
- `project_main_v7_v8_claude_design.md` — 신규
- `reference_claude_design_handoff.md` — 신규 (핸드오프 워크플로우)
- `MEMORY.md` 인덱스 갱신

## 🔗 활성 참조
- v6 세션노트: `SESSION-2026-05-15-ios-hig-iteration.md` (이 세션 전반부)
- 인덱스: <https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486>
- 기획서 v5: <https://www.notion.so/35ec2986e1408111972bd8a7b16c8c0c>
