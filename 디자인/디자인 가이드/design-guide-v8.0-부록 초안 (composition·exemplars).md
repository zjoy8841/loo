# 디자인 가이드 v8.0 — 부록 초안: §composition + §exemplars

> **상태**: 초안. `design-guide-v8.0.md` 본문 **미반영**. 검토 후 별도 명시 오더가 있을 때 §10/§11로 통합.
> **작성 배경**: v8.0 본문은 **토큰 명세**(어떤 값이 존재하나)에 머묾. "값을 어떻게 조합하나(위계·여백·리듬·절제)"가 비어 있어, 산출물이 토큰을 정확히 따라도 조악하게 나옴. 이 부록이 그 빈 층을 채운다.
> **두 층의 역할**:
> - **§composition** = 조합 규칙. 기계적으로 검증 가능한 정량 제약. "바닥"을 올린다.
> - **§exemplars** = 좋은/나쁜 예시. Apple HIG 원문을 기준 삼아 패턴을 전이시킨다.
> **한계 (정직하게)**: 이 부록은 "조악 → 무난"까지를 목표로 한다. "무난 → 수려"는 매체(손코딩 CSS)·시각 반복 루프·실물 에셋의 문제라 규칙으로 못 메운다. §exemplars E.0 참조.
> **Apple HIG 출처**: `Apple-HIG/HIG-fetch-2026-05-13.md`, `Apple-HIG/layout-sections.json` (fetch 2026-05-13).

---

## §composition — 조합·위계·절제 규칙

각 규칙은 **[규칙] → (Apple HIG 근거) → (Life OS.ONE 적용)** 형식. 모두 정량·검증 가능하게 작성.

### C.1 위계 (Hierarchy)

| # | 규칙 | 근거 / 적용 |
|---|---|---|
| C.1.1 | **한 화면 = 한 초점.** 사용자의 눈이 처음 0.5초에 닿아야 할 요소는 정확히 1개. 그 1개가 화면에서 가장 큰 + 가장 진한 + (필요시) 유일한 악센트. | HIG: *"People want to view the most important information right away."* / 적용: 메인A=라이언 오브, 메인B=브리핑 카드. 둘 다 "초점이 2개 이상"이면 탈락. |
| C.1.2 | **타입 스케일은 건너뛴다.** 한 화면에서 인접한 두 단계(예: H2 22pt + H3 20pt)를 동시에 쓰지 않는다. 위계는 "구분되는 점프"로만 표현. v8.0 §1.2의 11스타일 중 **한 화면에 3개 이하**. | HIG iOS 11 styles는 점프 폭이 크게 설계됨(34→28→22→20→17). 적용: 헤더 1 + 본문 1 + 캡션 1 = 3. 그 이상이면 위계가 뭉갬. |
| C.1.3 | **악센트는 시선 유도용 1개 요소에만.** `--accent`(Lion Iris)는 화면에서 "다음으로 볼 곳"을 가리키는 1개에만. 나머지 텍스트·아이콘은 `--ink-secondary`/`--ink-tertiary`로 후퇴. 악센트가 5곳에 찍히면 0곳에 찍힌 것과 같다. | HIG color caveat의 정신: 시스템 색은 의미 전달용이지 장식용 아님. 적용: 메인B 뉴스 3장의 `cat` 뱃지가 모두 악센트면 → 위계 소실. 1순위 뉴스만 악센트, 나머지 회색. |
| C.1.4 | **굵기로 위계, 크기로 위계 — 둘 중 하나만.** 같은 정보 그룹 안에서 weight와 size를 동시에 변주하지 않는다. | 적용: 카드 제목이 "크고 + 굵고", 메타가 "작고 + 가늘고"는 OK(그룹이 다름). 한 줄 안에서 단어마다 굵기·크기 섞기는 금지. |

### C.2 여백·리듬 (Spacing & Rhythm)

