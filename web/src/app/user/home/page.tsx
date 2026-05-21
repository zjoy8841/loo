import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import HomeView from "@/components/home/HomeView";
import {
  pickMenuCandidates,
  buildPersonaChips,
  buildInsight,
} from "@/lib/recommendation/recommend";

export default async function UserHome({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/user");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      profile: {
        select: {
          shapeKey: true,
          jobKey: true,
          healthTags: true,
          dietTags: true,
          allergyTags: true,
          lifestyleTags: true,
          interests: true,
        },
      },
    },
  });
  if (!user) redirect("/user");

  // 회원가입 1단계만 마치고 URL 직접 입력으로 메인 시도하는 케이스 차단.
  // Profile row 자체가 없거나 모든 단계 필드가 비어있으면 2단계(health)로 회수.
  const p = user.profile;
  const completelyEmpty =
    !p ||
    (p.healthTags.length === 0 &&
      p.dietTags.length === 0 &&
      p.lifestyleTags.length === 0 &&
      p.interests.length === 0 &&
      !p.shapeKey &&
      !p.jobKey);
  if (completelyEmpty) redirect("/user/signup/health");

  const profile = {
    healthTags: p.healthTags,
    dietTags: p.dietTags,
    allergyTags: p.allergyTags,
    shapeKey: p.shapeKey,
  };

  const candidates = pickMenuCandidates(profile, session.user.id, 6);
  const personaChips = buildPersonaChips(profile);
  const insight = buildInsight();

  const { mode } = await searchParams;
  const initialMode: "active" | "idle" = mode === "active" ? "active" : "idle";

  return (
    <HomeView
      name={user.name ?? ""}
      initialMode={initialMode}
      candidates={candidates}
      personaChips={personaChips}
      insight={insight}
    />
  );
}
