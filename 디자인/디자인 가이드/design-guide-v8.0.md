# 라이언 디자인 가이드 v8.0 — Apple HIG 정렬판

> **상태**: 정식 명세. v7(`old/design-guide.html` Cool Surface 단계) + v7.1 초안(`design-guide-v7.1-초안.md`)의 후속.
> **변경 성격**: 토큰 레이어 재정의 + Apple HIG 정렬. 기존 6 시점 surface · 라이언 마스코트 · Atom Voice Nav · 사이버틱 시그너처 룰은 **유지**, 그 위의 시스템 차원 토큰만 HIG 기준으로 교체.
> **베이스**: Apple Human Interface Guidelines 2025-12 기준 (Typography · Accessibility · Materials · Layout · Color 5개 페이지 1차 fetch 2026-05-13, 정리본 `HIG-fetch-2026-05-13.md`).
> **작성**: 오다환. v7.1 초안 의사결정 5건 모두 채택 + HIG 1차 검증 결과 통합.

---

## 0. v7 → v7.1 → v8.0 개정 요지

| 차수 | 핵심 변경 | 상태 |
|---|---|---|
| v7 | Cool Surface System 전환, Atom Voice Nav 통합, 한글 nav | 본문 = `old/design-guide.html` |
| v7.1 (초안) | 의미론 컬러 레이어 · Dynamic Type · safe area · material · 모션 토큰 · 접근성 정량 룰 — HIG widely-known 표준값 기반 | 초안 `design-guide-v7.1-초안.md` (보존, 본문 통합 안 됨) |
| **v8.0** | v7.1 초안을 Apple HIG **공식 페이지 1차 fetch**로 검증·교정 후 정식 명세화. **4-mode 컬러 구조**, **17pt 대비 경계**, **material 4단계 + Liquid Glass 별도 레이어**, **safe-area env() 의무화**, **hex hard-code 비권장 caveat** 명문화 | **본 문서** |

**v7.1 → v8.0 주요 교정**:

1. WCAG 대비 기준의 큰 텍스트 경계를 **14pt+bold → Apple 17pt 경계**로 교체 + Bold any-size = 3:1 추가.
2. 시스템 Material을 **3단계(thin/regular/thick) → 4단계(ultraThin/thin/regular/thick) + Liquid Glass 별도**로 확장. 블러 px 절대값은 가이드값으로 격하(Apple 미공개).
3. 컬러 토큰 스키마를 **2-mode(light/dark) → 4-mode(default L/D + increased contrast L/D)**로 확장 — Increased Contrast 시스템 설정 대응.
4. 시스템 컬러 hex 직접 사용 금지 caveat 추가 (Apple 공식 가이드: *"Documented color values are for your reference… actual values may fluctuate from release to release"*).
5. 터치 타깃: 44×44pt 기본 + **최소 28×28pt** 명시 (Apple 공식).
6. safe-area 검증을 "iPhone 14 Pro 시뮬레이터 픽셀값" → **`safe-area-inset-*` env() / `safeAreaInsets` API 사용 의무화**로 전환.

---

## 1. 토큰 레이어 (v7.1 7개 → v8.0 8개)

### 1.1 의미론 컬러 — 4-mode 구조

기존 hex 토큰(`--neutral-900`, `--ink-deep` 등) 위에 **역할 기반 토큰**을 두고, 4개 시각 모드 전부 매핑.

