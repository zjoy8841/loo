import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import HomeView from "@/components/home/HomeView";
import {
  pickMenu,
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
          healthTags: true,
          dietTags: true,
          allergyTags: true,
        },
      },
    },
  });
  if (!user) redirect("/user");

  const profile = {
    healthTags: user.profile?.healthTags ?? [],
    dietTags: user.profile?.dietTags ?? [],
    allergyTags: user.profile?.allergyTags ?? [],
    shapeKey: user.profile?.shapeKey ?? null,
  };

  const menu = pickMenu(profile, session.user.id);
  const personaChips = buildPersonaChips(profile);
  const insight = buildInsight();

  const { mode } = await searchParams;
  const initialMode: "active" | "idle" = mode === "idle" ? "idle" : "active";

  return (
    <HomeView
      name={user.name ?? ""}
      initialMode={initialMode}
      menu={menu}
      personaChips={personaChips}
      insight={insight}
    />
  );
}
