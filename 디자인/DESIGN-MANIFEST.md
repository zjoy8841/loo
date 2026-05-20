# 🎨 DESIGN-MANIFEST — 디자인 산출물 진입점

> **이 파일은 "주소록"입니다.** 실제 산출물 본체는 여기 없습니다.
> 디자인 가이드·마스코트·시안·참고 자료의 **위치 포인터만** 들고 있습니다.
>
> 모든 팀원은 **노션 인덱스 DB**(아래)에서 현재 상태·미리보기·캐노니컬 위치를 한눈에 확인합니다.
> git 측엔 이 매니페스트가 디렉터리 맵 역할로 평행 존재합니다 (기획 `FIGMA-MANIFEST.md`와 동일 패턴).

## 🎯 SSoT 우선순위

**Figma > 노션 DB > git.** 셋이 어긋나면 Figma가 캐노니컬.

- **Figma** = 외부 키트·일부 시안 (PharmaEase 등)
- **노션 DB** = 산출물 인덱스 + 상태(WIP/확정/Archive/Reference) + 미리보기 링크
- **git** = 산출물 파일 자체 (HTML 시안·PNG·SVG·.riv·MD 가이드)

> 마스코트·HTML 시안처럼 git이 캐노니컬인 항목은 git이 진실. 노션 DB는 그 위치를 가리키는 포인터.

## 📊 노션 인덱스 DB (단일 진입점)

🎨 **디자인 산출물 Tracker**
https://www.notion.so/3ac50ad4846a453db91b3af98dfb0134

- 부모: [Life OS ONE_v2](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486) → 📌 Active Policy Documents 표에 등재됨
- 속성: 산출물 / 상태 / 도메인 / 버전 / 캐노니컬 / 미리보기 / 담당자 / 갱신일 / 비고
- 추천 뷰: All / 상태별(WIP만 보기) / 도메인별 / 담당자별

**새 산출물이 생기면 이 DB에 row 한 줄 추가.** 매니페스트 표는 갱신 불필요 (DB가 진실).

## 🗂️ 디렉터리 맵 (git 측)

| 디렉터리 | 내용 | 노션 DB 매칭 |
|---|---|---|
| `디자인 가이드/` | 디자인 가이드 v8.0 (Apple HIG 정렬) WIP — md/html/부록 | "디자인 가이드 v8.0" row |
| `마스코트/` | 라이언 v1 SSoT — `디자인/ryan_v1_d.svg` + `애니메이션/ryan_v1_f.riv` + `README.md` | "마스코트 라이언 v1" row |
| `회원가입/` | 회원가입 톤 캐노니컬 — `01-account.png` (라이언 블루) | "회원가입 톤" row |
| `추가 시안/메인_iOS_HIG_v6/` | 메인 v6 (10 시안, v6.10 best) | "메인 시안 v6" row |
| `추가 시안/메인_ClaudeDesign_v7/` | 메인 v7 따뜻함 (10 시안) | "메인 시안 v7" row |
| `추가 시안/메인_ClaudeDesign_v8/` | 메인 v8 정갈+음성 (10 시안) | "메인 시안 v8" row |
| `추가 시안/_compare/` | v6·v7·v8 11 시안 누적 비교 보고서 | "메인 시안 비교 보고서" row |
| `추가 시안/_pharmaease-ref/` | 외부 UI 키트 참고 스샷 | "PharmaEase UI 키트" row |
| `Apple-HIG/` | Apple HIG fetch 자료 (6 cheat sheet) | "Apple HIG 참고 자료" row |
| `라이언 디자인 시안_v.*.html` | 메인 reboot 이전 시안 22개 (Archive) | "라이언 디자인 시안 v.1~v.9.8" row |

> 디자인 가이드 v7은 git이 아닌 **노션 + GitHub Pages**가 캐노니컬 — `docs/design-guide/` 참조.
> 인터랙션 매핑 wireframe(`기획/wireframe/`)은 디자인이 아니라 기획 산출물이지만 방법론으로 DB에 Reference 등재.

## 👥 팀원 시작 절차

**디자인 산출물을 보고 싶을 때:**

1. 노션 인덱스 DB 열기 (위 URL)
2. 도메인·상태로 필터링 → 해당 row 클릭
3. row의 **미리보기** URL 또는 **캐노니컬** git 경로로 이동
4. git 경로면 `git pull` 후 로컬에서 열기

**산출물 종류별 빠른 확인법:**

- **HTML 시안**: 더블클릭으로 브라우저에서 바로 열림
- **PNG 시안**: 브라우저·이미지 뷰어
- **마스코트 SVG**: 브라우저에 드래그
- **마스코트 Rive (`.riv`)**: https://rive.app 무료 가입 후 업로드
- **디자인 가이드 v7**: GitHub Pages 링크 (DB row 안 "미리보기" 컬럼)
- **실제 통합된 모습**: `cd web && npm run dev` → `localhost:3000/mascot-test` 등

## ✏️ 산출물 추가/변경 절차

새 시안·새 가이드 버전·새 에셋을 만들었을 때:

1. **git에 파일 push** — 캐노니컬 위치에
2. **노션 DB에 row 추가 또는 수정** — 상태·캐노니컬·미리보기·갱신일·비고 채움
3. 디렉터리 구조가 새로 생긴 경우만 **이 매니페스트의 디렉터리 맵 표 갱신**
4. 새 폴더가 아니라 기존 폴더 내부 변경이면 이 파일 손댈 필요 없음 (DB가 진실)

## 🔗 동기화

이 진입점 구조는 3곳에 평행 존재:

1. **이 파일** `디자인/DESIGN-MANIFEST.md` — git 측 디렉터리 맵
2. **노션 인덱스 DB** `🎨 디자인 산출물 Tracker` — 단일 진실 인덱스
3. **Life OS ONE_v2 인덱스** 📌 Active Policy Documents 표 — DB로 가는 한 줄 포인터

DB 자체의 row 변경은 노션에서만 처리. 디렉터리 구조 변경 시 이 파일도 갱신.

## 🔁 기획 매니페스트와의 관계

- **`기획/FIGMA-MANIFEST.md`** = 화면별 Figma + 노션 description (개발자가 화면 만들 때 진입)
- **`디자인/DESIGN-MANIFEST.md`** = 디자인 산출물 인벤토리 (디자이너·기획자·개발자가 디자인 자료 찾을 때 진입)

둘은 평행 구조이며, 화면 단위 정책(API·zod·접근성)은 FIGMA-MANIFEST, 디자인 자체(가이드·시안·에셋)는 DESIGN-MANIFEST를 본다.
