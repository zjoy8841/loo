# 라이언 디자인 가이드 v7.1 — 명세 초안

> **상태**: 초안. v7 본문(`old/design-guide/design-guide.html`)에는 아직 반영 안 됨.
> **목적**: Apple HIG 표준과 정렬해 v7을 즉시·저비용으로 보강.
> **기준**: 2026-05-13 Agent 비교 분석 보고 (HIG widely-known 표준값 기반, Apple 공식 페이지 사람 검증 1회 권장).
> **작성**: 오다환 (기획·디자인 가이드라인 담당). 검토 후 노션 인덱스 Active Policy 표 갱신 → GitHub Pages 반영 → 코드 적용 순.

---

## 0. 개정 요지 (한눈에)

v7은 컬러 시스템·시점별 surface·라이언 마스코트 룰이 이미 정교하지만, **HIG의 시스템 차원 토큰 레이어**(의미론 컬러·Dynamic Type·safe area·material 단계·모션 타이밍)와 **접근성 정량 룰**이 빈약하다. v7.1은 본문 룰을 다시 쓰지 않고 **토큰 레이어 7개를 추가**해서 다음 두 가지를 가능하게 한다:

1. 라이트/다크 자동 토글 (`prefers-color-scheme` 추종 옵션)
2. 사용자 폰트 확대(75~310%)·VoiceOver·reduce-motion에서도 깨지지 않는 화면

신설 / 갱신되는 v7 섹션은 **1.3 컬러 / 1.4 타이포 / 1.5 스페이싱 / 7. 접근성** 4개. 컴포넌트·시점 surface·라이언 마스코트 룰은 변경 없음.

---

## 1. 신설 토큰 — 7가지 레이어

### 1.1 의미론 컬러 레이어 (1.3 컬러 시스템 상단에 신설)

기존 hex 토큰(`--neutral-900`, `--ink-deep` 등) 위에 **역할 기반** 토큰을 한 층 더 둔다. 시점별 surface는 이 의미론 레이어에 매핑되어 자동 적응.

```css
:root {
  /* 라이트 모드 기본 */
  --ink-primary:    var(--neutral-900);   /* 본문, 헤로 */
  --ink-secondary:  var(--neutral-700);   /* 캡션, 보조 */
  --ink-tertiary:   var(--neutral-500);   /* 메타, placeholder */
  --ink-quaternary: var(--neutral-400);   /* 비활성 */
  --surface-base:     #FFFFFF;            /* 가장 아래 배경 */
  --surface-elevated: #F8FAFC;            /* 카드·시트 */
  --surface-overlay:  rgba(255,255,255,0.92); /* 블러 위 */
  --separator:       rgba(15,20,25,0.08);
  --fill-primary:    rgba(15,20,25,0.05);
}

[data-scheme="dark"] {
  --ink-primary:    #F8FAFC;
  --ink-secondary:  #B0BCC9;
  --ink-tertiary:   #78859A;
  --ink-quaternary: #4F5866;
  --surface-base:     #0B1024;
  --surface-elevated: #171E3A;
  --surface-overlay:  rgba(11,16,36,0.88);
  --separator:       rgba(248,250,252,0.10);
  --fill-primary:    rgba(248,250,252,0.06);
}

/* 시점별 surface 위에 의미론 레이어를 다시 매핑 */
[data-scene="lunch"] {
  --ink-primary:    #1F2530;
  --surface-base:   #DEE4EE;
  --surface-elevated:#FFFFFF;
}

/* "시스템 적응 모드" 옵션 — 사용자가 설정에서 켰을 때만 활성.
   기본은 시점 강제(time of day). 옵션 ON일 때만 OS appearance 추종. */
[data-adapt="system"] {
  /* prefers-color-scheme에 따라 [data-scheme="dark"] 토큰 자동 적용 */
}
@media (prefers-color-scheme: dark) {
  [data-adapt="system"] {
    --ink-primary:    #F8FAFC;
    --ink-secondary:  #B0BCC9;
    --surface-base:     #0B1024;
    --surface-elevated: #171E3A;
    /* (이하 [data-scheme="dark"] 동일 매핑) */
  }
}
```

