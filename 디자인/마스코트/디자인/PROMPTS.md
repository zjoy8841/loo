# 데이지 표정·동작 프롬프트 세트

제미나이(Nano Banana / Gemini 2.5 Flash Image)에서 데이지 캐릭터의 일관성을 유지한 채 표정·동작만 바꿔 변형을 생성하기 위한 프롬프트.

## 사용법

1. 첫 생성 — `데이지.png` 또는 `데이지 상반신.png`를 reference로 첨부 + 아래 **공통 prefix** + 상태별 문장
2. 두 번째 이후 — 직전 생성 결과를 reference로 넣으면 일관성이 더 강해짐 (multi-turn editing)
3. 결과는 이 폴더에 `{상태} 데이지.png` 네이밍으로 저장

### 일관성 유지 핵심
- "same character, same outfit, same hair" 명시
- 변경할 부분만 구체적으로 (표정·시선·손 위치)
- 시드 고정 가능한 도구라면 시드 고정

---

## 공통 prefix (매 생성마다 앞에 붙임)

```
Same character as reference. Same pink hair, same pink dress with lace details,
same face proportions, same skin tone. Waist-up portrait, soft blurred background,
front-facing camera angle. Pixar 3D render style, soft lighting.
```

---

## 상태별 프롬프트 6개

### 1. idle — 기본 대기 (`데이지 대기.png`)

```
Neutral relaxed expression, gentle natural smile, looking softly at viewer,
hands relaxed at sides, slight head tilt to the right.
```

### 2. talk — 말하는 중 (`말하는 데이지.png`)

```
Mouth slightly open as if speaking, friendly expression, eyes looking at viewer,
one hand raised near chest in a gentle gesture, mid-conversation pose.
```

### 3. smile — 환한 미소 (`함박웃음 데이지.png`)

```
Wide warm smile showing teeth slightly, eyes slightly crinkled with joy,
cheerful expression, head tilted slightly, hands clasped near chest.
```

### 4. surprise — 놀람 (`놀라는 데이지.png`)

```
Eyes wide open in pleasant surprise, mouth small "o" shape,
eyebrows raised, one hand near mouth, slight head pull back.
```

### 5. thinking — 생각 중 (`생각중인 데이지.png`)

```
Eyes looking up and to the side thoughtfully, lips closed in a small curve,
index finger gently touching chin, contemplative expression.
```

### 6. wave — 인사 (`인사하는 데이지.png`)

```
Warm friendly smile, right hand raised waving at viewer, palm facing forward,
eyes looking directly at viewer, welcoming greeting pose.
```

---

## 파일 구조 (현재)

```
디자인/마스코트/디자인/
├── 데이지.png              ← 원본 (reference 1)
├── 데이지 상반신.png        ← waist-up reference (reference 2)
├── 데이지 대기.png          ← #1 idle
├── 말하는 데이지.png        ← #2 talk
├── 함박웃음 데이지.png      ← #3 smile
├── 놀라는 데이지.png        ← #4 surprise
├── 생각중인 데이지.png      ← #5 thinking
└── 인사하는 데이지.png      ← #6 wave
```

## 후속 작업

- [ ] PNG 6장 → Animated WebP 변환 (state별 loop 합치기)
- [ ] 메인 idle 모드 컴포넌트에 데이지 페르소나 분기 추가
- [ ] 데이지 vs 라이언 분기 조건 확정 (회원가입 선택 / 시간대 / 무작위 중 택1)
