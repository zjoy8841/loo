# 📌 2026-05-15 세션 결과 노트 · 디자인 퀄리티 / 메인 화면 재구성

> **다음 세션 첫 메시지에 "SESSION-2026-05-15-design-quality.md 읽고 이어가줘"라고 하면 됩니다.**
> (같은 날짜의 `SESSION-2026-05-14.md`는 별개 세션 — 회원가입 v0.3. 혼동 주의.)

---

## 🎯 다음 세션 첫 액션

> **Stitch MCP가 연결되어 있다 — Claude Code가 직접 Stitch를 운전해 메인 화면을 생성한다.**
>
> 1. 새 세션이면 Stitch MCP 도구(`generate_screen_from_text`, `get_screen_code`, `get_screen_image`, `extract_design_context` 등)가 로드돼 있어야 함. ToolSearch로 `stitch` 검색해 확인.
> 2. `디자인/추가 시안/Stitch 프롬프트_메인 A·B.md`의 ①+②-A, ①+②-B를 각각 Stitch에 던져 생성.
> 3. 결과 코드·이미지를 받아 스크린샷 검수 → 대화형 수정 → `web/` 통합.
> 4. A/B 방향은 결과 보고 사용자와 결정.
>
> 도구가 안 보이면: `claude mcp list`로 stitch 연결 확인 → 그래도 도구 없으면 재시작 필요.
> 그것도 안 되면 폴백 = Stitch 웹 UI(stitch.withgoogle.com)에 같은 프롬프트 수동 입력.

---

## 📋 이번 세션 한 일 — 메인 화면 디자인 반복 (v1.0 → v5.0)

전제: 디자인 컨펌이 안 된 상태에서 **메인 화면을 원점부터** 재고민. 메인의 "단 하나의 역할"을
2분기로 잡음 — **Ⓐ AI 비서 대화 입구** vs **Ⓑ 데일리 브리핑 피드**. 모든 시안이 A·B 비교 보드.
산출물은 전부 `디자인/추가 시안/` 폴더, `추가시안_vN.0-...` 네이밍.

| 버전 | 파일 | 내용 |
|---|---|---|
| v1.0 | `추가시안_v1.0-메인 재구성 A·B.html` | A·B 첫 비교 보드. v8.0 토큰 적용. 기존 11섹션 09-home을 A·B로 압축 |
| v2.0 | `추가시안_v2.0-메인 재구성 A·B (composition 적용).html` | §composition 규칙 적용 — 카드 border 제거→여백 그룹핑 / 이모지 제거 / elevation 1단계 / 단일 초점 |
| v3.0 | `추가시안_v3.0-메인 A·B (craft 적용).html` | African Prinze 무료 Figma 파일의 craft 기법 — 레이어드 radial 발광 구체 / 악센트 글로우 그림자 / 앰비언트 배경 |
| v4.0 | `추가시안_v4.0-메인 A·B (PharmaEase DNA).html` | PharmaEase 키트 DNA — 한글 세리프(Nanum Myeongjo) 헤딩 / 풀블리드 컬러 헤더 밴드 / 겹침 디테일 / 소프트 섀도 |
| v5.0 | `추가시안_v5.0-PharmaEase Home 그대로 (가이드 미적용).html` | PharmaEase Home 컴포넌트를 **해석 없이 그대로** 재현 + Life OS.ONE 한글 콘텐츠만 교체. **v8.0 가이드 미적용** |

### 부수 산출물

- `디자인/디자인 가이드/design-guide-v8.0-부록 초안 (composition·exemplars).md` — **§composition(조합·위계·절제 규칙) + §exemplars(Apple HIG 기준 좋은/나쁜 예시)** 부록 초안. **v8.0 본문 미통합** — 검토 후 별도 오더 시 §10/§11로 통합 예정.
- `디자인/추가 시안/Figma-Make 프롬프트_메인 A·B.md` — Figma Make에 붙여넣을 메인 A·B 생성 프롬프트 (§composition 제약 + 레퍼런스 + 실제 콘텐츠 포함).
- `디자인/추가 시안/Stitch 프롬프트_메인 A·B.md` — Google Stitch용 메인 A·B 생성 프롬프트 (공통 컨텍스트 + ②-A/②-B + 반복 팁). **이게 다음 세션의 입력.**
- `디자인/추가 시안/Main Screen A_B Design_v1.0/` — Figma Make가 생성한 Vite+React+shadcn 프로젝트 (다운로드본). 🦁 이모지로 마스코트 대체된 상태.
- `디자인/추가 시안/_pharmaease-ref/` — PharmaEase 원본 스크린샷 4장 (home/welcome/news/account), 레퍼런스 보관용.

---