| # | 규칙 | 근거 / 적용 |
|---|---|---|
| C.2.1 | **8pt 그리드 엄수.** 모든 간격·크기는 v8.0 §스페이싱 토큰(`--s-1`~`--s-16` = 4·8·12·16·24·32·48·64)에서만 선택. 임의값(13px, 18px, 7px) 금지. | 적용: "느낌상 살짝 띄움"이 누적되면 리듬이 깨짐. 토큰 외 값을 쓰고 싶으면 토큰을 늘리는 게 맞다. |
| C.2.2 | **간격 위계 고정.** 섹션↔섹션 = `--s-6`(24) 이상. 카드 내부 요소 = `--s-3`/`--s-4`(12/16). 라벨↔값 = `--s-1`/`--s-2`(4/8). 이 3단계를 화면 전체에서 일관 적용 — 같은 위계인데 어디선 16, 어디선 20이면 탈락. | HIG: *"Group related items... use negative space."* 여백 자체가 그룹핑 도구. |
| C.2.3 | **그룹핑은 여백으로 먼저, 선·박스는 최후.** 관련 항목을 묶을 때 1순위 = 여백, 2순위 = 배경 shape, 3순위(불가피할 때만) = separator 선. 카드마다 border를 두르는 건 "여백으로 못 묶어서 진 것". | HIG: *"you might use negative space, background shapes, colors, materials, or separator lines"* — 나열 순서가 곧 우선순위. |
| C.2.4 | **세로 리듬.** 스크롤 화면은 섹션 헤더↔콘텐츠 간격이 전 섹션에서 동일. 콘텐츠 블록 높이는 들쭉날쭉해도, **블록 사이 간격은 일정**해야 리듬이 산다. | 적용: 메인B 피드 — 헤드라인/점심/미션 섹션 간 `margin-bottom` 단일값 고정. |
| C.2.5 | **가장자리 여백 = 시스템 마진.** 좌우 거터는 `--gutter-regular`(20) 고정 + safe-area 합산. 요소마다 다른 좌우 인셋 금지. | HIG: *"respect system-defined margins."* |

### C.3 절제 (Restraint) — 정량 예산

화면을 "예산"으로 관리한다. 초과하면 무조건 덜어낸다.

| # | 예산 | 상한 |
|---|---|---|
| C.3.1 | **Above-the-fold 요소 수** | 첫 화면(스크롤 전)에 독립 블록 **≤ 4개**. 인사/히어로/액션군/정보핀 정도. 그 이상은 스크롤 아래로. |
| C.3.2 | **Elevation 레벨** | 한 화면에 그림자 깊이 **≤ 2단계**. 베이스 + 떠 있는 것 1종. 카드마다 다른 그림자 = 탈락. |
| C.3.3 | **Filled / Primary 액션** | 한 화면에 채워진 강조 버튼 **1개**. 두 개가 동등하게 강조되면 사용자는 선택을 못 한다. |
| C.3.4 | **악센트 hue** | 한 화면에 악센트 색상 **1개**. 시점 surface의 `--accent` 외 추가 hue 금지(상태색 `--success`/`--danger` 등 의미색은 예외, 단 의미가 있을 때만). |
| C.3.5 | **카드 장식** | 카드는 `border` 또는 `shadow` 중 **하나만**. 둘 다 두르면 무겁다. |
| C.3.6 | **장식 그라데이션** | 정보를 담지 않는 그라데이션·글로우는 화면당 **1개**(보통 히어로). 카드 썸네일마다 그라데이션 = 시각 소음. |
| C.3.7 | **복잡도 점수** | 화면 요소에 점수 부여 — 카드 2 / 텍스트 블록 1 / 버튼 1 / 차트·이미지 3 / 리스트 행 1. 첫 화면 합계 **≤ 12**. 초과 시 섹션을 다음 화면·탭으로 분리. |

### C.4 콘텐츠 우선 (Content-first)

