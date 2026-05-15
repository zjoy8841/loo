# 라이언 모닝 UI

_Started 2026-05-15 06:05 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Life OS ONE_v2"
Current date is now May 15, 2026
</system-info>

<default aesthetic>
If no references, art direction or design systems were provided, use this default professional modern, minimal aesthetic as a base. Declare your choice out loud so you stick to it. Guidance:
- Choose a type pairing from web-safe set or Google Fonts. Helvetica is a good choice. Avoid hard-to-read or overly stylized fonts. Use 1-3 fonts only.
- Foreground and background: choose a color tone (warm, cool, neutral, something in-between). Use subtly-toned whites and blacks; avoid saturations above 0.02 for whites.
- Accents: choose 0-2 additional accent colors using oklch. All accents should share same chroma and lightness; vary hue.
- NEVER write out an SVG yourself that's more complicated than a square, circle, diamond, etc.
- For imagery, never hand-draw SVGs; use subtly-striped SVG placeholders instead with monospace explainers for what should be dropped there (e.g. “product shot”)

CRITICAL: ignore default aesthetic entirely if given other aesthetic instructions like reference images, design systems or guidance, or if there are files in the project already.
</default aesthetic>

<pasted_text name="Pasted text (97 lines)">
## 만드는 것

**라이언(Lion)** — Life OS.ONE 플랫폼의 사용자용 AI 비서 모바일 앱.

이번에 디자인할 화면은 **앱의 메인(홈) 화면 한 장**입니다. 사용자가 앱을 열었을 때 처음 보는 화면이고, 라이언과의 모든 일상 인터랙션이 시작되는 곳입니다.

---

## 누가 쓰는가

매일 일상에서 라이언을 부르는 사람. 출근길에 오늘 날씨와 일정을 묻고, 점심시간이 되면 무엇을 먹을지 라이언과 의논하고, 저녁에 하루를 가볍게 회고하는 사용자. 본인의 휴대폰에서 라이언 앱을 직접 켜서 쓰며, 음성으로도 부릅니다 ("라이언아").

---

## 무슨 문제를 해결하는가

매일의 작은 결정들 — 오늘 뭘 입을까 / 점심 뭐 먹을까 / 일정 까먹지 않기 / 컨디션 챙기기 — 이 결정들이 모이면 하루가 피로해집니다.

라이언은 이 작은 결정들을 사용자보다 한 발 앞서 챙기는 존재입니다. 사용자는 라이언이 정리해 둔 것을 확인하고, 필요하면 대화로 다듬습니다. 사용자가 매번 정보를 검색·입력·계산하지 않아도 되는 것이 핵심 가치입니다.

---

## 라이언이 해주는 것 (핵심 기능)

### 1. 아침 — 오늘의 시작 정리
하루를 여는 시점에 라이언이 다음을 한 묶음으로 전달합니다.
- 오늘의 날씨와 그에 맞는 옷·소지품 제안
- 오늘의 일정과 가장 중요한 한두 건
- 어젯밤 컨디션(수면 등)에 따른 오늘의 감각 한 줄

### 2. 점심 — 식사 추천 + 예약 + 결제
점심시간이 가까워지면 라이언이 추천을 시작합니다.
- 사용자의 페르소나(체형 목표 · 식이 제한 · 알레르기 · 그날 일정 강도)를 종합한 메뉴 1~3개 추천
- 사용자가 라이언과 대화하며 다른 옵션을 요청하거나 결정 (LLM 기반 역제안 가능)
- 결정되면 가맹점에 자동 예약 → 결제 → 예약 확정까지 한 흐름

### 3. 저녁 — 하루 회고
하루가 끝나갈 무렵 라이언이 가볍게 짚어주는 시점.

### 4. 맛집 지도
사용자 위치 주변의 라이언 추천 가맹점을 지도에서 확인.

### 5. 음성 호출
"라이언아"라고 부르면 풀스크린 음성 입력 화면이 열립니다. 모든 화면에서 호출 가능합니다.

### 6. 알림
가맹점 응답 · 시점 브리핑 · 추천 등 라이언이 사용자에게 능동적으로 보내는 신호.

---

## 인터페이스 철학

라이언의 기본 포맷은 **음성과 네이티브 UI**입니다. 텍스트 채팅창은 보조 수단(fallback)이며, ChatGPT 같은 채팅 인터페이스는 메인 화면의 기본 형태가 아닙니다.

메인 화면에서 사용자는 라이언이 정리해 둔 카드들을 본다 → 음성으로 부르거나 / 카드에서 행동을 한다.

---

## 개인화의 기반 (페르소나)

회원가입 단계에서 사용자가 7가지 영역의 태그를 선택해 본인의 페르소나를 만듭니다.

1. 계정 (이름·이메일)
2. 건강 상태
3. 체형 목표
4. 식이 / 알레르기
5. 라이프스타일
6. 직업
7. 관심사

이 페르소나가 라이언의 모든 추천(아침 옷차림, 점심 메뉴, 저녁 회고 톤)에 반영됩니다. 라이언이 "그냥 AI"가 아니라 "나를 아는 비서"로 느껴지는 이유입니다.

---

## 이번 메인 화면이 담아야 할 것

기획서·화면 IA 기준 메인 화면(U-03)의 구성 요소:

- **시점 카드** — 지금이 아침인지 점심인지 저녁인지에 따라 라이언이 정리해 둔 카드가 달라짐. 한 시점에 하나의 카드가 화면의 주인공.
- **디폴트 박스** — 시점과 무관하게 항상 보이는 영역. 라이언 호출 입구, 페르소나 단서 등.
- **페르소나 반영** — 사용자가 등록한 7단계 태그가 라이언의 인사말·추천에 자연스럽게 묻어남.