## 🔌 Stitch MCP 연결 완료 (2026-05-15 세션 말미)

- AI 디자인 도구 리서치 결과 → **Google Stitch**(구 Galileo AI 혈통)가 "0→1 디자인 생성"에 최적. "가장 보기 좋은 프로토타입" 평가, 무료.
- 도구 역할 분담 (리서치): **Stitch = 디자인 생성** / **v0 = 코드 품질** / Figma Make = Figma→코드 / Lovable·Bolt = 앱 통째.
- **Stitch는 MCP로 Claude Code에 연결됨** — Figma Make는 외부 제어 불가지만 Stitch는 가능 (생성 `generate_screen_from_text` + 추출 `get_screen_code`·`get_screen_image`·`extract_design_context` 둘 다).
- **무료 경로 확인** — Stitch Settings에서 API 키 발급 → billing 벽 없이 발급됨. 결제 불필요.
- 등록 명령: `claude mcp add -s user stitch -e STITCH_API_KEY=<key> -- npx -y @_davideast/stitch-mcp proxy`
  → user 설정(`~/.claude.json`)에 저장. **repo엔 안 들어감** (API 키도 거기).
- ⚠️ **add한 세션에선 도구 미로드** — 재시작해야 Stitch 도구가 뜸. 그래서 다음 세션부터 사용 가능.
- ⚠️ API 키가 채팅에 평문 노출됨 — 신경 쓰이면 Stitch Settings에서 재발급 후 `claude mcp remove stitch` → 다시 add.

---

## 🔑 핵심 결론 — 다음 세션이 반드시 알아야 할 것

1. **HTML 손코딩 디자인의 천장**: ClaudeCode가 HTML/CSS를 맨손으로 짜는 방식은 "조악 → 무난"까지가 한계. "무난 → 수려"는 규칙·프롬프트로 안 넘어감 — 실물 에셋·실제 디자이너·완성된 유료 템플릿의 몫. → [[feedback_handcoded_design_ceiling]]

2. **외부 디자인 도구 검토 결과**:
   - **Figma Make** — Figma 제품 내 생성 기능. **MCP·API로 외부 제어 불가**. `/make/` URL은 Figma Files API로 안 열림. 사람이 직접 운전해야 함.
   - **v0 (Vercel)** — Platform API 있음 → 코드로 제어 가능. 출력이 React 코드라 `web/`(Next.js)에 바로 통합. 단 v0 API 키(유료) 필요.
   - **Figma Community / UpLabs 등 마켓** — WebFetch 차단(403/404). 후보 평가는 **스크린샷** 또는 **복제 후 일반 fileKey** 필요.

3. **PharmaEase 유료 키트 구매함** — 헬스케어 앱 UI 키트. 차분·에디토리얼 톤이라 Life OS.ONE과 정합. → [[reference_pharmaease_kit]]
   - **v5.0이 이 키트의 Home 컴포넌트를 1:1 재현한 것** — 사용자가 "내가 해석한 디자인을 신뢰 못 하겠다"며 명시 요청.
   - 한계: PharmaEase 헤딩 폰트 Playfair Display는 라틴 전용 → 한글 헤딩은 sans 폴백. 세리프 craft를 한글로 가져오려면 한글 세리프 치환 필요.

4. **디자인 컨펌 여전히 미완** — 메인 A/B 방향(대화 입구 vs 브리핑 피드) 미결정. → [[project_design_reboot]]

5. **"초기화" = 이 산출물에 기존 가이드 미적용일 뿐, 가이드 삭제/수정 아님** — v8.0 가이드 파일은 그대로 보존. 사용자 명시.

---

## 🗂 폴더·네이밍 규칙 (이번 세션 사용자 확정)

- 라이언 디자인 시안은 이제 **`디자인/추가 시안/`** 폴더에 — `추가시안_vN.0-...` 형식.
- 기존 `라이언 디자인 시안_v.1~v.9.8`은 `디자인/` 루트에 그대로 보존 (구 체계).
- 다음 시안은 v6.0.

---

## 🔗 활성 참조

- **PharmaEase 유료 키트**: fileKey `noH0LSmksSoSQyGsalr4ZB` · Home 노드 `2026:4678` · 원본 스크린샷 `디자인/추가 시안/_pharmaease-ref/`
- **§composition·§exemplars 부록**: `디자인/디자인 가이드/design-guide-v8.0-부록 초안 (composition·exemplars).md`
- **디자인 가이드 v8.0 본문**: `디자인/디자인 가이드/design-guide-v8.0.md` (이번 산출물엔 미적용, 보존)
- **인덱스**: <https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486> (Life OS ONE_v2)
- **작업 정책**: <https://www.notion.so/35dc2986e14081eea042fbc2b97b2152>
