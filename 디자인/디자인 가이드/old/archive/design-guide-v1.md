# 디자인 가이드 v1 — 라이언 (Lion)

> **담당**: A (오다환) · **상태**: v1 작성 완료 (2026-05-11) · **버전 정책**: 큰 변경 시 v{N+1} 발행, 이 문서를 단일 소스로 유지.
>
> 관련 노션: [기획서 v4](https://www.notion.so/35dc2986e14081e28866fcc492d044ca) · [화면 IA v2](https://www.notion.so/35dc2986e1408177972fc89299154926) · [2026-05-11 회의록](https://www.notion.so/35dc2986e1408138bec8cb50765c6bcd) · [Life OS ONE_v2](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486)

---

## 0. v1 변경 사항 (v0 스켈레톤 대비)

- 외부 디자인 위탁 폐기 → 가이드 자체적으로 풀 시스템 정의
- 컬러: 아이보리+에메랄드 → **Warm Lion 팔레트** (호박빛 + 세이지 + 웜 뉴트럴)
- UI 톤: 챗봇 패턴 → **네이티브 앱 + 비주얼 카드**
- 정보 순서: **추천 먼저, 근거 하위** 명문화
- 다크모드: **라이트 우선 + 데이터 시각화 카드 다크 하이브리드**
- 라이언 SVG 마크 신규 도입 (`docs/assets/lion-mark.svg`)

---

## 1. 디자인 원칙

### 1.1. 네이티브 앱 느낌
스크롤 채팅 로그 패턴 폐기. 고정 헤더·시점 카드·디폴트 박스로 화면 골격 형성. iOS HIG·Apple Health 패턴 참조.

### 1.2. 추천 먼저, 근거 나중
한 화면에서 사용자가 가장 먼저 보는 건 "지금 뭐 해야 해?". 근거(날씨·이유)는 작은 캡션 또는 펼치면 보이게.

### 1.3. 메인 최상단 디폴트 박스
현재 시점(아침·점심·저녁) 우선순위 행동 1개를 한 박스에 집약. 시점 카드 3개 진입은 그 아래.

### 1.4. 비주얼 강화
텍스트 박스 나열 X. 이미지·그라데이션·아이콘으로 정보 전달. 메뉴 카드는 음식 이미지, 시점 카드는 분위기 그라데이션.

### 1.5. 따뜻한 케어 톤
정서·신뢰·격려. 라이언 캐릭터의 따뜻함이 마이크로카피·일러스트·컬러에 일관 노출. 사회적 케어 브랜드 방향성과 일치.

---

## 2. 흡수한 DNA (5개 앱)

| 앱 | 흡수 요소 | LOO 적용 위치 |
|---|---|---|
| **Oura Ring** | 다크 데이터 시각화 카드, 링·그라데이션, 한 번에 하나의 핵심 지표 | 헬스 메트릭 카드, 시점 헤더 |
| **Noom** | 채팅 카드 UI, 단계형 온보딩, 부드러운 코랄/웜 톤 | 회원가입 7단계, AI 역제안 카드 |
| **MyFitnessPal** | 음식 카드, 명료한 카테고리 컬러, 빠른 입력 플로우 | 점심·맛집 메뉴 카드, 결제 모달 |
| **Apple Health / Fitness+** | SF Pro 타이포 스케일, 시스템 컬러, 시트·카드 패턴 | 모달·바텀시트·하단 탭 |
| **Calm** | 그라데이션 백그라운드, 정서 마이크로카피, 따뜻한 일러스트 | Splash, 시점 인사, 케어 멘트 |

---

## 3. 컬러 시스템 — Warm Lion

### 3.1. Primary (라이언 호박빛)

| 토큰 | Hex | 용도 |
|------|------|------|
| `primary-100` | `#FCE7D2` | Tinted background, 선택된 chip 배경 |
| `primary-300` | `#F2A879` | Hover background, 다크 위 액센트 |
| `primary-500` | `#E87A3E` | **메인 CTA · 로고 · 키 액센트** |
| `primary-600` | `#C8651F` | Pressed, 깊이 강조 |
| `primary-700` | `#A04F12` | 다크 배경 위 텍스트 |

### 3.2. Secondary (세이지 그린 — 건강·식단)

| 토큰 | Hex | 용도 |
|------|------|------|
| `secondary-100` | `#E0EDE4` | 식이 칩 배경 |
| `secondary-500` | `#3D7A5C` | 건강·식단 강조, 다이어트 태그 |

### 3.3. Accent (Honey — 추천·하이라이트)

| 토큰 | Hex | 용도 |
|------|------|------|
| `accent-honey` | `#F4B860` | 추천 카드 outline, 하이라이트, 라이언 갈기 |

### 3.4. Neutral (라이트 — 웜 톤)

| 토큰 | Hex | 용도 |
|------|------|------|
| `neutral-0` | `#FAF7F2` | 메인 배경 (웜 오프화이트) |
| `neutral-50` | `#F2EEE6` | Card hover, list divider |
| `neutral-200` | `#E6DFD3` | Border, separator |
| `neutral-500` | `#7A7468` | Secondary text |
| `neutral-700` | `#3D3A33` | Body text |
| `neutral-900` | `#1F1B16` | Headline (웜 블랙) |

### 3.5. Dark Card (Oura DNA — 데이터 시각화 카드)

| 토큰 | Hex | 용도 |
|------|------|------|
| `dark-bg-0` | `#1A1714` | 다크 카드 배경 |
| `dark-bg-100` | `#26221E` | 다크 카드 surface |
| `dark-text-100` | `#F5EFE4` | 다크 카드 본문 |

### 3.6. Status

| 토큰 | Hex | 용도 |
|------|------|------|
| `success` | `#2E7D5B` | 예약 확정·완료 |
| `warning` | `#E0A341` | 재고 부족·주의 |
| `danger` | `#C44536` | 취소·오류 |
| `info` | `#3F7BAA` | 정보 안내 |

### 3.7. 시점별 그라데이션

| 시점 | from → to | 분위기 |
|------|----------|------|
| 아침 (morning) | `#FFEDD5 → #FED7AA` | 햇살, 깨어남 |
| 점심 (lunch) | `#FEF3C7 → #FCD34D` | 활기, 식욕 |
| 저녁 (evening) | `#E0E7FF → #818CF8` | 차분, 마무리 |
| 취침 (night) | `#1F1B16 → #3D3A33` | 정적 (다크) |

### 3.8. Tailwind v4 `@theme` 코드

`web/src/app/globals.css`에 적용 (기존 ivory·emerald·mustard·lavender 토큰 deprecated):

```css
@theme {
  /* Primary — Warm Lion */
  --color-primary-100: #FCE7D2;
  --color-primary-300: #F2A879;
  --color-primary-500: #E87A3E;
  --color-primary-600: #C8651F;
  --color-primary-700: #A04F12;

  /* Secondary — Sage */
  --color-secondary-100: #E0EDE4;
  --color-secondary-500: #3D7A5C;

  /* Accent — Honey */
  --color-accent-honey: #F4B860;

  /* Neutral — Light */
  --color-neutral-0:   #FAF7F2;
  --color-neutral-50:  #F2EEE6;
  --color-neutral-200: #E6DFD3;
  --color-neutral-500: #7A7468;
  --color-neutral-700: #3D3A33;
  --color-neutral-900: #1F1B16;

  /* Dark Card (data viz) */
  --color-dark-bg-0:     #1A1714;
  --color-dark-bg-100:   #26221E;
  --color-dark-text-100: #F5EFE4;

  /* Status */
  --color-success: #2E7D5B;
  --color-warning: #E0A341;
  --color-danger:  #C44536;
  --color-info:    #3F7BAA;

  /* Fonts */
  --font-sans: "Pretendard Variable", "Pretendard", system-ui, -apple-system,
    BlinkMacSystemFont, sans-serif;
}
```

### 3.9. 사용 규칙

- 직접 hex 사용 금지 → 토큰만
- Primary는 CTA·로고·키 액센트에만 (남용 X)
- Secondary는 식단·건강 관련에만
- Honey는 추천·하이라이트에만
- Status는 의미적 (`success` 는 완료/확정에만)

---

## 4. 다크 하이브리드 전략

**라이트 우선** — 메인 배경·카드·텍스트 기본 라이트.
**다크 적용** — 데이터 시각화·일부 시점 헤더만.

### 4.1. 다크 적용 영역

| 컴포넌트 | 다크 | 이유 |
|---------|-----|------|
| 데이터 시각화 카드 (걸음·심박·칼로리) | ✓ | Oura DNA, 데이터 강조 |
| 시점 헤더 (저녁·취침) | ✓ | 분위기 차별화 |
| 회원가입 진행 | ✗ | 라이트 유지 |
| 가맹점 관리 시스템 | ✗ | 운영 정보는 라이트가 가독성 ↑ |

### 4.2. 다크 카드 토큰 매핑

- 배경 `dark-bg-100`
- 본문 `dark-text-100`
- 강조 `accent-honey`
- Primary 변형 `primary-300` (어두운 위에서는 톤 다운)

### 4.3. 시스템 다크모드 (v2 후속)

`prefers-color-scheme: dark` 대응은 v2 작업. 시연 5/29 단계에서는 미적용.

---

## 5. 타이포그래피

### 5.1. 폰트

- **본문 + Display**: Pretendard Variable (CDN)
- **대체**: system-ui, -apple-system, BlinkMacSystemFont

### 5.2. 스케일

| 토큰 | size | weight | line-height | letter-spacing | 용도 |
|------|------|--------|-------------|----------------|------|
| `display` | 32px | 800 | 1.15 | -0.02em | Splash, 큰 인사 |
| `title-1` | 24px | 700 | 1.25 | -0.01em | 메인 헤드라인, 시점 카드 제목 |
| `title-2` | 20px | 700 | 1.30 | -0.01em | 섹션 헤더 |
| `headline` | 17px | 600 | 1.40 | 0 | 카드 제목, 강조 |
| `body` | 15px | 400 | 1.50 | 0 | 본문 |
| `body-bold` | 15px | 600 | 1.50 | 0 | 강조 본문 |
| `caption` | 13px | 400 | 1.40 | 0 | 메타 정보, 근거 라인 |
| `micro` | 11px | 500 | 1.30 | 0.02em | 칩 라벨, 배지 |

### 5.3. 규칙

- 본문 최대 폭 64ch
- 한국어 줄간격 1.5 기본, 캡션 이하 1.4
- 한국어는 letter-spacing 0 또는 양수, 영어는 약간 음수 (-0.01em)

---

## 6. 스페이싱 & 그리드

### 6.1. 베이스

4px 그리드. Tailwind 기본 (`1` = 4px, `2` = 8px, ...).

### 6.2. 컨테이너

- 모바일: `max-w-[420px] mx-auto px-5` (양 옆 20px)
- 가맹점 PC: `max-w-[1280px] mx-auto px-8`
- safe-area-inset: `pb-[max(1rem,env(safe-area-inset-bottom))]`

### 6.3. 컴포넌트 내부 여백

- 카드 기본 `p-4`, 강조 `p-5`
- 버튼 CTA `px-5 py-3`, 작은 버튼 `px-4 py-2`
- 입력 필드 `px-4 py-3`
- 바텀 시트·모달 `p-6`

### 6.4. 간격

- 섹션 사이 `mt-6` (24px)
- 카드 사이 `gap-3` (12px)
- 인라인 `gap-2` (8px)

---

## 7. 아이콘 & 일러스트

### 7.1. 아이콘 — Lucide React

설치: `npm i lucide-react`. Apple Health·Linear 검증 outline 스타일.

- 사이즈: `16`, `20` (기본), `24`, `32`
- stroke-width: `1.5` 기본, 헤더는 `2`
- 컬러: `currentColor` (부모 색 상속)

```tsx
import { Bell, ChevronRight } from "lucide-react";
<Bell className="size-5 text-neutral-700" strokeWidth={1.5} />
```

### 7.2. 이모지 사용

회원가입 태그·메뉴 추천에서 이모지 유지하되:

- 핵심 액션·CTA에는 이모지 X (Lucide 사용)
- 카테고리·태그·감정 표현에만 OK
- 단일 환경 렌더링 차이 검증 (iOS·Android·데스크탑)

### 7.3. 라이언 마크 (SVG)

파일: `docs/assets/lion-mark.svg` · `docs/assets/lion-mark-mono.svg`

기본 마크 (Primary 배경):

```svg
<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-label="Lion mark">
  <rect width="80" height="80" rx="20" fill="#E87A3E"/>
  <circle cx="40" cy="44" r="28" fill="#F4B860"/>
  <ellipse cx="40" cy="46" rx="20" ry="18" fill="#FCE7D2"/>
  <circle cx="24" cy="32" r="5" fill="#F4B860"/>
  <circle cx="56" cy="32" r="5" fill="#F4B860"/>
  <circle cx="32" cy="42" r="2.5" fill="#1F1B16"/>
  <circle cx="48" cy="42" r="2.5" fill="#1F1B16"/>
  <path d="M 37 50 L 43 50 L 40 53 Z" fill="#1F1B16"/>
  <path d="M 32 58 Q 40 63 48 58" stroke="#1F1B16" stroke-width="2.2" fill="none" stroke-linecap="round"/>
</svg>
```

#### 사용 규칙

- 최소 사이즈 24×24px
- 여백 (clear space): 마크 너비의 1/8 이상
- 컬러 변형: Primary 배경 / 다크 배경 mono(흰색) / 단색 #1F1B16
- 회전·왜곡·색 분리 금지
- 워드마크 (Lion / 라이언) 동반 시 마크 오른쪽 8px

---

## 8. 컴포넌트 인벤토리

### 8.1. Button

| Variant | 클래스 (Tailwind 예시) |
|---------|------------------------|
| `primary` | `bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-neutral-0 px-5 py-3 rounded-xl font-semibold` |
| `secondary` | `bg-neutral-50 border border-neutral-200 text-neutral-900 px-5 py-3 rounded-xl` |
| `ghost` | `text-primary-600 hover:bg-primary-100 px-4 py-2 rounded-lg` |
| `danger` | `bg-danger text-neutral-0 px-5 py-3 rounded-xl` |

상태: 기본 · hover · active(`scale-95`) · disabled(`opacity-50`) · loading(spinner). 터치 영역 최소 44×44px.

### 8.2. Field (Input · Select)

```tsx
<label className="block text-sm font-semibold text-neutral-900 mb-2">이메일</label>
<input
  type="email"
  className="w-full bg-neutral-0 border border-neutral-200 rounded-xl px-4 py-3
             focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100
             placeholder:text-neutral-500"
/>
```

에러 상태: `border-danger ring-danger/20`.

### 8.3. Card

| Variant | 클래스 |
|---------|--------|
| `default` | `bg-neutral-0 border border-neutral-200 rounded-2xl p-4` |
| `highlight` | `bg-gradient-to-br from-primary-100 to-primary-300 ring-1 ring-primary-300/40 rounded-2xl p-5` |
| `dark-accent` | `bg-dark-bg-100 text-dark-text-100 rounded-2xl p-5` |
| `moment-morning` | `bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-5` |
| `moment-lunch` | `bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-5` |
| `moment-evening` | `bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-2xl p-5` |

### 8.4. TagChip

```tsx
<button className={`rounded-xl px-3 py-2 text-sm font-semibold border-2 transition
  ${selected
    ? "bg-primary-500 text-neutral-0 border-primary-500"
    : "bg-neutral-0 text-neutral-700 border-neutral-200 hover:border-primary-300"}`}>
  <span>{emoji}</span> {label}
</button>
```

식이 태그용 세이지 변형: `bg-secondary-500 border-secondary-500`.

### 8.5. Sheet / Modal

- 바텀 시트: `bg-neutral-0 rounded-t-3xl`, 핸들 바 (12×4 둥근), `pb-[env(safe-area-inset-bottom)]`
- 풀스크린 모달: `bg-neutral-0` + 상단 닫기 X 또는 ← 버튼
- backdrop: `bg-neutral-900/60 backdrop-blur-sm`

### 8.6. Toast

- 위치: 상단 (모바일) / 우측 상단 (PC)
- variants: `success` · `info` · `danger`
- 자동 사라짐 3초, 수동 닫기 X

### 8.7. AIVoiceFAB (라이언 호출)

- 위치: `bottom-20 right-5`
- 사이즈: `size-14` (56×56px)
- 배경: `bg-primary-500` + pulse 애니메이션
- 아이콘: Lucide `Mic` 또는 라이언 미니 마크
- Hint: long-press 시 "라이언" 라벨 표시

### 8.8. BottomNav

- 4탭: 홈 · 기록 · 맛집 · 마이
- 아이콘 + 라벨 (10px)
- active: `text-primary-600 font-bold`
- inactive: `text-neutral-500`
- 배경: `bg-neutral-0/95 backdrop-blur-md`

### 8.9. Progress Bar

```tsx
<div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
  <div className="h-full bg-primary-500" style={{ width: "57%" }} />
</div>
```

### 8.10. ListItem

iOS 시스템 리스트 — `divide-y divide-neutral-200`, item은 `py-3 px-4 active:bg-neutral-50`.

---

## 9. 레이아웃 패턴

### 9.1. 메인 — 디폴트 박스 우선

```
┌─────────────────────────────────────┐
│ 헤더 (로고·알림·아바타)               │
│ "좋은 아침이에요, 오다환님 ☀️"          │
│ 메타 칩 (💼 직장인 · 📈 경제 · 💻 IT)   │
├─────────────────────────────────────┤
│ ✅ 디폴트 박스 (그라데이션 배경)        │
│   "자켓 · 우산 챙기세요"               │
│   └ 14° · 비 80% · 클라이언트 미팅      │
├─────────────────────────────────────┤
│ 오늘의 한 줄 (개인화 멘트)             │
├─────────────────────────────────────┤
│ 시점 카드 3개 (아침·점심·저녁)         │
├─────────────────────────────────────┤
│ 데이터 카드 (걸음·칼로리, 다크 배경)    │
├─────────────────────────────────────┤
│ 헤드라인·인사이트·페르소나 칩          │
└─────────────────────────────────────┘
```

### 9.2. 시점 — 비주얼 우선

```
┌─────────────────────────────────────┐
│ 시점 그라데이션 배경                  │
│ [자켓 일러스트]                       │
│                                      │
│ 자켓 · 우산 챙기세요                  │
│ ─────────────────────                │
│ 14° · 비 80% · 클라이언트 미팅 10:00   │
└─────────────────────────────────────┘
```

### 9.3. 회원가입 7단계

- 진행 바 상단 (Primary)
- 태그 카드 2열 그리드, 비주얼 강화
- 건너뛰기(ghost) + 다음(Primary)
- 7/7 완료 → 환영 화면 "이제 라이언이 시작되었어요"

### 9.4. 점심 결제 모달

- 바텀 시트
- 메뉴 카드 (이미지 + 가격 + 칼로리)
- 더미 카드 폼 3필드
- "결제 완료 (DEMO)" → 토스트 → 예약 확정

### 9.5. 가맹점 대시보드 (PC)

- 좌측 사이드바: 예약 · 메뉴 · 재고 · 정산
- 메인: 예약 리스트 + 실시간 알림
- 새 예약: 카드 + 사운드 + 시각 점멸

---

## 10. 보이스 & 마이크로카피 (라이언 톤)

### 10.1. 캐릭터 톤

- **따뜻함**: "오늘 클라이언트 미팅 있으시죠? 자켓 챙기시면 좋겠어요."
- **간결함**: "자켓 · 우산. 점심엔 단백질."
- **격려**: "어제 5,200걸음! 오늘은 7,000 도전해볼까요?"
- **유머 (선택적)**: "또 다이어트 깨실 거예요? ㅋㅋ"

### 10.2. 시점별 인사

| 시간대 | 인사 |
|--------|------|
| 06-11 | "좋은 아침이에요, {name}님 ☀️" |
| 11-14 | "맛있는 점심 드세요 🍱" |
| 14-18 | "좋은 오후예요 🌤️" |
| 18-22 | "좋은 저녁이에요 🌆" |
| 22-06 | "오늘 하루 수고하셨어요 🌙" |

### 10.3. 추천 멘트 패턴 (태그 기반)

- 콜레스테롤 걱정중 → "콜레스테롤 신경쓰시는 거 알아요. 닭가슴살 샐러드 어떠세요?"
- 네버엔딩 다이어터 → "또 다이어트 깨실 거예요? ㅋㅋ"
- 벌크업 중 → "단백질 잘 챙기시는 한식당 보실래요?"
- 카페인 의존 → "오후 2시 이후 커피, 수면 질에 영향 있어요."

### 10.4. 에러·로딩·빈 상태

- 에러: "어... 잠시 문제가 있어요. 다시 시도해볼게요."
- 로딩: "잠시만요, 라이언이 정리 중이에요..."
- 빈 상태: "아직 데이터가 없네요. 3분 만에 페르소나 채우러 갈까요?"

### 10.5. 사회적 케어 톤 (브랜드 방향성)

향후 적용. 가이드에 톤만 명시:
- 게임/도박/주식 중독 → 비판적 X, **공감 + 대안**
- 멘탈 케어 → 격려 + 작은 행동 제안
- 고령층·한부모 → 친근한 호칭, 간결한 안내

---

## 11. 접근성 (WCAG 2.2 AA)

### 11.1. 대비

- 본문 vs 배경 ≥ 4.5:1
- 큰 텍스트 ≥ 3:1
- `primary-500` on `neutral-0` ≈ 3.04 → **본문엔 부적합, CTA/카드 외곽선에만**
- `neutral-900` on `neutral-0` ≈ 15+ → 본문 안전
- 다크 카드 `dark-text-100` on `dark-bg-100` ≈ 13+ → 안전

### 11.2. 터치 영역

모든 인터랙티브 요소 최소 44×44px.

### 11.3. 폰트 사이즈

`rem` 단위 (사용자 시스템 폰트 크기 조절 대응). 기본 16px = 1rem.

### 11.4. 키보드 / 스크린 리더

- 모든 interactive 요소에 `aria-label` 또는 시각적 label
- focus ring: `focus:ring-2 focus:ring-primary-100` (모든 button·input)
- 모달 open 시 focus trap

### 11.5. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .pulse-mic { animation: none; }
}
```

---

## 12. 다국어 (i18n)

### 12.1. 라이브러리

`next-intl` (App Router 표준).

### 12.2. 키 구조

`src/messages/{ko,en,vi}.json`. 한국어 기본, 영어·베트남어 후속.

### 12.3. 텍스트 확장 여지

| 언어 | 한국어 대비 |
|------|------------|
| 영어 | +25% |
| 베트남어 | +15% |
| 일본어 | +10% |

→ 텍스트 박스에 충분한 padding. 한 줄 고정 X.

### 12.4. 음성 locale

| locale | `recognition.lang` |
|--------|---------------------|
| ko-KR | `ko-KR` |
| en-US | `en-US` |
| vi-VN | `vi-VN` |

### 12.5. 날짜·화폐

`Intl.DateTimeFormat` · `Intl.NumberFormat`. 한국 원, 영어 USD 표시.

---

## 13. UI 작성 체크리스트 (작업자 B·C)

새 화면을 만들 때:

- [ ] 추천(액션) 카드가 화면 상단에 있는가?
- [ ] 근거(날씨·이유)는 추천 아래·작은 텍스트인가?
- [ ] 모바일 너비 (375~430px)에서 깨지지 않는가?
- [ ] 디자인 토큰만 사용했는가? (직접 hex X)
- [ ] Pretendard 폰트 적용?
- [ ] 접근성: aria-label, contrast 4.5+, 터치 44×44+
- [ ] 다국어 대비: 텍스트 박스에 +25% 여유?
- [ ] Reduced motion 대응?
- [ ] 다크 카드 사용 시 contrast OK?
- [ ] 라이언 톤의 마이크로카피?

---

## 14. 디자인 변경 흐름

1. **노션** 결정 (기획서·화면 IA 갱신)
2. **이 가이드** 갱신 (토큰·컴포넌트 추가 시)
3. **`web/src/app/globals.css`** 코드 적용
4. **mockup HTML** 갱신 (있으면)
5. **각 컴포넌트 코드** 적용

토큰만 추가 → 가이드 + globals.css만.
컴포넌트 변경 → 가이드 + 해당 컴포넌트.

---

## 15. 외부 참고

- [Oura Ring App](https://ouraring.com/) — 다크 데이터 시각화
- [Noom](https://www.noom.com/) — 채팅 카드 UI
- [MyFitnessPal](https://www.myfitnesspal.com/) — 음식 카드
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) — iOS 패턴
- [Calm](https://www.calm.com/) — 정서 마이크로카피
- [Pretendard](https://github.com/orioncactus/pretendard) — 폰트
- [Lucide Icons](https://lucide.dev/) — 아이콘
- [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) — 접근성

---

## 16. 버전 히스토리

| 버전 | 일자 | 변경 |
|------|------|------|
| v0 (스켈레톤) | 2026-05-11 | 빈 스켈레톤 |
| **v1** | **2026-05-11** | Warm Lion 팔레트 · 다크 하이브리드 · 5개 앱 DNA · 풀 컴포넌트·타이포·접근성·i18n · 라이언 SVG 마크 sketch |

---

**다음 단계**: 오다환님 검토 → `globals.css` 토큰 코드 반영 → 메인·회원가입 UI 재설계 (Task #11·#12·#13).