```css
:root {
  /* === 라이트 / Default === */
  --ink-primary:    #0F1419;
  --ink-secondary:  #3D4453;
  --ink-tertiary:   #5C6478;
  --ink-quaternary: #8A95A3;
  --surface-base:     #FFFFFF;
  --surface-elevated: #F8FAFC;
  --surface-grouped:  #ECEFF5;   /* iOS systemGroupedBackground 대응 */
  --surface-overlay:  rgba(255,255,255,0.92);
  --separator:        rgba(15,20,25,0.08);
  --fill-primary:     rgba(15,20,25,0.05);
  --fill-secondary:   rgba(15,20,25,0.03);
}

/* === 다크 / Default === */
[data-scheme="dark"] {
  --ink-primary:    #F8FAFC;
  --ink-secondary:  #B0BCC9;
  --ink-tertiary:   #78859A;
  --ink-quaternary: #4F5866;
  --surface-base:     #0B1024;
  --surface-elevated: #171E3A;
  --surface-grouped:  #0F1530;
  --surface-overlay:  rgba(11,16,36,0.88);
  --separator:        rgba(248,250,252,0.10);
  --fill-primary:     rgba(248,250,252,0.06);
  --fill-secondary:   rgba(248,250,252,0.03);
}

/* === 라이트 / Increased Contrast === */
[data-contrast="high"] {
  --ink-primary:    #000000;
  --ink-secondary:  #1A1F26;
  --ink-tertiary:   #2A3340;
  --ink-quaternary: #4D5666;
  --surface-base:     #FFFFFF;
  --surface-elevated: #F3F5FA;
  --surface-grouped:  #E5E9F1;
  --separator:        rgba(0,0,0,0.30);
  --fill-primary:     rgba(0,0,0,0.10);
}

/* === 다크 / Increased Contrast === */
[data-scheme="dark"][data-contrast="high"] {
  --ink-primary:    #FFFFFF;
  --ink-secondary:  #E2E8F0;
  --ink-tertiary:   #B0BCC9;
  --ink-quaternary: #78859A;
  --surface-base:     #000000;
  --surface-elevated: #0B1024;
  --surface-grouped:  #050715;
  --separator:        rgba(255,255,255,0.40);
  --fill-primary:     rgba(255,255,255,0.14);
}

/* === 시점 강제 (기본 동작) === */
/* 6 시점 surface 토큰은 §3에서 정의 */
[data-scene="lunch"] {
  --ink-primary:    #1F2530;
  --surface-base:   #DEE4EE;
  --surface-elevated:#FFFFFF;
}

/* === 시스템 적응 모드 (옵트인) === */
@media (prefers-color-scheme: dark) {
  [data-adapt="system"] {
    /* [data-scheme="dark"] 토큰 자동 매핑 — 시점 강제 우회 */
    --ink-primary:    #F8FAFC;
    --surface-base:   #0B1024;
    /* (이하 동일) */
  }
}
@media (prefers-contrast: more) {
  [data-adapt="system"] {
    /* [data-contrast="high"] 토큰 자동 매핑 */
  }
}
```

**룰**:
- 모든 컴포넌트는 hex 직접 호출 금지. `var(--ink-primary)` 같은 의미론 토큰만 사용.
- 시점 우선순위: 기본 = 시점 강제 (`[data-scene]`). 사용자가 마이페이지 → 디스플레이 설정에서 "시스템 적응" 옵션을 켜야만 `[data-adapt="system"]`이 활성, OS의 light/dark + Increase Contrast 동시 추종.
- **Apple 공식 caveat 박스 (UI에 표기 권장)**: *"본 컬러 토큰 값은 디자인 참고용입니다. 실제 구현은 시스템 컬러 API(`UIColor.label`, `Color.primary` 등)를 호출하세요. iOS 버전에 따라 값이 변할 수 있습니다."*

### 1.2 Dynamic Type — Apple iOS 매핑 1:1

Apple HIG iOS Large(default) 표 그대로 매핑. `rem` 기반 + 헤로만 `clamp()` 상한.

