import { z } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// 회원가입 2~7단계가 각자 해당 필드만 PATCH로 호출.
// 보내지 않은 필드는 변경되지 않음. "건너뛰기"는 그냥 호출 안 함.
const schema = z.object({
  shapeKey: z.string().nullable().optional(),
  jobKey: z.string().nullable().optional(),
  healthTags: z.array(z.string()).optional(),
  dietTags: z.array(z.string()).optional(),
  allergyTags: z.array(z.string()).optional(),
  lifestyleTags: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  addressLat: z.number().nullable().optional(),
  addressLng: z.number().nullable().optional(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요해요" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON 파싱 실패" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
  }

  const input = parsed.data;
  const data: Record<string, unknown> = {};
  if (input.shapeKey !== undefined) data.shapeKey = input.shapeKey;
  if (input.jobKey !== undefined) data.jobKey = input.jobKey;
  if (input.healthTags) data.healthTags = JSON.stringify(input.healthTags);
  if (input.dietTags) data.dietTags = JSON.stringify(input.dietTags);
  if (input.allergyTags) data.allergyTags = JSON.stringify(input.allergyTags);
  if (input.lifestyleTags) data.lifestyleTags = JSON.stringify(input.lifestyleTags);
  if (input.interests) data.interests = JSON.stringify(input.interests);
  if (input.addressLat !== undefined) data.addressLat = input.addressLat;
  if (input.addressLng !== undefined) data.addressLng = input.addressLng;

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    create: { userId: session.user.id, ...data },
    update: data,
  });

  return NextResponse.json(profile);
}
