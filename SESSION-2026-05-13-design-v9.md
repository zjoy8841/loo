# 📌 2026-05-13 야간 세션 종료 노트 · 디자인 v.7.1 → v.8 → v.9 시리즈

> 같은 날 세션 노트 시리즈 중 **3번째**.
> - `SESSION-2026-05-13.md` — 오전/오후: 노션 화면 description 디자인 요소 제거
> - `SESSION-2026-05-13-design-v8.md` — 저녁: 디자인 가이드 v8.0 정식 명세화 + 라이언 마스코트 도구 결정
> - **`SESSION-2026-05-13-design-v9.md` ← 본 노트** · 야간: v.7 본문 풀 토큰화 + MK 상단 hero 분기 + 색 팔레트 8 변형
>
> 다음 세션 첫 메시지: "SESSION-2026-05-13-design-v9.md 읽고 이어가줘" 또는 본 노트 통째 붙여넣기.

---

## 🎯 다음 세션 첫 액션

> **v.9 ~ v.9.8 (9개 시안)에 대한 사용자 피드백 받아 어느 팔레트를 채택할지 결정.** 채택된 팔레트로 v.10 정제 (또는 라이언 시그너처 재정의). 노션 인덱스에 v.9 시리즈 등록.

---

## ✅ 이번 세션(야간) 산출물

### 1. v.7.1 — Apple HIG 풀 토큰 마이그레이션 (1개 파일)

`디자인/라이언 디자인 시안_v.7.1.html` (96KB, 1664줄)

v.7는 `:root`에 v8.0 가이드 토큰 인프라(타입·safe-area·motion·material·z-layer)만 박혀 있었고, 본문 1500+줄은 v.5.1 시절 hex/픽셀 hard-code 그대로였음. v.7.1에서 **풀 마이그레이션** 진행:

- `:root`에 **v8.0 4-mode 시맨틱 컬러 토큰 풀세트** 추가 (50+ 변수)
  - `--ink-primary/secondary/tertiary/quaternary`
  - `--surface-base/elevated/grouped/overlay`
  - `--separator`, `--fill-primary/secondary`
  - 상태(success/warning/danger/info), 시그너처(iris/honey/orange/brand-flag)
- **4-mode override** 3개 셀렉터: `[data-scheme="dark"]`, `[data-contrast="high"]`, `[data-scheme="dark"][data-contrast="high"]`
- **데모 보드 chrome** hex 약 30곳 → `var(--token)` 치환 (body/header/board-stage/scene-tag/caption/footer)
- **Typography** 38곳 → `var(--type-*)` 토큰 (Apple Dynamic Type 매핑)
- **상단 sticky 토글 UI**: Light/Dark · Default/Increased Contrast 라이브 전환
- 시점 surface(`.surface-am/lunch/eve` 등)는 v8.0 §1.1 "시점 강제 기본" 룰대로 **보존**

브라우저 검증: Light/Dark/HighContrast 4 모드 전부 라이브 동작 확인.

### 2. v.8 — v.5c MK 상단 hero 5분기 비교 보드 (1개 파일)

`디자인/라이언 디자인 시안_v.8.html` (127KB, 2278줄)

v.5c MK의 상단 영역(greet + 5장 캐러셀)을 5가지 산업 패턴으로 분기. **6 phones 한 보드**(원본 + 5 변형):

| 분기 | 패턴 | 출처 레퍼런스 |
|---|---|---|
| 원본 | greet + 5-카드 캐러셀 | v.7.1 v.5c MK 그대로 |
| 🅰 One-Hero | 거대 미팅 카드 + 4 메트릭 스트립 | Apple Weather, Whoop |
| 🅱 Lion-led | 라이언 130px + 말풍선 + 인라인 카드 | Pi.ai, Duolingo morning |
| 🅲 Timeline | 세로 시간축 + 미니 카드 (NOW pulse) | Things 3, Fantastical |
| 🅳 Stacked | Apple Wallet 카드 스택 (1/5 배지) | Apple Wallet |
| 🅴 Score+Grid | 원형 게이지 87 + 2×2 그리드 | Oura, Whoop hybrid |