| v8.0 스타일 | iOS Dynamic Type | Default pt | Default px | clamp 범위 (xSmall ~ xxxLarge) | line-height (Leading) |
|---|---|---|---|---|---|
| Display | Large Title | 34 pt | 34 | clamp(31px, 2.125rem, 40px) | 41 pt |
| H1 | Title 1 | 28 pt | 28 | clamp(25px, 1.75rem, 34px) | 34 pt |
| H2 | Title 2 | 22 pt | 22 | clamp(19px, 1.375rem, 28px) | 28 pt |
| H3 | Title 3 | 20 pt | 20 | clamp(17px, 1.25rem, 26px) | 25 pt |
| Lead | Headline | 17 pt (Semibold) | 17 | 1.0625rem | 22 pt |
| Body | Body | 17 pt | 17 | 1.0625rem | 22 pt |
| Callout | Callout | 16 pt | 16 | 1rem | 21 pt |
| Subhead | Subhead | 15 pt | 15 | 0.9375rem | 20 pt |
| Footnote | Footnote | 13 pt | 13 | 0.8125rem | 18 pt |
| Caption | Caption 1 | 12 pt | 12 | 0.75rem | 16 pt |
| Mono | Caption 2 | 11 pt | 11 | 0.6875rem | 13 pt |

**룰**:
- `html { font-size: 100%; }` 기준. 1pt ≈ 1px(웹).
- 헤로 카피만 `clamp()` 상한 두어 큰 디스플레이에서 비대화 방지. 본문·캡션은 **무제한** Dynamic Type — AX1(28pt) ~ AX5(53pt) 범위까지 깨지지 않게.
- 한글 본문 line-height **1.5 유지**, 영문 1.4. HIG의 Leading(pt) 값은 영문 기준 — 한글 다국어는 1.5로 통일.
- 라인 길이: 한글 헤로 **18~24자/줄**, 영문 헤로 40~60자/줄.

**AX(Larger Accessibility) 검증**: 시연 단말에서 iOS 설정 → 손쉬운 사용 → 화면 표시 및 텍스트 크기 → 더 큰 글자 → **AX3까지 카드 깨짐·텍스트 잘림 0건** 필수.

### 1.3 Safe Area — `env()` 의무화

iPhone 14 Pro Dynamic Island + Home Indicator 회피. **고정 픽셀값 사용 금지**.

```css
:root {
  --safe-top:    env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left:   env(safe-area-inset-left, 0px);
  --safe-right:  env(safe-area-inset-right, 0px);
}

.screen-header { padding-top: calc(var(--safe-top) + 8px); }
.atom-voice    { bottom: calc(var(--safe-bottom) + 16px); }
.screen-content {
  padding-left:  calc(var(--safe-left) + var(--gutter-regular));
  padding-right: calc(var(--safe-right) + var(--gutter-regular));
}
```

**참고 디바이스 스펙 (Apple HIG `/layout` Specifications 표)**:

| Model | Portrait | @density |
|---|---|---|
| **iPhone 14 Pro (시연 기준)** | **393 × 852 pt** | 1179 × 2556 px @3x |
| iPhone 14 Pro Max | 430 × 932 pt | 1290 × 2796 px @3x |
| iPhone 16 Pro | 402 × 874 pt | 1206 × 2622 px @3x |
| iPhone Air | 420 × 912 pt | 1260 × 2736 px @3x |
| iPad mini 8.3" | 744 × 1133 pt | @2x |

**Size Class**: iPhone 14 Pro Portrait = **Compact width · Regular height**. v8.0의 기본 레이아웃은 이 조합 기준으로 설계 (iPad 대응은 §6 v9 후보).

### 1.4 콘텐츠 여백 (Gutter)

```css
--gutter-compact: 16px; /* width < 375px (iPhone SE/mini) */
--gutter-regular: 20px; /* iPhone 14/15/16 Pro 표준 (Compact width) */
--gutter-wide:    32px; /* iPad / 데스크 */
```

화면 좌우 여백 = 기본 `--gutter-regular`. 컴팩트 디바이스만 `--gutter-compact`. **모든 적용은 §1.3 safe-area와 합산**해 사용.

### 1.5 시스템 Material — 4단계 + Liquid Glass

Apple HIG는 standard material을 **4단계**로 정의 (`ultraThin · thin · regular · thick`). v7.1의 3단계 → 4단계로 확장.