이 셋이 한 화면에 담깁니다. 사용자는 이 화면에서 "오늘 라이언이 무엇을 챙겨두었는가"를 한 번에 파악합니다.

---

## 운영 환경

- 모바일 풀스크린 (반응형 웹으로 모바일을 우선 대응. 향후 네이티브 앱)
- 한국어 우선. 영어·베트남어도 지원 예정 (구조만 대비)
- 출시 단계: 클로즈 베타

---

## 브랜드 방향성

라이언은 단기적으로는 일상 비서지만, 장기적으로는 **사회적 케어** — 게임·도박 중독 개입, 멘탈/정서 케어, 고령층·한부모 가정 일상 보호로 확장될 예비 비전을 가집니다. 도구라기보다 옆에 있어주는 존재의 톤. 디자인 무드에 영향.
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Hi-fi design">
Create a high-fidelity, polished design. Follow the instructions about design in your system prompt, particularly the 'How to do design work' section. Use the design_canvas starter component, or make a full-bleed prototype and offer options via Tweaks.
</attached-skill>

<attached-skill name="Interactive prototype">
Create a fully interactive prototype with realistic state management and transitions. Use React useState/useEffect for dynamic behavior. Include hover states, click interactions, form validation, animated transitions, and multi-step navigation flows. It should feel like a real working app, not a static mockup.
</attached-skill>


<system-reminder>Auto-injected reminder (ignore if not relevant): do not recreate copyrighted or branded UI unless the user's email domain matches that company. Create original designs instead.</system-reminder>

## Assistant

_[tool: list_files]_

_[tool: questions_v2]_

## User

Questions answered:
- design_system: 없음 — 라이언 톤에 맞춰 새로 만들어줘
- time_of_day: 아침 (날씨·옷차림·일정), 셋 다 — 시점 토글로 비교
- variations: 4~5개 — 컨벤셔널부터 실험적인 안까지 폭넓게
- mood: 차분하고 미니멀 (off-white, 정갈한 타입, 여백 중심)
- accent_color: 2, 5, 1
- lion_avatar: 사자 일러스트/마스코트 (어떻게든 등장)
- card_density: Decide for me
- interactivity: Decide for me
- persona_visibility: Decide for me
- frame: iOS 프레임 안에서

## Assistant

_[tool: copy_starter_component]_

좋아요. 들으신 답변을 바탕으로 다음을 세팅하겠습니다:

**디자인 시스템 (즉석)**
- 베이스: warm off-white `#F4F1EC`, ink `#1A1A1C`, mute `#8A857C`
- 시점 액센트: 아침 = 테라코타 `#C8722A`, 점심 = 포레스트 `#5B7C5A`, 저녁 = 브릭 `#A14242`
- 타입: Noto Serif KR (디스플레이) + Pretendard (본문)
- 라이언 마스코트는 각 변형마다 다르게 — 미니멀 라인 사자, 모노그램, 원형 페이스, 유기적 오브 등으로 시도
- iOS 프레임 안, 5개 안 (보수→실험)

먼저 스타터 컴포넌트부터 가져올게요.

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: update_todos]_

이제 빌드 시작합니다. 시간이 좀 걸릴 수 있어요.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

이제 5개 변형을 작성하겠습니다.

_[tool: write_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: show_html]_

_[tool: done]_

## Assistant

_[tool: fork_verifier_agent]_

다섯 가지 방향으로 라이언 메인 화면을 디자인했어요. 캔버스를 위→아래로 펼쳐보시고, 우측 **Tweaks** 패널에서 시점(아침/점심/저녁)과 페르소나 이름을 바꿔 비교할 수 있습니다.

**5개 안 (보수 → 실험)**
- **A · Quiet Brief** — 미니멀 에디토리얼. 한 장의 카드, 부드러운 톤
- **B · Companion** — 사자가 캐릭터로 등장. 말풍선 인사 + 따뜻한 페이퍼 톤
- **C · Single Focus** — 포스터처럼 큰 세리프 헤드라인 + 글래스 카드
- **D · Editorial** — 신문 마스트헤드 + 컬럼 레이아웃. 활자가 화면을 끄는 안
- **E · Presence (Dark)** — 라이언이 빛나는 오브로 존재하는 다크 모드, 실험적

각 안마다 **사자 표현**이 다릅니다 (기하학적 얼굴 / 모노그램 / 오브 / 라인 / 워드마크). 시스템 섹션에 토큰·마스코트·음성 호출 정리도 함께 넣어뒀어요.

다음 단계 후보:
- 음성 호출 풀스크린 화면, 점심 예약→결제 흐름까지 확장
- 한두 안을 골라 마이크로 인터랙션·전환 추가
- 다른 페르소나(예: 글루텐 X, 다이어트 강도 다름)로 추천 톤이 어떻게 달라지는지 비교

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

좋은 지적이네요. 이름이 인사말에 박혀 있어서 페르소나 이름 트윅이 안 먹는 문제, 그리고 V2/V5에서 이름이 중복 표시되는 버그를 고칠게요.

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

인사말 이름 중복 버그 + 페르소나 이름 트윅이 모든 안에 반영되도록 수정했습니다.

- **V1·V2·V5**: `greetingFor(name)` 함수로 인사말 한 줄을 동적 생성 (예: "안녕하세요, 지원님" → 이름 바꾸면 즉시 반영)
- **V3**: 헤더 라인에 이름 노출 ("지원 · 아침 · NO. 142")
- **V4**: 마스트헤드에 "VOL. 142 · 지원"

오른쪽 Tweaks 패널의 **이름** 필드를 바꾸면 다섯 안 모두 갱신됩니다.

