import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아니에요"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 해요"),
  name: z.string().min(1, "이름을 입력해주세요"),
  agreeTerms: z.literal(true, {
    message: "서비스 이용약관 동의가 필요해요",
  }),
  agreePrivacy: z.literal(true, {
    message: "개인정보 처리방침 동의가 필요해요",
  }),
  agreeMarketing: z.boolean().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON 파싱 실패" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 },
    );
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "이미 가입된 이메일이에요" },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      profile: { create: {} }, // Profile은 빈 값으로 자동 생성, 이후 7단계에서 PATCH
    },
    select: { id: true, email: true, name: true },
  });

  return NextResponse.json(user, { status: 201 });
}