```css
/* 가이드값 (Apple 미공개, OS 시뮬레이터 비교 캘리브레이션 후 조정) */
--material-ultra-thin: blur(4px)   saturate(120%);
--material-thin:       blur(10px)  saturate(140%);
--material-regular:    blur(20px)  saturate(160%);
--material-thick:      blur(40px)  saturate(180%);
```

**룰**:
- 절대값 박지 말 것 — Apple은 블러 px 미공개. 위 4값은 가이드용, 시뮬레이터 비교 후 캘리브레이션.
- **선택 기준은 의미론 이름**: ultraThin = 라이트 컬러 풀스크린, thin = 라이트 톤 오버레이, regular = 일반 오버레이 (BottomNav, 시트 헤더), thick = 다크 톤 오버레이.
- iOS는 별도로 **Liquid Glass functional 레이어**(2025-06 도입) — 컨트롤·내비게이션 표면 전용. 콘텐츠 레이어 사용 금지. v8.0은 시연 시점에서는 standard material 4종만 사용, Liquid Glass는 시스템 컴포넌트가 자동 채택하는 것만 허용.

**Vibrancy 레벨** (material 위 텍스트/심볼 가이드):
- Labels (4단계): `label (default) · secondaryLabel · tertiaryLabel · quaternaryLabel`
- Fills (3단계): `fill (default) · secondaryFill · tertiaryFill`
- Separator: system default 1단계
- **quaternary는 thin/ultraThin 위 사용 금지** (대비 부족).

### 1.6 모션 타이밍·이징

```css
--motion-fast:   160ms;  /* 버튼 탭, hover */
--motion-base:   280ms;  /* 카드 트랜지션, 페이드 */
--motion-mode:   480ms;  /* 모드 A↔B 전환 */
--motion-hero:   800ms;  /* JARVIS 링, 입자 영웅 빌드인 */

--ease-out:      cubic-bezier(.2, .8, .2, 1);
--ease-in-out:   cubic-bezier(.4, 0, .2, 1);
--ease-snappy:   cubic-bezier(.16, 1, .3, 1);

/* 별도 카테고리 (사용자 인터랙션 아닌 시각 시그너처) */
--motion-orbit-atom:    8000ms; /* Atom Voice Nav wrapper 자전 */
--motion-orbit-sat-1:   3600ms;
--motion-orbit-sat-2:   5000ms;
--motion-orbit-sat-3:   4200ms;
--motion-particle-spin: 75000ms; /* 입자 영웅 자전 60-90s */
```

**룰**: 사용자 인터랙션 반응은 항상 `--motion-fast` 또는 `--motion-base`. 시각 시그너처(자전·공전)는 별도 카테고리. `prefers-reduced-motion: reduce` 시 §4.4 처리 룰 적용.

### 1.7 터치 타깃 + 간격

**Apple HIG iOS 공식**: 기본 44 × 44 pt, **최소 28 × 28 pt**. v8.0은 기본 44×44, 최소 32×32(시연 안전 마진).

```css
--touch-default: 44px;
--touch-minimum: 32px;
--touch-gap-icon:  8px;  /* 아이콘만 있는 버튼 인접 */
--touch-gap-label: 12px; /* 텍스트 라벨 포함 */
```

**룰**:
- 모든 인터랙티브 요소 최소 32×32, 권장 44×44. 더 작은 비주얼은 hit-area를 확장(`::after` overlay).
- BottomNav 5 슬롯 간 최소 8px 보장.
- 빠른 답변 칩 간 8px (v7의 6px → 조정).

### 1.8 z-layer (신설, v8.0)

화면 위계 명확화 — 시점 BG → 콘텐츠 → 머티리얼 오버레이 → BottomNav → Atom → 모달 → Toast.

```css
--z-bg:        0;
--z-content:   10;
--z-overlay:   20;  /* 머티리얼 시트, 풀스크린 sheet */
--z-nav:       30;  /* BottomNav, top app bar */
--z-atom:      40;  /* Atom Voice Nav sphere */
--z-modal:     50;  /* 모달, alert */
--z-toast:     60;  /* 토스트, snackbar */
```