| # | 규칙 | 근거 / 적용 |
|---|---|---|
| C.4.1 | **핵심 정보에 공간을 준다.** 가장 중요한 정보를 "부차 정보로 둘러싸서" 묻지 않는다. 부차 정보는 다른 뷰·다른 탭으로 보낸다. | HIG: *"don't obscure it by crowding it with nonessential details... make secondary information available in other parts."* |
| C.4.2 | **풀블리드.** 배경·히어로 아트워크는 화면 끝까지. 스크롤 레이아웃은 바닥·좌우 끝까지 닿는다. nav·탭바는 콘텐츠 "위에" 뜨는 것이지 같은 평면이 아니다 — 레이아웃이 이를 고려. | HIG: *"Make sure backgrounds and full-screen artwork extend to the edges... scrollable layouts continue all the way to the bottom and the sides."* |
| C.4.3 | **풀폭 버튼 회피.** 버튼은 시스템 마진을 존중하고 화면 끝에서 인셋. 불가피하게 풀폭이면 하드웨어 곡률과 조화. | HIG: *"Avoid full-width buttons... inset from the edges of the screen."* |
| C.4.4 | **실제 콘텐츠로 디자인한다.** 이모지·lorem·placeholder로 레이아웃을 확정하지 않는다. 실제 카피 길이·실제 이미지 비율로 검증. 이모지 아이콘은 시안 단계에서도 금지 — 정제된 아이콘셋 또는 라이언 일러스트로. | 근거: placeholder는 항상 "예쁜 길이"라 실제에서 깨진다. v.10 A/B 보드가 이모지를 쓴 건 **이 규칙 위반** — E.0 참조. |

### C.5 적용 체크리스트

한 화면이 통과하려면:

- [ ] 초점이 정확히 1개인가 (C.1.1)
- [ ] 타입 스타일 ≤ 3개, 인접 단계 동시 사용 없음 (C.1.2)
- [ ] 악센트 색이 시선 유도 1개 요소에만 (C.1.3, C.3.4)
- [ ] 모든 간격이 8pt 토큰에서 나왔는가 (C.2.1)
- [ ] 간격 위계 3단계가 화면 전체에서 일관되는가 (C.2.2)
- [ ] 그룹핑을 선·박스 전에 여백으로 시도했는가 (C.2.3)
- [ ] Above-the-fold 블록 ≤ 4, 복잡도 점수 ≤ 12 (C.3.1, C.3.7)
- [ ] Elevation ≤ 2, Primary 버튼 1개, 카드 border XOR shadow (C.3.2/3/5)
- [ ] 핵심 정보가 부차 정보에 안 묻혔는가 (C.4.1)
- [ ] 배경·스크롤이 화면 끝까지 닿는가 (C.4.2)
- [ ] 이모지·placeholder 없이 실제 콘텐츠로 검증했는가 (C.4.4)

---

## §exemplars — 좋은/나쁜 예시 (Apple HIG 기준)

### E.0 이 층을 읽는 법

- 각 예시 = **원칙 → Apple HIG 원문 → ✅ PASS 패턴 → ❌ FAIL 패턴 → Life OS.ONE 현재 판정**.
- "현재 판정"은 가장 최근 산출물(`라이언 디자인 시안_v.10-메인 재구성 A·B.html`)을 정직하게 채점한 것. 잘한 것도, 못한 것도 그대로 적는다.
- **이 층의 한계**: 예시는 "패턴"을 전이시킬 뿐 "취향"은 못 준다. 모든 PASS 패턴을 통과한 두 화면 중 하나는 살아있고 하나는 죽어있을 수 있다 — 그 차이는 Figma에서 사람이, 또는 실물 에셋이 만든다. 이 부록은 **죽은 화면을 거르는 필터**지 살아있는 화면을 만드는 엔진이 아니다.

### E.1 — 핵심 정보에 공간을 준다

> HIG: *"Make essential information easy to find by giving it sufficient space. People want to view the most important information right away, so don't obscure it by crowding it with nonessential details."*

- ✅ **PASS**: 메인 화면이 "오늘 가장 중요한 1가지"를 화면 위쪽 1/3에 단독으로, 넉넉한 여백과 함께 배치. 나머지는 스크롤 아래 또는 다른 탭.
- ❌ **FAIL**: 11개 섹션(인사·날씨·뉴스·인사이트·미션·액션·기록·태그·건강뉴스·맛집…)을 같은 비중의 카드로 세로로 쌓음 → 무엇이 핵심인지 화면이 말해주지 않음. (= 폐기된 `기획/02 메인/09-home.html`)
- **Life OS.ONE 판정**: v.10 A/B 둘 다 이 점은 **PASS**. A=라이언 오브, B=브리핑 카드로 초점을 1개로 좁혔고 11섹션을 쳐냄. C.1.1·C.4.1 충족.

