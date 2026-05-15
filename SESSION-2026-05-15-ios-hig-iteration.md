# 📌 2026-05-15 세션 결과 노트 · iOS HIG × Editorial Blue 메인 화면 10회 반복

> **다음 세션 첫 메시지에 "SESSION-2026-05-15-ios-hig-iteration.md 읽고 이어가줘"라고 하면 됩니다.**
> (같은 날짜의 `SESSION-2026-05-15-design-quality.md`는 별개 세션 — A·B 방향 비교까지였음.)

---

## 🎯 다음 세션 첫 액션

> **선택 옵션 (사용자 결정 필요)**:
> 1. **v6.10을 Ⓑ 데일리 브리핑 피드에 propagate** — 같은 Editorial Blue · iOS HIG 시스템으로 B 화면도 끌어올리기
> 2. **v6.10을 `web/` (Next.js)로 통합** — 실제 동작하는 화면으로 옮기기, fixed positioning + safe-area 정밀 처리
> 3. **다크 모드 v6.7도 craft layer 적용** (paper grain, breath aura)
> 4. **다른 화면 (signup·home 등) 도 동일 시스템 propagate**

---

## 📋 이번 세션 한 일

전제: 사용자가 이전 비교본을 보고 "지금은 모바일 페이지 같음. 앱만의 고유 디자인이 있잖아. Apple HIG 적용해서 수석 디자이너 시점 검증→약점→개선 ×10. 신규 폴더에서" 명시 오더.

### Stitch MCP × Apple HIG iteration loop

**신규 폴더**: `디자인/추가 시안/메인_iOS_HIG_v6/`
**구조**: `iterations/v6.N.html` + `renders/v6.N.png` + `critique/v6.N.md` + `README.md`

**디자인 시스템 신규 등록** (Stitch): `assets/15471170651946998589` "Editorial Blue · iOS HIG"
- 슬레이트 블루 `#3A5A7A` 악센트 + 미네랄 화이트 `#F4F6F9`
- iOS type scale, 20pt margins, ROUND_TWELVE
- designMd에 HIG 컴플라이언스 + anti-pattern 박음

**10회 반복 점수 추이**: 6.5 → 8.0 → 8.3 → 8.6 → 8.9 → 9.0 → 9.0(dark) → 9.1 → 9.3 → **9.5**

| Ver | 핵심 변화 |
|---|---|
| v6.1 | 첫 generate, 5개 동일 탭바·iOS 타입 스케일 적용 |
| v6.2 | wordmark/마스코트 텍스트 오염 제거, viewport fit |
| v6.3 | "수요일·8:14" 통합, stats 제거, chips dot |
| v6.4 | **Status bar + Dynamic Island** 추가 |
| v6.5 | **Inset Grouped List** (Apple Settings 패턴) |
| v6.6 | mascot 톤다운, dual-depth composer |
| v6.7 | **다크 모드** 변형 |
| v6.8 | Korean 폰트 스택·line-height·tracking 정밀 |
| v6.9 | **Craft layer** (paper grain, breath aura, non-shadow shadow) |
| v6.10 | **최종** — accent label, mic tint, 디테일 |

각 iteration: Stitch edit_screens → HTML/PNG 다운로드 → Apple 수석 디자이너 critique 작성 → 약점→다음 프롬프트 도출.

---

## 🔑 핵심 결론 — 다음 세션 알아야 할 것

1. **v6.10 = Ⓐ 화면의 SSoT 후보** (Score 9.5/10). web/ 통합 시 정밀 재현 필요.
2. **v6.7 다크 모드** 같은 점수, mascot light가 다크에서 더 효과적.
3. **Stitch generate_variants는 콘텐츠 회귀** — REFINE 또는 강한 보존 prompt. → [[feedback_stitch_quirks]]
4. **DOM 패치 비영속** — 응답에 dom_operations만 오면 로컬 HTML 직접 수정이 안전.
5. **Korean mojibake**: PowerShell 라인-단위 교체로 복구 (Edit tool은 mojibake 바이트 매칭 어려움).
6. **iOS = 5개 동일 탭바 (FAB 안 됨)** — 반복 강조. Material 패턴 회피.
7. **v6 series가 v1~v5 (loose web 시안) 와 다른 차원** — Apple 1st-party 앱처럼 정밀.

---

## 🗂 활성 산출물

- **`디자인/추가 시안/메인_iOS_HIG_v6/`** — 전체 폴더
  - `README.md` — iteration 로그, 디자인 결정 요약, 학습된 패턴
  - `iterations/v6.10.html` — best (light)
  - `iterations/v6.7.html` — dark 변형
  - `critique/v6.1~v6.10.md` — 매 iteration Apple 수석 디자이너 critique
- **Stitch project**: `16440034816208920584`
  - DS asset: `15471170651946998589`
  - v6.10 screen ID: `a0eab17a000e47778d36eb3a247e5a44`

---

## 🔗 메모리 업데이트
- `project_design_v6_ios_hig.md` — 신규
- `feedback_stitch_quirks.md` — 신규 (Stitch MCP 함정 5건)
- `MEMORY.md` 인덱스 갱신

## 🔗 활성 참조
- 이전 세션: `SESSION-2026-05-15-design-quality.md` (A·B 방향 비교까지)
- Apple HIG cheat sheet: `디자인/Apple-HIG/`
- 인덱스: <https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486>
