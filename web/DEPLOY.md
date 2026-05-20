# 배포 가이드 — Life OS.ONE → Vercel + Supabase

> 비개발자도 따라할 수 있게 단계별로 적어놨다. 한 번 셋업하면 이후 git push마다 자동 배포된다.

## 0. 준비

- GitHub 계정 (zjoy8841 — 이미 있음)
- 카드 등록 불필요 — Vercel·Supabase 무료 플랜만 사용

---

## 1. Supabase 가입 + 프로젝트 생성

1. https://supabase.com → **Start your project** → GitHub로 가입
2. **New project**
   - Name: `lifeosone`
   - Database Password: **강력한 비밀번호 생성 → 어딘가 메모해두기** (한 번만 표시됨)
   - Region: `Northeast Asia (Seoul)` 또는 가까운 지역
3. 프로젝트 생성 2~3분 대기

### Database URL 복사 (2개 필요)

생성 끝나면 좌측 메뉴 **Project Settings** (⚙️) → **Database** → **Connection string**.

| 종류 | 모드 | 용도 |
|---|---|---|
| **Transaction** (port 6543) | 런타임 쿼리 | `DATABASE_URL`에 사용 |
| **Direct connection** (port 5432) | 마이그레이션 | `DIRECT_URL`에 사용 |

각각 URI 형식으로 복사. `[YOUR-PASSWORD]` 자리에 위에서 메모한 비밀번호 넣기.

예시:
```
DATABASE_URL=postgresql://postgres.abcdefgh:비밀번호@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://postgres.abcdefgh:비밀번호@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres
```

> ⚠️ `?pgbouncer=true&connection_limit=1` 옵션이 DATABASE_URL 끝에 붙어야 한다.

---

## 2. NEXTAUTH_SECRET 생성

PowerShell에서:
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
출력된 문자열을 메모. (또는 https://generate-secret.vercel.app/32)

---

## 3. GitHub에 push

이미 zjoy8841/loo 리포가 있으면 그쪽으로. 없으면 생성:

```powershell
git remote add origin https://github.com/zjoy8841/loo.git   # 이미 있으면 skip
git push -u origin main
```

---

## 4. Vercel 가입 + 프로젝트 import

1. https://vercel.com → GitHub로 가입
2. **Add New → Project** → `zjoy8841/loo` 선택 → Import
3. **Root Directory**: `개발/web` 클릭해서 선택 (한글 폴더라 인식 가능. 안 되면 영문 alias 필요)
4. **Build & Output Settings**: 기본값 (`prisma generate && next build`가 자동 적용됨)

### 환경변수 입력

**Environment Variables** 섹션에 추가:

| Name | Value |
|---|---|
| `DATABASE_URL` | (1번에서 복사한 pooler URL) |
| `DIRECT_URL` | (1번에서 복사한 direct URL) |
| `NEXTAUTH_SECRET` | (2번에서 생성한 base64 문자열) |
| `NEXT_PUBLIC_KAKAO_JS_KEY` | (선택 — 지도 안 쓰면 비워둠) |

> `NEXTAUTH_URL`은 입력 안 함 — Vercel이 자동으로 `VERCEL_URL` 주입.

**Deploy** 클릭.

---

## 5. 첫 배포 후 DB 스키마 적용

빌드 성공 후 첫 진입 시 DB 테이블이 비어있다 — migrations 실행 필요.

방법 A — Vercel 대시보드:
1. 프로젝트 → **Settings** → **Functions** → **Logs** 확인
2. 첫 가입 시도 시 "table does not exist" 에러 나오면 → 방법 B

방법 B — 로컬에서 prod DB로 migration deploy:
```powershell
# .env.local에 prod DATABASE_URL·DIRECT_URL 임시 복사
npm run db:deploy
```
완료 후 .env.local의 prod URL은 다시 로컬 URL로 되돌리기.

> 권장: Supabase 무료 한 프로젝트 + 로컬 dev도 같은 DB 사용. 데이터 분리 필요해지면 두 번째 프로젝트 생성.

---

## 6. 확인

배포 URL (예: `https://lifeosone-xxx.vercel.app/user/signup/account`)로 접속 → 회원가입 → 로그인 동작 확인.

---

## 이후 배포 흐름

```powershell
git add .
git commit -m "메시지"
git push
```

푸시 후 Vercel이 자동 빌드 + 배포. 환경변수 추가하려면 Vercel 대시보드 → Settings → Environment Variables.

---

## 자주 만나는 함정

- **빌드 실패 "Can't reach database server"**: `DATABASE_URL`에 `?pgbouncer=true&connection_limit=1` 옵션 누락.
- **migrate deploy "Direct connection required"**: `DIRECT_URL` 미설정 또는 port 5432 아님.
- **`NEXTAUTH_SECRET` 누락 에러**: 환경변수 추가 후 **Redeploy** 필요 (변수만 추가하면 즉시 반영 안 됨).
- **회원가입 시 "table not found"**: 5번 — migration 미실행. `npm run db:deploy` 또는 Supabase 대시보드 → SQL Editor에서 직접.
- **카카오맵 안 보임**: `NEXT_PUBLIC_KAKAO_JS_KEY` 입력 + Kakao Developers의 사이트 도메인에 Vercel URL 등록.

---

## 다음 단계 (선택)

- 커스텀 도메인 (예: `lifeosone.com`) → Vercel Settings → Domains
- Supabase Row Level Security (RLS) — 정식 서비스 진입 시
- Vercel Preview Deployments — PR마다 별도 URL 자동 생성