**룰**: 모든 컴포넌트는 hex 직접 호출 금지. `var(--ink-primary)` 같은 의미론 토큰만 사용. 이미 정의된 시점별 hex는 의미론 토큰의 매핑 값으로만 존재.

**시점 vs 시스템 적응 우선순위**: 기본은 시점 강제(`[data-scene="*"]`). 사용자가 마이페이지 → 디스플레이 설정에서 "시스템 적응" 옵션을 켤 때만 `[data-adapt="system"]`이 활성되어 시점 매핑을 우회하고 OS 라이트/다크를 추종.

### 1.2 Dynamic Type 베이스 (1.4 타이포 표 갱신)

기존 px 고정 → rem 기반 + clamp() 상한. iOS 텍스트 크기 슬라이더 75~310% 범위에서 작동.

| 스타일 | v7 (현재) | v7.1 (HIG 정렬) | iOS 매핑 |
|---|---|---|---|
| Display | 32px / 800 | `clamp(28px, 2rem, 40px)` / 800 | Large Title (34pt) |
| H1 | 24px / 800 | `clamp(22px, 1.5rem, 30px)` / 800 | Title 1 (28pt) |
| H2 | 20px / 700 | `clamp(18px, 1.25rem, 24px)` / 700 | Title 2 (22pt) |
| Body | 16px / 500 | `1rem (17px)` / 500 | Body (17pt) |
| Caption | 13px / 500 | `0.8125rem (13px)` / 500 | Footnote (13pt) |
| Mono | 12px / 700 | `0.75rem (12px)` / 700 | Caption 1 (12pt) |

**룰**: `html { font-size: 100%; }` 기준. 헤로 카피만 `clamp()` 상한 두고 일부 확대 허용. 본문·캡션은 무제한 Dynamic Type. 한글 본문 line-height **1.5 유지**, 영문 1.4.

**라인 길이**: 한글 헤로 **18~24자/줄**, 영문 헤로 **40~60자/줄**.

### 1.3 Safe Area 토큰 (1.5 스페이싱에 추가)

시연 단말 iPhone 14 Pro의 Dynamic Island + Home Indicator 회피.

```css
:root {
  --safe-top:    env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left:   env(safe-area-inset-left, 0px);
  --safe-right:  env(safe-area-inset-right, 0px);
}

/* 적용 예 */
.screen-header { padding-top: calc(var(--safe-top) + 8px); }
.fab-voice     { bottom: calc(var(--safe-bottom) + 16px); }
.screen-content{ padding-left: calc(var(--safe-left) + 16px); padding-right: calc(var(--safe-right) + 16px); }
```

**모드 B(풀블리드) 헤로 위치 룰 갱신**: "상단 30%" → "상단 `calc(var(--safe-top) + 24px)`부터".

### 1.4 콘텐츠 여백 토큰 (1.5 스페이싱에 추가)

현재 wrap 32px만 정의됨 (데스크탑 기준). 모바일 화면 본문 여백 신설.

```css
--gutter-compact: 16px; /* iPhone SE / mini */
--gutter-regular: 20px; /* iPhone 14/15 Pro 표준 */
```

**룰**: 화면 좌우 여백은 기본 `--gutter-regular`. 컴팩트 디바이스(width < 375px)에서만 `--gutter-compact`.

### 1.5 시스템 Material 블러 토큰 (1.5에 신설 1.5.1)

기존 `backdrop-filter: blur(20px)` 하드코딩 → 3단 토큰화.

```css
--material-thin:    blur(8px)  saturate(140%);
--material-regular: blur(20px) saturate(160%);
--material-thick:   blur(40px) saturate(180%);
```

**룰**: BottomNav·시트 위 헤더 = `--material-regular`. 키보드 위 입력바 = `--material-thin`. 모드 A→B 트랜지션 중 = `--material-thick`.

### 1.6 모션 타이밍·이징 토큰 (1.5에 신설 1.5.2)

현재 산문 "200~400ms"만 있음 → 카테고리별 표준화.

```css
--motion-fast:   160ms;  /* 버튼 탭, hover */
--motion-base:   280ms;  /* 카드 트랜지션, 페이드 */
--motion-mode:   480ms;  /* 모드 A↔B 전환 */
--motion-hero:   800ms;  /* JARVIS 링, 입자 영웅 빌드인 */

--ease-out:      cubic-bezier(.2, .8, .2, 1);   /* 기본 */
--ease-in-out:   cubic-bezier(.4, 0, .2, 1);    /* 양방향 트랜지션 */
--ease-snappy:   cubic-bezier(.16, 1, .3, 1);   /* 음성 FAB 활성 */
```

