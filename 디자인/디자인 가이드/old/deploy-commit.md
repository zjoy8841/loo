# 배포 · 커밋 컨벤션

> 담당: **C** · 상태: 스켈레톤

## 1. 배포 환경

| 환경 | 호스팅 | 도메인 | 자동 배포 트리거 |
|------|--------|--------|-----------------|
| **로컬** | localhost:3000 | — | npm run dev |
| **프로덕션** | Vercel | `loo.vercel.app` (TBD) | main 브랜치 push |
| **DB** | Supabase Postgres | — | 마이그레이션 수동 |
| **Pages (mock)** | GitHub Pages | `zjoy8841.github.io/loo` | main 브랜치 push (정적 HTML만) |

## 2. 환경변수

| 키 | 로컬 | Vercel | 비고 |
|----|------|--------|------|
| `DATABASE_URL` | `file:./dev.db` | Supabase 연결 문자열 | Prisma CLI는 `.env`, 런타임은 `.env.local` |
| `NEXTAUTH_SECRET` | openssl 32-byte | Vercel 환경변수 | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` | 배포 도메인 | NextAuth 콜백 URL |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | 발급된 키 | 동일 | 카카오 디벨로퍼 → 도메인 등록 |
| `ANTHROPIC_API_KEY` | (계획) | (계획) | LLM 연결 시 |
| `NOTION_TOKEN` | (옵션) | (옵션) | 가맹점 자료 노션 fetch 시 |

`.env.local`·`.env` 둘 다 **gitignored**. `.env.example`만 커밋.

## 3. Git 브랜치 전략

```
main          ──● ── ● ── ● ── ●  (프로덕션 자동 배포)
                 \      ↑
feat/xxx          \────●  (PR → main 머지)
```

- **main**: 항상 배포 가능 상태. 빌드 통과 필수.
- **feat/<도메인>-<기능>**: 새 기능. 예: `feat/merchant-inventory`, `feat/user-voice`
- **fix/<버그>**: 버그 수정. 예: `fix/lunch-payment-link`
- **chore/<작업>**: 빌드·설정·문서. 예: `chore/docs-design-guide`

작은 수정은 main 직접 push도 OK. 큰 기능은 PR + 리뷰.

## 4. 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 따름.

```
<type>(<scope>): <한 줄 요약, 한국어 OK>

<상세 본문, 선택>

<footer, Co-Authored-By 등 선택>
```

### type
| type | 의미 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 동작 동일·내부 정리 |
| `style` | 포맷·세미콜론 (no logic) |
| `docs` | 문서만 |
| `test` | 테스트 |
| `chore` | 빌드·의존성·설정 |

### scope (선택)
도메인 또는 모듈: `user`, `merchant`, `db`, `auth`, `signup`, `home`, `lunch`, `inventory`, `socket`, ...

### 예시
```
feat(merchant): 메뉴 ON/OFF 토글 + 재료 소진 자동 차단
fix(mockups): 09-home 마이크 FAB 깨진 링크 (10-voice → 11-voice)
refactor(auth): NextAuth callbacks를 별도 파일로 분리
docs: 디자인 가이드 v1 (디자인 토큰·컴포넌트)
chore(prisma): v7 → v6 다운그레이드 (breaking change 회피)
```

## 5. PR 템플릿

```markdown
## 변경 요약
- (한 줄)

## 변경 사항
- (체크리스트)

## 테스트
- [ ] 로컬 빌드 통과 (npm run build)
- [ ] 관련 화면 수동 테스트
- [ ] DB 마이그레이션 실행 OK

## 영향 도메인
- 본인: 
- 다른 작업자 영향: (없음 / A·B·C)

## 노션·이슈
- (관련 노션 페이지·Task 링크)
```

## 6. 첫 배포 (사용자 액션)

1. **Vercel 가입** → GitHub `zjoy8841/loo` 연결 → 자동 import
2. **Supabase 가입** → 새 프로젝트 `lifeosone` → DATABASE_URL 복사
3. Vercel Settings → Environment Variables → 위 표대로 입력
4. `web/prisma/schema.prisma` provider `sqlite` → `postgresql` 1줄 변경
5. `npx prisma migrate deploy` (배포 환경에서) 또는 Vercel build hook에 포함
6. main에 push → 자동 빌드 → 도메인 확인
7. **카카오 디벨로퍼** → 플랫폼 → 도메인에 Vercel 도메인 추가

## 7. 롤백

```bash
# 잘못된 커밋이 main에 들어간 경우
git revert <commit-sha>
git push origin main
# Vercel 자동 재배포
```

DB 마이그레이션 롤백:
```bash
npx prisma migrate resolve --rolled-back <migration-name>
# 그리고 수정된 새 migration 적용
```

## 8. 작업 일정 가이드

D-day 2026-05-29. 마지막 1주는 마이그레이션·실험 동결.

- 5/22까지: 모든 P0 머지
- 5/25까지: 리허설 통과
- 5/27~5/28: 비상 백업·문서·시연 환경 준비
- 5/29: D-day

---

**채울 차례인 작업자**: C