### E.2 — 관련 항목은 여백으로 묶는다 (선·박스는 최후)

> HIG: *"Group related items... you might use negative space, background shapes, colors, materials, or separator lines."* (나열 순서 = 우선순위)

- ✅ **PASS**: 같은 그룹은 간격을 좁히고 그룹 사이는 넓힌다. 그것만으로 묶음이 읽히면 border를 안 두른다.
- ❌ **FAIL**: 모든 정보 조각을 각각 `border` + `shadow` 카드로 감쌈 → 화면이 "카드 격자"가 되고, 정작 그룹 관계는 안 보임.
- **Life OS.ONE 판정**: v.10은 **부분 FAIL**. 카드마다 `border:1px` + `border-radius`로 둘러쌈(C.2.3·C.3.5 위반). 개선: 같은 섹션 내 항목은 border 빼고 간격으로만 묶고, 섹션 단위로만 약한 배경 shape 사용.

### E.3 — 콘텐츠는 화면 끝까지 (풀블리드)

> HIG: *"Make sure backgrounds and full-screen artwork extend to the edges of the display. Also ensure that scrollable layouts continue all the way to the bottom and the sides... Controls and navigation components like sidebars and tab bars appear on top of content rather than on the same plane."*

- ✅ **PASS**: 히어로/배경이 노치·홈 인디케이터까지 꽉 참. 스크롤 콘텐츠가 bottom nav "뒤로" 흘러가며(투명 그라데이션), nav는 그 위에 떠 있음.
- ❌ **FAIL**: 콘텐츠 영역이 사방에 흰 여백을 두고 "박스 안에" 갇힘. nav가 콘텐츠와 같은 평면에서 자리를 깎아먹음.
- **Life OS.ONE 판정**: v.10은 **PASS에 가까움**. bottom-nav가 `linear-gradient(transparent → bg)`로 콘텐츠 위에 뜨고, surface 배경이 화면 끝까지 참. status-bar는 `env(safe-area-inset-top)` 합산으로 노치 회피. 다만 히어로가 "카드"라 진짜 풀블리드 아트워크는 아님 — Figma 단계에서 강화 여지.

### E.4 — 명료함: 시선의 단일 경로

> HIG Foundations 정신(Clarity): UI는 사용자가 "다음에 무엇을 할지" 헷갈리지 않게 한다. 화면은 한 번에 하나의 주된 행동을 제안.

- ✅ **PASS**: 화면이 "지금 할 일 1개"를 시각적으로 가장 강하게 제안(가장 큰 + 가장 진한 + 유일 악센트). 보조 행동은 명백히 작고 조용함.
- ❌ **FAIL**: 동등한 무게의 CTA가 4~6개(빠른 액션 2×2 그리드 + filled 버튼 + FAB…) → 사용자가 우선순위를 스스로 계산해야 함.
- **Life OS.ONE 판정**: A는 **PASS**(입력 바 1개 + 칩은 명백히 보조), B는 **경계선**. 브리핑 카드·뉴스·점심 `go` 버튼·미션·라이언 카드가 비슷한 무게 — C.3.3대로 "이 화면의 1개 행동"을 더 명확히 해야 함.

### E.5 — 시스템 마진을 존중, 풀폭 버튼 회피

> HIG: *"Buttons feel at home in iOS when they respect system-defined margins and are inset from the edges of the screen. Avoid full-width buttons."*

- ✅ **PASS**: 버튼·입력 바가 좌우 거터만큼 인셋. 둥근 모서리가 하드웨어 곡률과 조화.
- ❌ **FAIL**: 버튼이 화면 폭을 0 인셋으로 꽉 채워 하드웨어 모서리에 부딪힘.
- **Life OS.ONE 판정**: v.10 **PASS**. `a-input`은 `margin:0 16px`, 칩·카드 모두 거터 인셋. 유지.