---

## 2. 컬러 시스템 — v7 Iris·Hero 패밀리 + Apple HIG 매핑

### 2.1 Brand (라이언 시그너처 — 변경 없음)

| 토큰 | Hex | 용도 |
|---|---|---|
| `--primary-100` | `#FCE7D2` | Primary 100 (가장 연함) |
| `--primary-300` | `#F2A879` | Primary 300 |
| `--primary-500` ★ | `#E87A3E` | Lion Orange (시그너처) |
| `--primary-600` | `#C8651F` | Hover/Pressed |
| `--primary-700` | `#A04F12` | Active/Deep |
| `--accent-honey` | `#F4B860` | 입자 영웅 dot, 시점 액센트 |
| `--accent-iris-light` | `#5B5FE0 ~ #3D41C5` | 라이트 surface 위 indigo 액센트 |
| `--accent-iris-dark` | `#9094F5 ~ #A8AAF5` | 다크 surface 위 indigo 액센트 |

### 2.2 시스템 컬러 매핑 (Apple HIG `/color` 1:1)

Apple SwiftUI 12개 표준 컬러 + iOS 그레이 6단계와의 매핑. **hex 박는 게 아니라 의미론 토큰을 시스템 API에 위임**한다는 원칙.

| Apple SwiftUI | v8.0 토큰 | Hex 가이드 (참고용) |
|---|---|---|
| `Color.red` | `--system-red` | iOS 17 기준 #FF3B30 / 변경 가능 |
| `Color.orange` | `--system-orange` | #FF9500 |
| `Color.yellow` | `--system-yellow` | #FFCC00 |
| `Color.green` | `--system-green` | #34C759 |
| `Color.mint` | `--system-mint` | #00C7BE |
| `Color.teal` | `--system-teal` | #30B0C7 |
| `Color.cyan` | `--system-cyan` | #32ADE6 |
| `Color.blue` | `--system-blue` | #007AFF (iOS Blue — 라이언 Iris와 의도적 차별) |
| `Color.indigo` | `--system-indigo` | #5856D6 |
| `Color.purple` | `--system-purple` | #AF52DE |
| `Color.pink` | `--system-pink` | #FF2D55 |
| `Color.brown` | `--system-brown` | #A2845E |

> ⚠️ **Apple 공식 caveat**: 위 hex 값은 *디자인 참고용*. 네이티브 구현은 시스템 API를 호출 (`UIColor.systemRed` 등) — OS 업데이트 시 값이 변할 수 있음. 웹 시연용 CSS에서만 위 hex를 사용하고, 네이티브 포팅 시 시스템 토큰으로 교체.

### 2.3 상태 컬러 (의미론 — 변경 없음, v7 유지)

| 토큰 | 라이트 hex | 다크 hex | 용도 |
|---|---|---|---|
| `--success` | `#2E7D5B` | `#4FD1A4` | 성공, 완료 |
| `--warning` | `#E0A341` | `#FACC15` | 경고, 주의 |
| `--danger` | `#C44536` | `#FF6B5C` | 에러, 삭제 |
| `--info` | `#3F43BD` | `#A8AAF5` | 알림, 라이언 인사이트 |

### 2.4 iOS 시맨틱 라벨/구분선 (Apple HIG `/color` 표 1:1)

| Apple UIKit | v8.0 매핑 |
|---|---|
| `label` | `--ink-primary` |
| `secondaryLabel` | `--ink-secondary` |
| `tertiaryLabel` | `--ink-tertiary` |
| `quaternaryLabel` | `--ink-quaternary` |
| `placeholderText` | `--ink-tertiary` (동일) |
| `separator` | `--separator` |
| `opaqueSeparator` | `--separator` (불투명 surface 위) |
| `link` | `--accent-iris-light` (라이트) / `--accent-iris-dark` (다크) |