**룰**: Atom Voice Nav의 8s 자전, 3.6/5/4.2s 위성 공전은 별도 카테고리(`--motion-orbit-*`). 사용자 인터랙션 반응은 항상 `--motion-fast` 또는 `--motion-base`.

### 1.7 터치 타깃 간격 (1.5에 추가)

44×44pt는 이미 명시. 인접 인터랙티브 간 간격 신설.

```
--touch-gap-icon:  8px;  /* 아이콘만 있는 버튼 인접 */
--touch-gap-label: 12px; /* 텍스트 라벨 포함 */
```

**룰**: BottomNav 5 슬롯 간 최소 8px 보장. 빠른 답변 칩(.s5-quicks) 간 6px → **8px로 조정**.

---

## 2. 접근성 정량 룰 — 7. 접근성 섹션 보강

### 2.1 대비 (WCAG AA 의무)

| 텍스트/요소 | 최소 대비 |
|---|---|
| 본문(14pt 미만) | **4.5 : 1** |
| 큰 텍스트(18pt+ 또는 14pt+ bold) | **3 : 1** |
| UI 컴포넌트·아이콘 외곽선 | **3 : 1** |
| 데코레이션·비활성 | 의무 없음 (시각 위계만) |

**검증 도구**: WebAIM Contrast Checker 또는 stark.co 사용. v7.1 도입 후 컬러 토큰 매핑 표에 대비 값 컬럼 추가.

### 2.2 Dynamic Type 검증

시연 단말에서 **iOS 설정 → 손쉬운 사용 → 화면 표시 및 텍스트 크기 → 더 큰 글자**를 켜고 **AX3** 위치까지 카드 깨짐·텍스트 잘림 0건이어야 통과. 9. 체크리스트에 항목 추가:

- [ ] iOS Dynamic Type AX3에서 홈 화면 통과
- [ ] 회원가입 7단계 폼 라벨/플레이스홀더 잘림 없음

### 2.3 VoiceOver 라벨 예시 (컴포넌트 인벤토리에 행 추가)

각 컴포넌트 사용 시 권장 라벨:

| 컴포넌트 | VoiceOver 라벨 패턴 |
|---|---|
| FAB(음성) | "라이언과 대화 시작, 버튼" (이미 v7에 명시) |
| MetricCard | "{지표명} {값}, {순서} 중 {n}번째 카드" 예: "수면 7시간 12분, 4 중 1번째 카드" |
| TagChip | "{태그명}, {선택됨/선택 안 됨}" |
| SceneCard | "{시점명} 화면으로 이동, 버튼" |
| BottomNav 항목 | "{탭명}, {현재 탭/탭 N개 중 M번째}" |
| 빠른 답변 칩 | "{답변 텍스트}, 버튼" |

**룰**: 색·아이콘 단독 의미 전달 금지(예: 빨간 점만으로 알람 표시 X — "알람 켜짐" 라벨 동반).

### 2.4 Reduce Motion (이미 명시, 강화)

`prefers-reduced-motion: reduce` 시 정지:
- 입자 영웅의 자전·트윙클
- Atom Voice Nav 자전·위성 공전
- JARVIS 링 확장
- 헤로 BG 비·구름·달 애니메이션

**유지**(정지하지 않음):
- 페이드 인/아웃 (인지 도움)
- LIVE 점 깜박임(0.5초 이하면 무해)
- 모드 트랜지션 페이드

### 2.5 입력 다양성 (신설)

- 모든 인터랙티브는 **터치 외**: 키보드 Tab/Enter, VoiceOver Rotor, Voice Control "Tap {라벨}"로 동등 도달 가능해야 함.
- 음성 FAB는 음성 모드 외에도 화면 탭으로 활성 가능 (이미 명시).
- 회원가입 다음 단계 버튼은 키보드 Enter로도 진행 (form submit 필수).

### 2.6 색 단독 의미 금지

