// 환경변수 런타임 검증.
// 누락된 필수 변수는 서버 시작 시 즉시 실패시켜 prod 사고를 막는다.
//
// 빌드 시점(`next build`)에는 process.env가 빌드 환경 값을 사용. Vercel은
// 빌드/런타임 모두 동일한 env scope 주입.

import { z } from "zod";

const schema = z.object({
  // Database (Supabase Postgres)
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL required — Supabase pooler connection (port 6543)"),
  DIRECT_URL: z
    .string()
    .min(1, "DIRECT_URL required — Supabase direct connection (port 5432, for migrations)"),

  // NextAuth
  NEXTAUTH_SECRET: z
    .string()
    .min(32, "NEXTAUTH_SECRET required — 32+ char base64 (openssl rand -base64 32)"),
  NEXTAUTH_URL: z.string().url().optional(),

  // Optional external services
  NEXT_PUBLIC_KAKAO_JS_KEY: z.string().optional(),
  NOTION_TOKEN: z.string().optional(),
  NOTION_MERCHANT_DS_ID: z.string().optional(),
  NOTION_MENU_DS_ID: z.string().optional(),
});

function parseEnv() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`[env] 환경변수 검증 실패:\n${issues}`);
  }
  return parsed.data;
}

// Skip validation during `prisma generate` etc (DATABASE_URL not needed there).
// Vercel·로컬 dev·런타임에서는 검증 적용.
export const env =
  process.env.SKIP_ENV_VALIDATION === "1"
    ? (process.env as unknown as z.infer<typeof schema>)
    : parseEnv();
