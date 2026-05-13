# Apple HIG fetch 자료 — 재사용 가능 묶음

> **목적**: Apple Human Interface Guidelines (developer.apple.com/design/human-interface-guidelines) 5개 핵심 페이지를 Playwright MCP로 직접 fetch한 raw 자료 + 사람 검증 정리본. 본 폴더만 다른 프로젝트에 복사해 가져가도 그대로 활용 가능하도록 자족적 구성.
>
> **fetch 일시**: 2026-05-13
> **fetch 방법**: Playwright MCP, accessibility tree + table dump
> **출처 URL**: developer.apple.com/design/human-interface-guidelines/{typography, accessibility, materials, layout, color}

---

## 폴더 내용

### 정리본 (사람이 읽는 1차 산출물)

- **`HIG-fetch-2026-05-13.md`** — 5개 페이지 검증 결과를 영역별로 정리한 메인 문서. **이 파일부터 읽으면 됨.**
  - § 0 요약 표 — 잘못 알려진 표준 vs Apple 실제 기준 (예: WCAG "14pt+bold" vs Apple "17pt 경계")
  - § 1 Typography (Dynamic Type 11 스타일 × 7 사이즈 × 5 AX 단계)
  - § 2 Accessibility (대비 표 · 터치 타깃)
  - § 3 Materials (4단계 + Liquid Glass · vibrancy 레벨)
  - § 4 Layout (디바이스 393×852 등 · safe-area 원칙)
  - § 5 Color (4-mode 구조 · 12 SwiftUI · 6 systemGray · 8 UIKit semantic · 2×3 background)

### Raw 데이터 (Playwright 캡처 원본)

| 파일 | 출처 페이지 | 내용 |
|---|---|---|
| `typography-tables.json` | `/typography` | iOS Large(default) + xSmall ~ xxxLarge + AX1/AX5 사이즈 단계 11 스타일 표. 플랫폼 기본/최소 표. API 매핑 표. |
| `accessibility-tables.json` | `/accessibility` | WCAG AA 대비 표 (17pt 경계). 터치 타깃 표 (44×44 / 28×28). 플랫폼 텍스트 기본/최소. |
| `accessibility-scan.json` | `/accessibility` | 헤딩 구조 + WCAG/대비 관련 본문 문장 추출. |
| `materials-content.json` | `/materials` | 4단계 material 표 + Liquid Glass · standardMaterials · iOS 섹션 본문. |
| `materials-scan.json` | `/materials` | 헤딩 구조 + material/blur 관련 본문 문장. |
| `layout-scan.json` | `/layout` | iPhone 디바이스 49종 dimensions + Size Class 매핑. tvOS grid 가이드값. |
| `layout-sections.json` | `/layout` | Best Practices · Guides and Safe Areas · iOS · iPadOS 섹션 본문. |
| `color-scan.json` | `/color` | 12 SwiftUI 색 · 6 systemGray · 8 UIKit 시맨틱 라벨 표. 4-mode 스키마. |
| `color-sections.json` | `/color` | Inclusive Color · System Colors · Liquid Glass Color · iOS 섹션 본문. **hex hard-code 비권장 Apple 공식 caveat** 포함. |

---

## 다른 프로젝트에서 쓰는 법

### 1. 폴더 통째로 복사

이 `Apple-HIG/` 폴더를 새 프로젝트 어디든 복사 (예: `<your-project>/docs/apple-hig/`).

### 2. 디자인 가이드 작성 시 출처 인용

새 가이드에서 HIG 기준을 인용할 때:

```markdown
**WCAG AA 대비 (Apple 공식)** — 17pt 경계.
> 출처: 본 프로젝트 `docs/apple-hig/HIG-fetch-2026-05-13.md § 2.1`
```

### 3. Dynamic Type 매핑 그대로 사용

iOS 네이티브 / 웹 둘 다 통용. `typography-tables.json`의 `t5_iOS_Large_default` 그대로 베껴 11 스타일 매핑.

### 4. 정기 재fetch 권장

Apple HIG는 메이저 OS 업데이트마다 변경 (특히 색 hex, 디바이스 표, Liquid Glass 같은 신규 material 등). 본 자료는 **2026-05-13 시점 스냅샷**이므로 6개월~1년에 한 번 같은 5개 URL 재fetch 권장.

재fetch 시 Playwright 명령 예:
```js
await page.goto('https://developer.apple.com/design/human-interface-guidelines/typography');
// table 인덱스 0~31에서 필요한 표 dump (json으로 저장)
```

---

## 자주 인용하는 핵심 6건 (cheat sheet)

이 묶음의 가장 유용한 부분만 추리면:

1. **iOS Default 텍스트 크기 = 17pt** (모든 플랫폼 합쳐도 iOS만 17). 본문 기준은 17pt + Body Regular.
2. **WCAG 대비 경계 = 17pt** (Apple 기준). 18pt 이상 OR Bold any-size → 3:1. 그 외 → 4.5:1. **W3C의 "14pt+bold"는 Apple 정의가 아님**.
3. **터치 타깃 = 44×44pt 기본 / 최소 28×28pt** (iOS, iPadOS, watchOS).
4. **Material 4단계**: `ultraThin · thin · regular · thick`. + 별도 `Liquid Glass` functional 레이어 (2025-06 도입, controls/navigation 전용, content layer 사용 금지). **블러 px 수치는 Apple 미공개** — 의미론 이름만 사용.
5. **컬러 4-mode 스키마**: Default(L/D) + Increased Contrast(L/D). 시스템 컬러는 이 4모드 변형 모두 보유.
6. **(중요) hex hard-code 금지**: *"Avoid hard-coding system color values… The actual color values may fluctuate from release to release"* — Apple 공식. 네이티브 구현은 시스템 API 호출 (`UIColor.label`, `Color.primary` 등).

---

## 다음 fetch 시 추가 권장 페이지

본 묶음에 없는 페이지 중, 가이드 작성 시 자주 참조하게 되는 것:

- `/inputs` — 포인터/키보드/제스처 입력 가이드
- `/foundations/icons` — SF Symbols, app icon
- `/components/menus-and-actions` 영역 — buttons, menus, alerts
- `/patterns/feedback` — onboarding, loading, error
- `/technologies/dynamic-type` — Dynamic Type 심층

5개 핵심 외 페이지가 필요해지면 동일 방식으로 fetch 후 본 폴더에 추가.

---

**문의/유지보수**: 본 묶음의 출처 프로젝트 = `lifeosone` (오다환). 다른 프로젝트로 이동 시 출처 표기는 자유.