상태 전달은 항상 **색 + 아이콘 + 텍스트** 셋 중 둘 이상.
- 좋음: 초록 점 + 체크 아이콘 + "완료"
- 나쁨: 초록 점만으로 "완료"

---

## 3. v7과 충돌하는 5가지 의사결정 — 확정 (2026-05-13)

오다환 결정: **5건 모두 권장안 채택**.

| # | 충돌 | 결정 | 본문 반영 위치 |
|---|---|---|---|
| 1 | 폰트 | ✅ **Pretendard 유지** (모노만 시스템 모노). 한글 자산 차별화 우선 | v7 1.4 그대로 유지 |
| 2 | 폰트 크기 | ✅ **본문·캡션 rem (Dynamic Type 허용) / 헤로만 clamp() 상한** | 1.2 표 확정값 적용 |
| 3 | 사이버틱 | ✅ **항상 ON 유지** + reduce-motion에서만 정지. 별도 옵션 없음 | 2.4 그대로, 7. 접근성에 명문화 |
| 4 | 카피 톤 | ✅ **라이언 1인칭 호명·이모지 1개 유지** + 영문판 호명 빈도 1/2 | 6. 보이스 톤에 i18n 룰 추가 |
| 5 | 다크/라이트 | ✅ **시점(time of day) 강제 기본** + "시스템 적응 모드" 옵션 설정에 추가 | 1.1 의미론 컬러 레이어 옵션 매핑 추가 |

---

### 2.7 i18n 카피 톤 룰 (6. 보이스 톤에 추가)

- **한국어판**: 라이언이 사용자를 **"{이름}님"** 으로 호명. 친근한 1인칭("저는", "제가") 유지. 이모지는 메시지당 0~1개.
- **영문판(en-US)**: 호명 빈도 한국어판의 **1/2**(매 메시지 X, 첫·마지막·중요 컨텍스트에서만). 1인칭은 "I"로 단순화. 이모지는 메시지당 0~1개 동일.
- **다국어 i18n(추후 베트남어)**: 영문판 빈도 기준으로 시작, 현지 톤 검토 후 별도 룰.

**금지**: 호명 남용 ("다하님, 다하님, ..."), 라이언 외 인격 호명, 이모지 2개 이상 연속.

---

## 4. v8 후보 (이번엔 보류)

다음 개정에서 다룰 항목 (시연 D-day 이후):

- **iOS 18 launcher icon 3 변형** — 라이트 / 다크 / tinted. 1024×1024 마스터.
- **반응형 / 폴드·태블릿 대응**
- **i18n inclusion 확장** — 영문 톤 가이드, 문화별 색상 의미 표
- **prefers-color-scheme 추종 옵션** UI

---

## 5. 적용 순서 (제안)

1. **이 초안 검토** (오다환) → 의사결정 5건 확정
2. **v7 본문 통합** → `design-guide.html` 업데이트 (의미론 컬러 레이어, 토큰 표, 접근성 정량 룰)
3. **노션 인덱스 갱신** — Active Policy 표의 디자인 가이드 행을 **v7 → v7.1**로, 변경 요약 작성 (MCP 인증 후)
4. **GitHub Pages 반영** — `docs/design-guide/design-guide.html`을 새 위치(`디자인/old/design-guide/`)에서 빌드 또는 재배포 경로 재정렬
5. **코드 적용** — `web/src/app/globals.css`에 의미론 토큰 5종 + 모션 토큰 도입. v.5.1 시안 클래스에도 단계적 마이그레이션.

---

## 6. fetch 한계 (재확인 필수 항목)

본 초안의 HIG 수치들은 widely-known 표준값 기반이지만, **v7 본문 통합 전 한 번 사람이 Apple HIG 사이트를 열어 검증**해야 안전한 항목:

- [ ] WCAG AA 대비 표 — 14pt+bold 경계
- [ ] Dynamic Type 11개 텍스트 스타일 정확한 pt 값
- [ ] 시스템 Material 5단계 정확한 블러 강도
- [ ] safe-area-inset 동작 검증 (iPhone 14 Pro 시뮬레이터)

검증 URL: `developer.apple.com/design/human-interface-guidelines/{layout, typography, color, materials, accessibility}`

---

**문서 끝.** 다음 단계로 이 초안 검토 의견 주시면 v7 본문 통합으로 진행합니다.
