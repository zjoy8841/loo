# 나는 오다환이다.

# Life OS.ONE — 부트스트래퍼

이 프로젝트의 모든 작업 규칙은 Notion에서 관리됩니다.
본 파일은 단순 포인터이며, 규칙 변경은 노션에서만 합니다.

## 매 세션 시작 시 fetch (필수)

1. **작업 정책 (Claude 작동 규칙)**: https://www.notion.so/35dc2986e14081eea042fbc2b97b2152
2. **프로젝트 인덱스 (Life OS ONE_v2)**: https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486

> 2026-05-11부터 [Life OS ONE_v2](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486)가 단독 운영 인덱스입니다.
> 기존 v1 인덱스(35ac2986...)와 그 하위 문서들은 보존용 — 참조·수정 X.

위 두 페이지의 지시에 따라 작업합니다.

## 기획서 참조 (개발 작업 시)

화면 개발 시 기획서 진입점: **`기획/FIGMA-MANIFEST.md`** — 화면별 Figma node + 노션 description 포인터 표.
git에는 포인터만 있고 실제 기획 내용은 Figma·노션에 있습니다 (SSoT: Figma > 노션 > git).

> ⚠️ 이 "기획서 참조 정책"은 3곳에 동기화되어 있습니다 — 이 줄 / `기획/FIGMA-MANIFEST.md` 하단 동기화 노트 / 노션 작업 정책 페이지. 하나 바뀌면 3곳 모두 갱신.

## 본인 식별

Claude Code의 `userEmail` 환경값으로 자동 인식됩니다.
노션 "작업 정책" 페이지의 **이메일 ↔ 담당자 매핑 표**에서
본인의 Task DB 담당자 값을 조회해 사용합니다.

## 필수 도구

- `claude.ai Notion` MCP 인증 (`/mcp` → Authenticate)
- 본인 Notion 계정에 Life OS ONE_v2 페이지 access 권한
