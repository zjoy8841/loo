# 데이터베이스 가이드

> 담당: **C** · 상태: 스켈레톤
> 스키마 실제 정의: `web/prisma/schema.prisma`

## 1. DB 선택

| 단계 | DB | 이유 |
|------|-----|------|
| 로컬 개발 | SQLite (`prisma/dev.db`) | 셋업 0초·파일 1개 |
| 배포 | Postgres (Supabase) | 무료 500MB·확장성·관계형 |

스키마 호환성: `String` (JSON 직렬화) → Postgres 이전 시 `String[]`로 교체.

## 2. 현재 모델 (5개 + enum)

```
User           id, email, passwordHash, name, role, merchantId?, createdAt, updatedAt
Profile        userId(PK), shapeKey?, jobKey?, healthTags, dietTags,
               allergyTags, lifestyleTags, interests, addressLat?, addressLng?
Merchant       id, name, category, address, lat?, lng?, businessHours?, phone?,
               description?, thumbnail?, tags, active, createdAt, updatedAt
Menu           id, merchantId, name, price, kcal?, proteinG?, prepMinutes?,
               description?, dietTags, allergens, isSignature, active, createdAt
Reservation    id, userId, merchantId, menuId?, status, reservationTime,
               partySize, note?, createdAt, updatedAt
```

`role`: `USER` | `MERCHANT`
`status`: `PENDING` | `ACCEPTED` | `REJECTED` | `CANCELLED` | `COMPLETED`

태그류는 모두 `String` 컬럼에 JSON 직렬화 (예: `'["cholesterol","fatigue"]'`).
파싱은 `src/lib/persona.ts`의 `parseJsonArray()` 사용.

## 3. 가맹점 확장 모델 (NEW, 작업자 C)

> 회의 결정: 스타벅스급 본장 운영을 위해 메뉴 ON/OFF · 재고 · 주문 취소 기능.

```
Menu                추가 컬럼:
                    └ outOfStock: Boolean  (재료 소진 자동 플래그)

Ingredient          id, merchantId, name, unit, currentStock, minStock, updatedAt
MenuIngredient      menuId, ingredientId, qtyPerServing  (메뉴 1인분 레시피)

Reservation         추가 컬럼:
                    ├ cancelReason: String?   (취소 사유)
                    └ cancelledBy: String?    (USER | MERCHANT | SYSTEM)
```

자동 차단 로직: 주문 발생 시 `MenuIngredient`로 필요 재료 차감 → `currentStock` < `minStock` 이면 `Menu.outOfStock = true` 트리거.

## 4. 마이그레이션 흐름

```bash
# 스키마 수정 후
cd web
npx prisma migrate dev --name <변경_요약>
# → prisma/migrations/YYYYMMDDHHMMSS_변경_요약/ 생성 + dev.db 적용
```

PR 전 체크:
- [ ] 새 마이그레이션 파일 커밋
- [ ] `dev.db`는 gitignored (커밋 X)
- [ ] 다른 작업자 환경에 영향 시 PR 설명에 명시

## 5. SQLite → Postgres 전환

배포 시 1회만:

```prisma
datasource db {
  provider = "postgresql"  // sqlite → postgresql
  url      = env("DATABASE_URL")
}
```

`DATABASE_URL` Supabase 연결 문자열로 교체 → `npx prisma migrate deploy`.

JSON 컬럼은 그대로 동작. 추후 native `String[]` 로 마이그레이션 고려.

## 6. 시드 데이터

| 시드 | 위치 | 담당 |
|------|------|------|
| 가맹점·메뉴 (xlsx) | `web/scripts/seed-merchants.mjs` | C |
| 더미 가맹점 계정 (B카페) | 같은 시드 | C |
| 시연용 더미 사용자 | 없음 (청중이 직접 가입) | — |

시드 실행:
```bash
cd web
npx tsx scripts/seed-merchants.mjs
```

## 7. 인덱스 · 성능

```prisma
@@index([userId])
@@index([merchantId])
@@index([status])  // Reservation 상태 조회 빈번
```

## 8. 백업

- 로컬 dev.db: gitignored·일회용
- Supabase: 무료 플랜은 7일 PITR. 시연 임박 시 수동 export

## 9. 데이터 정책

- 비밀번호: bcrypt hash 10 round (절대 plain 저장 X)
- 결제 정보: **저장 안 함** (더미 결제만)
- 의료 데이터: 시연 단계 X. 사용자 직접 입력 태그 외 수집 안 함

---

**채울 차례인 작업자**: C
