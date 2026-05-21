import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const emailSchema = z.string().email();

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email") ?? "";
  const parsed = emailSchema.safeParse(email);
  if (!parsed.success) {
    return NextResponse.json(
      { available: false, reason: "invalid" },
      { status: 400 },
    );
  }
  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return NextResponse.json({ available: !existing });
}