### 2.5 배경 컬러 계층 (Apple HIG `system` + `grouped` 셋 매핑)

iOS는 **system / grouped × primary / secondary / tertiary = 6 background tokens**.

| Apple UIKit | v8.0 매핑 | 용도 |
|---|---|---|
| `systemBackground` | `--surface-base` | 전체 view 베이스 |
| `secondarySystemBackground` | `--surface-elevated` | view 내 그룹 |
| `tertiarySystemBackground` | `--fill-secondary` | grouped 내 그룹 |
| `systemGroupedBackground` | `--surface-grouped` | grouped table view 베이스 |
| `secondarySystemGroupedBackground` | `--surface-base` | grouped table 내 셀 |
| `tertiarySystemGroupedBackground` | `--surface-elevated` | grouped table 셀 내 강조 |

---

## 3. 6 시점 Surface (v7 그대로 유지)

라이트 4 + 다크 2. 의미론 토큰 `--ink-primary`, `--surface-base`, `--surface-elevated`, `--accent-iris-*`로 매핑되어 컴포넌트가 자동 적응.

| 시점 | `--surface-base` | `--ink-primary` | `--accent` |
|---|---|---|---|
| AM 아침 (06-08) | `#F8FAFC` warm-white-cool | `#0F1419` | `#5B5FE0` |
| Late-AM (10-11) | `#E8ECF3` paper | `#1A1F26` | `#4A4ED0` |
| Lunch (12-13) ★ | `#DEE4EE` fresh cool | `#1F2530` | `#3F43BD` |
| PM (14-16) | `#D2DAE6` cool shadow | `#1A1F26` | `#3D41C5` |
| Evening (19-21) | `#222A38` blue charcoal | `#E8EEF5` | `#9094F5` |
| Night (22+) | `#0B1024` deep midnight | `#DDE3EF` | `#A8AAF5` |

**Hero 풀블리드 그라데이션** (v7 유지):

| 시점 | Hero 그라데이션 |
|---|---|
| Morning rain | `#8A95A3 → #5C6478 → #3D4453` steel gray |
| Late-AM golden | `#6E8AC0 → #4A6BA0 → #2D4670` slate blue |
| Lunch ★ | `#6F8AAE → #3F5C82 → #1E2E48` deep slate |
| Afternoon | `#7B97BD → #4D6A8E → #2A3D5A` mid blue |
| Evening | `#78A0C9 → #5878A0 → #384668 → #1E2438` dusk blue |
| Night | `#2D2A4A → #14132B → #0A0A1A` deep navy |

**시점 vs 시스템 적응 우선순위**: §1.1 동일 — 기본은 시점 강제, "시스템 적응" 옵션 ON일 때만 OS appearance 추종.

---

## 4. 접근성 정량 룰 (Apple HIG 공식 기준)

### 4.1 대비 — Apple WCAG AA 표 (★ v7.1 §2.1 교체)

Apple Accessibility Inspector 기준:

| 텍스트/요소 | 최소 대비 |
|---|---|
| **17 pt 이하** (모든 weight) | **4.5 : 1** |
| **18 pt 이상** (모든 weight) | **3 : 1** |
| **Bold (모든 크기)** | **3 : 1** |
| UI 컴포넌트·아이콘 외곽선 | **3 : 1** |
| 데코레이션·비활성 | 의무 없음 (시각 위계만) |

> 출처: developer.apple.com/design/human-interface-guidelines/accessibility (fetch 2026-05-13).
> **W3C WCAG 1.4.3의 "18pt OR 14pt+bold" 기준과 다름** — Apple은 17pt 컷오프 + Bold any-size = 3:1 룰 사용. 본 가이드는 Apple 기준 채택.

**Increased Contrast 시스템 설정**: 사용자가 ON 시 `[data-contrast="high"]` 토큰(§1.1) 활성, 모든 의미론 컬러가 한 단계 강한 대비로 자동 전환.

