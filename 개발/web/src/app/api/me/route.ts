import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// 현재 로그인 사용자 + Profile 반환.
// JSON-as-String 컬럼은 parse해서 array로 내려줌 (클라이언트 사용 편의).
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "로그인이 필요해요" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      profile: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "사용자를 찾을 수 없어요" }, { status: 404 });
  }

  const profile = user.profile
    ? {
        ...user.profile,
        healthTags: safeJsonArray(user.profile.healthTags),
        dietTags: safeJsonArray(user.profile.dietTags),
        allergyTags: safeJsonArray(user.profile.allergyTags),
        lifestyleTags: safeJsonArray(user.profile.lifestyleTags),
        interests: safeJsonArray(user.profile.interests),
      }
    : null;

  return NextResponse.json({ ...user, profile });
}

function safeJsonArray(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const arr = JSON.parse(s);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
