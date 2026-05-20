import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// 현재 로그인 사용자 + Profile 반환.
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

  return NextResponse.json(user);
}