**검증 도구**: WebAIM Contrast Checker 또는 Apple Accessibility Inspector. 6 시점 surface × 4 모드(default L/D + high L/D) 매트릭스로 검증 (라이트 시점 ↔ Light Default / Light High, 다크 시점 ↔ Dark Default / Dark High).

### 4.2 터치 타깃

| Apple iOS | v8.0 룰 |
|---|---|
| Default 44 × 44 pt | 모든 주요 액션 (Primary 버튼, BottomNav 슬롯, FAB) |
| **Minimum 28 × 28 pt** | 시각 크기만 작게 — hit-area는 항상 32 이상 확보 |

### 4.3 Dynamic Type 검증

§1.2의 11 스타일 모두 AX1 ~ AX5 범위에서 깨지지 않게.

- [ ] iOS 설정 → 손쉬운 사용 → 화면 표시 및 텍스트 크기 → **AX3까지 홈 화면 통과**
- [ ] 회원가입 7단계 폼 라벨/플레이스홀더 잘림 없음
- [ ] 빠른 답변 칩 멀티라인 허용 (truncate 금지)

### 4.4 Reduce Motion

`prefers-reduced-motion: reduce` 시:

**정지**:
- 입자 영웅의 자전·트윙클
- Atom Voice Nav 자전·위성 공전 (3개 모두)
- JARVIS 링 확장
- 헤로 BG 비·구름·달 애니메이션

**유지**(인지 도움):
- 페이드 인/아웃
- LIVE 점 깜박임 (≤0.5s 주기)
- 모드 A↔B 트랜지션 페이드

### 4.5 VoiceOver 라벨 (컴포넌트 인벤토리)

| 컴포넌트 | VoiceOver 라벨 패턴 |
|---|---|
| Atom Voice Nav (sphere) | "라이언과 대화 시작, 버튼" |
| MetricCard | "{지표명} {값}, {N} 중 {n}번째 카드" 예: "수면 7시간 12분, 4 중 1번째" |
| TagChip | "{태그명}, {선택됨/선택 안 됨}" |
| SceneCard | "{시점명} 화면으로 이동, 버튼" |
| BottomNav 항목 | "{탭명}, {현재 탭/탭 N개 중 M번째}" |
| 빠른 답변 칩 | "{답변 텍스트}, 버튼" |
| 라이언 인사이트 박스 | "라이언 인사이트, {텍스트}" |

**룰**: 색·아이콘 단독으로 의미 전달 금지. 상태는 항상 **색 + 아이콘 + 텍스트** 셋 중 둘 이상.

### 4.6 입력 다양성

- 모든 인터랙티브는 키보드 Tab/Enter, VoiceOver Rotor, Voice Control "Tap {라벨}"로 동등 도달 가능.
- Atom Voice Nav는 음성 모드 외에도 화면 탭으로 활성.
- 회원가입 다음 단계 버튼은 키보드 Enter로도 진행 (form submit 필수).

---

## 5. v8.0에서 유지하는 v7 룰 (요약)

다음은 v7에서 그대로 가져온 항목 — 본 문서에서 재정의 안 함, v7 본문(`old/design-guide.html`) 해당 섹션 참조:

- **0. 컨셉 맵** — 3 모드(Dashboard / Immersive / Conversation)
- **1.1 디자인 원칙**, **1.2 흡수한 DNA**
- **1.6 라이언 마스코트** (풀컬러 / 모노 두 가지, 최소 크기 32/40px)
- **1.7 사이버틱 시그너처** (OLED 블랙, HUD 그리드, 입자 영웅, Mono 라벨, 단색 카드)
- **1.8 Cool Surface 전면 전환** + **Iris 액센트** + **Atom Voice Nav 3D 자전**
- **1.8.5 한글 nav** (홈 · 장면 · (sphere) · 코치 · 나)
- **MODE A·B·C 각 룰** — 컴포넌트, 인터랙션 톤, 모킹업
- **컴포넌트 인벤토리** (Button, Field, Chip, MetricCard, SceneCard 등)
- **i18n 룰** (§5 v7.1 §2.7 — 한국어 호명 풀 빈도, 영문 1/2, 베트남어 영문 기준 시작)

