# Life OS.ONE / 라이언 — 가이드 문서

> 3인 협업을 위한 가이드 인덱스. 단일 진실 공급원은 **노션**, 코드/구현 표준은 이 폴더.

- 노션: [Life OS ONE_v2](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486)
- 라이브 mock: https://zjoy8841.github.io/loo/
- 리포: https://github.com/zjoy8841/loo

## 가이드 목록

| 가이드 | 파일 | 담당 | 상태 |
|-------|------|------|------|
| 디자인 | [design-guide.md](./design-guide.md) | A (오다환) | 스켈레톤 |
| 아키텍처 | [architecture.md](./architecture.md) | C | 스켈레톤 |
| DB | [database.md](./database.md) | C | 스켈레톤 |
| 배포·커밋 | [deploy-commit.md](./deploy-commit.md) | C | 스켈레톤 |
| 보안 | [security.md](./security.md) | C | 스켈레톤 |

## 읽는 순서 (신규 합류 시)

1. 노션 [Life OS ONE_v2](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486) — 프로젝트 컨텍스트
2. [architecture.md](./architecture.md) — 스택·폴더 구조 이해
3. [database.md](./database.md) — 데이터 모델
4. [design-guide.md](./design-guide.md) — UI 작업 시
5. [deploy-commit.md](./deploy-commit.md) — 첫 PR 만들기 전
6. [security.md](./security.md) — API 작성 시

## 작업자 분담

| 작업자 | 도메인 | 주 영역 |
|--------|--------|---------|
| A (오다환) | 사용자 온보딩 + 메인 | Splash·회원가입·메인·마이·알림 |
| B (TBD) | 사용자 시점 시나리오 | 아침·점심·저녁·음성·맛집·LLM |
| C (TBD) | 가맹점 + 공통 인프라 | /merchant·DB·API·WebSocket·배포 |

자세한 화면·API 분담표는 노션 [Life OS ONE_v2 > 기능 인벤토리](https://www.notion.so/35dc2986e14081a2b4b9dd2b1ddcc486) 참조.

## 문서 작성 규칙

- 새 결정은 노션 v2 페이지에 먼저, 이 문서에는 **구현 표준**만
- 각 가이드는 담당자가 셋업 → 함께 리뷰 → 머지
- 큰 변경은 PR로, 작은 수정은 main 직접 푸시 OK
- 한국어 기본