토큰 인프라 + 4-mode 토글 v.7.1에서 상속. 채팅·칩·입력은 6 phones 동일 (상단만 분기).

### 3. v.9 — 4 phones 합본 베이스 (1개 파일)

`디자인/라이언 디자인 시안_v.9.html` (104KB, 1830줄)

v.7.1의 3 시안 + v.8의 🅴 Score+Grid = **4 phones 한 보드**:
1. v.5a · SD (slide+chat 절제)
2. v.5c · MK (관계형 친근)
3. v.5.1 · REFINED (정제 절제)
4. 🅴 Score+Grid (점수 hero + 2×2)

라이언 기본 팔레트 그대로 (Lion Iris #5B5FE0 + Orange #E87A3E). 4-mode 토글 유지. **v.9.1~v.9.8 색 분기 베이스**.

### 4. v.9.1 ~ v.9.8 — 북미 라이프스타일 앱 팔레트 8 변형 (8개 파일)

각 파일 100~104KB, 1736~1788줄. 4 phones 구조는 v.9와 완전 동일, **컬러 시스템만 전부 교체**. 다크 모드 override 블록 + 토글 UI 제거 → 각자 시그너처 단일 모드.

| 파일 | 팔레트 | 핵심 hex 3개 |
|---|---|---|
| **v.9.1 Granola** ☕ | 웜 크림 + 코랄 (AI 친근 톤) | `#F5EFE3` / `#2A1F15` / `#D86545` |
| **v.9.2 Linear** ⚡ | 다크 인디고 + 일렉트릭 코랄 | `#08080D` / `#5E6AD2` / `#FF6566` |
| **v.9.3 Arc Browser** 💗 | 핫핑크 그라데이션 + 시안 | `#FF4A8E` / `#5DD3FF` / `#2D0F26` |
| **v.9.4 Notion** 🪻 | 웜 그레이 + 라벤더 + 코랄 | `#F9F8F6` / `#B5A8FF` / `#FFB4A2` |
| **v.9.5 Co-Star** ⚫ | 흑백 brutalist + 코랄 | `#000000` / `#FFFFFF` / `#FF5C39` |
| **v.9.6 Hinge** 🍑 | 피치 크림 + 와인 레드 | `#FCF1E8` / `#2D1409` / `#C6242F` |
| **v.9.7 Headspace** 🟠 | 샌드 + 비비드 오렌지 + 머스타드 | `#FAEDD8` / `#F47B33` / `#FFC971` |
| **v.9.8 Oura** 💍 | 순수 블랙 + 코퍼 + 골드 | `#000000` / `#C68B5E` / `#D4AF37` |

브라우저 시각 검증: 9개 파일 전부 4 phones 정상 렌더링 + 각 팔레트 시그너처 잘 살아남.

---

## 🔑 주요 결정·결정 보류

### 결정된 것
- **v.7.1 풀 마이그레이션 = "Apple 디자인 입히기"** — v8.0 토큰은 Apple HIG 2026-05-13 fetch 결과 그대로
- **v.9 4 phones 채택**: SD / MK / REFINED / Score+Grid (다른 v.8 분기 4개는 보류)
- **다크 모드 단일 분기 OK** — v.9.1~v.9.8은 각 앱 시그너처 모드 1개씩
- **컬러 변경 범위 = 전체 팔레트** (시그너처 + surface 전부 교체)

### 보류 / 피드백 대기
- **어느 팔레트가 라이언 정체성과 가장 맞는가** — 9개 시안 사용자 피드백 대기
- **v.5c MK 상단 hero 패턴 선택** — v.8의 🅰/🅱/🅲/🅳/🅴 중 어느 것을 본문에 채택할지 미결 (v.9는 🅴 Score+Grid만 가져옴)
- **시점 surface 다크모드 추종 여부** — 현재 시점 강제 기본. 시스템 적응 옵션은 v.10+ 후보
- **6 phones 가로 스크롤 vs 그리드** — 현재 모든 보드 가로 스크롤 (의도된 비교 보드 동작)

---

## 📂 활성 산출물 (다음 세션 fetch)

```
디자인/
├── 디자인 가이드/
│   ├── design-guide-v8.0.{md,html}        ← v8.0 정식 명세 (저녁 세션 결과)
│   └── old/                               ← v7 본문 보존
├── Apple-HIG/                             ← HIG fetch 정리본 (저녁 세션 결과)
├── 라이언 디자인 시안_v.7.html             ← 베이스 (이전 세션)
├── 라이언 디자인 시안_v.7.1.html           ← 🆕 Apple HIG 풀 토큰화
├── 라이언 디자인 시안_v.8.html             ← 🆕 v.5c MK 상단 hero 5분기 보드
├── 라이언 디자인 시안_v.9.html             ← 🆕 4 phones 합본 (라이언 팔레트)
├── 라이언 디자인 시안_v.9.1.html           ← 🆕 Granola
├── 라이언 디자인 시안_v.9.2.html           ← 🆕 Linear
├── 라이언 디자인 시안_v.9.3.html           ← 🆕 Arc Browser
├── 라이언 디자인 시안_v.9.4.html           ← 🆕 Notion
├── 라이언 디자인 시안_v.9.5.html           ← 🆕 Co-Star
├── 라이언 디자인 시안_v.9.6.html           ← 🆕 Hinge
├── 라이언 디자인 시안_v.9.7.html           ← 🆕 Headspace
└── 라이언 디자인 시안_v.9.8.html           ← 🆕 Oura
```

## 🚀 다음 작업 (우선순위 순)

### 1. v.9 시리즈 사용자 피드백 받기 (1순위)
9개 시안을 보고 "어느 팔레트가 라이언 정체성에 맞는가" 결정. 결정되면 그 팔레트로 v.10 정제 시작.

### 2. 노션 인덱스 갱신
Life OS ONE_v2 인덱스의 디자인 자료 행에 v.7.1 / v.8 / v.9 시리즈 추가. Active Policy 표 갱신.

### 3. 채택된 팔레트로 시점 surface 풀 적용
현재 v.9.X는 `.surface-am`만 팔레트 교체. lunch/eve/night 등 다른 시점 surface도 채택 팔레트로 재정의.

### 4. v.8 상단 hero 패턴 채택 결정
v.8의 5 분기 중 본문에 채택할 패턴 결정 → 채택안을 v.9 v.5c MK scene에 반영.

### 5. 기획 트랙 — 회원가입 7개 wireframe (보류 중)
오후 세션 종료 시 결정된 작업. 형식·저장위치·범위 3가지 결정 후 진행.

---

## 🔗 활성 참조

- **인덱스**: <https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486> (Life OS ONE_v2)
- **디자인 가이드 v8.0**: `디자인/디자인 가이드/design-guide-v8.0.md` (24KB) · `design-guide-v8.0.html` (58KB)
- **Apple HIG fetch**: `디자인/Apple-HIG/HIG-fetch-2026-05-13.md`
- **Figma 파일**: fileKey `7gay0y94AxMz4Q82dMSdI7` (LIFE OS ONE_사용자 APP)

---

## ⚠️ 다음 세션이 주의할 점

- v.9.1~v.9.8은 `.surface-am`(아침 시점)만 팔레트 교체. **다른 시점 surface는 라이언 인디고 잔존** — 4 phones가 모두 아침이라 실질 영향 없지만, 시점 surface 풀 적용은 별도 작업.
- v.9.1~v.9.8은 **토글 UI/JS dead code가 일부 잔존** — 동작 무해. 정리하려면 별도 오더.
- 가로 스크롤 보드(380px × 4 phones = 1660px)는 max-width 1700px 안에서 표시. 작은 화면에서는 가로 스크롤 발생.
- 9개 파일 commit 분량이 크므로 (~1MB total) push 시 시간 걸릴 수 있음.

---

**문서 끝.** 다음 세션 — 9개 시안 피드백 받고 그 결과에 따라 v.10 정제 또는 다른 트랙(기획 wireframe / 노션 인덱스)로 전환.