---

## 6. v9 후보 (v8.0에서 보류)

- **iOS 18 launcher icon 3 변형** — 라이트 / 다크 / tinted. 1024×1024 마스터.
- **반응형 / iPad·폴드 대응** — Size class Regular×Regular 전용 레이아웃 분기.
- **i18n 확장** — 베트남어 톤 가이드, 문화별 색상 의미 표.
- **APCA (Accessible Perceptual Contrast Algorithm)** — Apple이 WCAG 외 보조 표준으로 언급. 향후 검증 표준 추가 검토.
- **Liquid Glass functional 레이어 능동 채택** — 현재는 시스템 자동 적용만 허용. 커스텀 컨트롤에 적용 시 룰 정의 필요.
- **MaterialThemes 토큰 캘리브레이션** — 시뮬레이터 스크린샷 비교로 §1.5 4단계 blur 가이드값 정밀화.

---

## 7. 적용 순서

1. **본 문서 검토** (오다환) → 의사결정 추가 충돌 시 §8에 기록
2. **v8.0.html 작성** — v7 HTML 베이스에 v8.0 토큰·룰 시각화 (별도 산출물)
3. **노션 인덱스 갱신** — Active Policy 표의 디자인 가이드 행 **v7 → v8.0** 갱신, 변경 요약 작성
4. **GitHub Pages 반영** — `design-guide-v8.0.html`을 배포 경로에 추가
5. **코드 적용** — `web/src/app/globals.css`에 의미론 토큰 + 모션 토큰 도입, 컴포넌트 단계 마이그레이션

---

## 8. v7.1 의사결정 5건 — v8.0 재확정

오다환 결정 (2026-05-13, v7.1에서 확정, v8.0에서도 동일):

| # | 충돌 | 결정 | v8.0 본문 위치 |
|---|---|---|---|
| 1 | 폰트 | ✅ **Pretendard 유지** (모노만 시스템 모노) | §1.2 (변경 없음) |
| 2 | 폰트 크기 | ✅ **본문·캡션 rem (Dynamic Type 허용) / 헤로만 clamp() 상한** | §1.2 표 |
| 3 | 사이버틱 | ✅ **항상 ON 유지** + reduce-motion에서만 정지 | §4.4 |
| 4 | 카피 톤 | ✅ **라이언 1인칭 호명·이모지 1개 유지** + 영문판 호명 빈도 1/2 | §5 (v7 유지 참조) |
| 5 | 다크/라이트 | ✅ **시점(time of day) 강제 기본** + "시스템 적응 모드" 옵션 | §1.1 토큰 매핑 |

---

## 9. fetch 한계 — v8.0 해소 상태

v7.1 §6의 4개 항목 모두 2026-05-13 Apple HIG 공식 페이지 fetch로 검증·교정 완료:

- [x] **WCAG AA 대비 표** → Apple 17pt 경계로 §4.1 갱신 (14pt+bold 표현 폐기)
- [x] **Dynamic Type 11 스타일 pt 값** → iOS Large default 11스타일 §1.2에 정확 반영, AX1·AX5 범위 명시
- [x] **시스템 Material 단계** → 4단계(`ultraThin/thin/regular/thick`) + Liquid Glass 별도 레이어로 §1.5 갱신, 블러 px는 가이드값으로 격하
- [x] **safe-area-inset** → iPhone 14 Pro 393×852pt 확인, **`env()` 의무화 룰**로 §1.3 갱신

**상시 검증 권장**: Apple HIG는 OS 메이저 업데이트마다 변경. 시연 D-day(2026-05-29) 직전 1회 재fetch + iOS 18 신규 변경사항 점검.

---

**문서 끝.** v8.0.html 시각화 산출물은 별도 파일(`design-guide-v8.0.html`)로 작성됨 (v7 HTML 베이스 + 본 문서 토큰 반영).
