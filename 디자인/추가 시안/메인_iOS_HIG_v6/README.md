# 메인 화면 v6 — iOS HIG × Editorial Blue (10회 반복)

**날짜**: 2026-05-15
**대상 화면**: Ⓐ AI 비서 대화 입구
**디자인 방향**: Editorial Blue 팔레트 + Apple HIG iOS 17 컴플라이언스
**도구**: Google Stitch (Gemini 3.1 Pro) MCP + Apple 수석 디자이너 시점 critique 루프

## 결론

| 평가 | 결과 |
|---|---|
| 최종 best shot | **`iterations/v6.10.html`** (Score 9.5/10) |
| 다크 모드 변형 | **`iterations/v6.7.html`** (Score 9.0/10 다크 동급) |
| 점수 추이 | 6.5 → 8.0 → 8.3 → 8.6 → 8.9 → 9.0 → 9.0(dark) → 9.1 → 9.3 → 9.5 |
| Stitch 화면 ID (v6.10) | `a0eab17a000e47778d36eb3a247e5a44` |
| Stitch 디자인 시스템 ID | `assets/15471170651946998589` (Editorial Blue · iOS HIG) |

## Iteration 로그

| Ver | Score | 키 변화 | 약점 → 다음 지시 |
|---|---|---|---|
| v6.1 | 6.5 | 첫 생성, iOS 표준 탭바·20pt 마진·슬레이트 블루 적용 | 마스코트 텍스트 오염, OS.ONE wordmark, 한 viewport 안 fit |
| v6.2 | 8.0 | wordmark 제거, placeholder 정화, viewport fit, weight 통일 | mascot 너무 약함, time 중복, stats 중복 |
| v6.3 | 8.3 | "수요일·8:14" 통합, stats 제거, chips dot, composer 강조 | mascot 여전 약함, status bar 부재 |
| v6.4 | 8.6 | **Status bar + Dynamic Island** 추가, mascot 이중 레이어, composer 검색 아이콘 제거 | dot 잔존, mascot inner light 작음, chips 분리 카드 |
| v6.5 | 8.9 | **Inset Grouped List** (Apple Settings 패턴), mascot inner light 80pt, dot 제거 | mascot light "달" 너무 강, composer accent 미흡 |
| v6.6 | 9.0 | mascot 톤다운, composer dual-depth, chevron 강화, gap 차별화 | 미세 polish 한계 — 차원 변경 필요 |
| v6.7 | 9.0 (dark) | **다크 모드 변형** (#0E141B, slate-light #88A0B5) | 다크 mascot light가 진짜 "달" 효과 — 강점 전환 |
| v6.8 | 9.1 | 한국어 폰트 스택 (-apple-system, Apple SD 산돌고딕 Neo), line-height 1.55, "무엇이든 물어보세요" | composer accent 옅음 |
| v6.9 | 9.3 | **Craft Layer** (paper grain 3% noise, breath aura 240pt, non-shadow shadow) | aura 경계 약간 명확 |
| v6.10 | 9.5 | aura 부드러운 fade, "라이언" 탭 라벨 accent, mic accent, editorial vertical mark | **최종** |

## v6.10 디자인 결정 요약

### Apple HIG 컴플라이언스 (모두 적용)
- iOS 표준 type scale (Large Title 34 / Title 2 22 / Body 17 / Subhead 15 / Footnote 13)
- 20pt 페이지 마진 (Apple), NOT 32pt (web)
- 모든 인터랙티브 ≥ 44pt 터치 타깃
- Status bar + Dynamic Island (37×120pt) + signal·wifi·battery SF Symbols
- Tab bar 5개 동일 위계 (FAB 거부 — Material/web 안티패턴), 반투명 material `backdrop-filter: blur(40px) saturate(180%)`
- Inset Grouped List (Apple Settings/Reminders 패턴) — 1 surface card + hairline 0.5pt 좌인셋 20pt
- Continuous corner radius 12pt (cards), 18pt (chips), full pill (composer)
- Korean 가독: line-height 1.55, letter-spacing -0.018~-0.022em on titles
- 한국어 폰트 스택: `-apple-system, "Apple SD Gothic Neo", "Pretendard", Inter`

### Editorial Blue 팔레트
- Background mineral: `#F4F6F9` (cool paper, NOT pure white)
- Surface: `#FFFFFF`
- Accent slate blue: `#3A5A7A` (절제된 사용 — 활성/CTA만)
- Primary deep text: `#1C2A3A`
- Secondary: `#6B7A8B`, Tertiary: `#A8B2BE`
- Hairline: `#E5E9EE`
- Dark mode: BG `#0E141B`, surface `#1A222D`, accent `#88A0B5`

### 라이언 마스코트 처리 (placeholder 단계)
- 3-layer composition:
  - Outer halo: 240pt radial glow + breath animation 6s ease-in-out
  - Mid halo: 180pt soft accent
  - Inner light: 60pt with white core 16pt (lit "moon" feel)
- 캐릭터 일러스트가 들어올 자리. 추후 Recraft + Rive 자산 도착 시 교체.

### Craft Details
- Paper grain noise overlay (SVG feTurbulence 3% opacity, multiply blend)
- Non-shadow shadow on inset list (`0 1px 2px + 0 8px 24px` at 4% black)
- Composer subtle radial gradient highlight inside
- Vertical editorial accent mark (2×24pt slate at 50%)

## 학습된 패턴 (다음 iteration 가속용)

1. **Stitch 첫 generate는 wordmark·brand mark를 자동 합성하는 경향** → 프롬프트 첫 줄에 "NO wordmark in nav" 명시 필수
2. **Stitch generate_variants EXPLORE는 콘텐츠를 새로 작성** → REFINE 사용 또는 콘텐츠 보존을 prompt에 강하게 박기
3. **iOS = 5개 동일 위계 탭바** (FAB는 Material/Android 패턴) — 반복적으로 체크
4. **Korean line-height ≥ 1.5** Hangul 베이스라인 처리 위해
5. **Apple "non-shadow shadow"**: `0 1px 2px + 0 8px 24px` at 4% — 떠 있는 느낌 절제하게
6. **DOM 패치(edit_screens 일부)는 화면 리소스에 영속화 안 됨** — 응답이 sessionEvent dom_operations이면 로컬 HTML 직접 패치가 더 안전

## 파일 구조

```
메인_iOS_HIG_v6/
├── README.md                       (이 문서)
├── iterations/
│   ├── v6.1.html ~ v6.10.html      (각 iteration HTML, Stitch에서 다운로드)
├── renders/
│   ├── v6.1.png ~ v6.10.png        (각 iteration 스크린샷)
└── critique/
    ├── v6.1.md ~ v6.10.md          (Apple 수석 디자이너 critique 노트)
```

## 다음 단계 옵션

1. **v6.10 디자인 언어를 Ⓑ 데일리 브리핑 피드에 propagate** — 같은 Editorial Blue · iOS HIG 시스템 적용
2. **v6.10을 `web/` (Next.js)로 통합** — fixed positioning 정리 + safe-area 정확한 처리
3. **라이언 캐릭터 자산 도착 후 placeholder 교체** (Recraft 정적 + Rive 인터랙티브)
4. **다크 모드 v6.7도 craft layer 동일 적용**