### E.6 — Deference: 크롬은 후퇴, 콘텐츠가 주인공

> HIG Foundations 정신(Deference): 인터페이스 요소는 콘텐츠를 돕되 경쟁하지 않는다. 장식·효과는 콘텐츠 이해를 방해하지 않을 때만.

- ✅ **PASS**: 배경·구분선·아이콘이 조용함. 사용자의 데이터(오늘의 일정·뉴스·미션)가 가장 큰 시각 무게.
- ❌ **FAIL**: 그라데이션·글로우·애니메이션 링이 콘텐츠보다 눈에 띔. "디자인된 느낌"을 내려다 정보를 가림.
- **Life OS.ONE 판정**: A는 **경계선** — 라이언 오브의 3중 링 + 글로우 + wake 모션이 화려하지만, A의 콘셉트가 "오브가 곧 주인공(대화 입구)"이라 의도된 것. 단 C.3.6대로 장식 그라데이션은 오브 1곳으로 한정해야 함(현재 충족). B는 **PASS** — 브리핑 카드 외 장식 절제.

### E.7 — 검증은 실제 콘텐츠·실제 크기로

> HIG: safe area / Dynamic Type / *"check the minimum contrast in both light and dark"* — 모두 "실제 조건에서 확인"을 요구.

- ✅ **PASS**: 실제 카피 길이, 실제 이미지, AX3까지 키운 글자, 6 시점 surface × 4 모드 대비를 모두 통과한 뒤 확정.
- ❌ **FAIL**: 이모지 아이콘 + 짧은 더미 텍스트로 "예쁜 상태"만 보고 확정. 실제 데이터가 들어오면 줄바꿈·잘림 발생.
- **Life OS.ONE 판정**: v.10 **FAIL**. 썸네일에 🥗📉🤖 이모지 사용(C.4.4 위반). 시안 단계라도 정제된 아이콘셋 또는 라이언 일러스트 시스템으로 교체해야 함. → 라이언 마스코트 도구(Recraft+Rive)로 에셋화하는 작업과 연결.

### E.8 종합 — v.10 A/B 보드 채점표

| 원칙 | A 대화입구 | B 브리핑피드 |
|---|---|---|
| E.1 핵심 정보에 공간 | ✅ | ✅ |
| E.2 여백으로 그룹핑 | ❌ 카드 border 남발 | ❌ 카드 border 남발 |
| E.3 풀블리드 | 🔶 nav·배경 OK / 히어로는 카드 | 🔶 동일 |
| E.4 단일 시선 경로 | ✅ | 🔶 CTA 무게 분산 |
| E.5 시스템 마진 | ✅ | ✅ |
| E.6 Deference | 🔶 의도된 화려함 | ✅ |
| E.7 실제 콘텐츠 검증 | ❌ 이모지 | ❌ 이모지 |

**결론**: v.10은 §composition의 "구조·위계·초점"(E.1·E.4·E.5)은 통과 — "메인에 뭐가 들어가나"는 잘 좁혔다. 떨어지는 건 **마감 디테일**(E.2 border 절제, E.7 실물 에셋). 이건 규칙으로 바닥은 올렸으나, 천장(수려함)은 Figma·실물 에셋 단계의 몫임을 다시 확인시켜 준다.

---

## 통합 시 처리 (검토 후 별도 오더)

1. 이 초안을 오다환이 검토 → §composition 규칙값(예산 상한 등) 조정
2. 컨펌되면 `design-guide-v8.0.md`에 **§10 Composition · §11 Exemplars**로 통합, §0 개정 요지에 한 줄 추가
3. C.5 체크리스트는 화면 산출물 리뷰 시 기본 게이트로 사용
4. §exemplars는 산출물이 쌓일 때마다 "현재 판정"을 갱신 — 살아있는 문서
5. 노션 작업 정책 / FIGMA-MANIFEST에 "화면 리뷰 = C.5 체크리스트 통과 필수" 반영 검토
