import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import HomeView from "@/components/home/HomeView";

export default async function UserHome({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/user");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });
  if (!user) redirect("/user");

  const { mode } = await searchParams;
  const initialMode: "active" | "idle" = mode === "idle" ? "idle" : "active";

  return <HomeView name={user.name ?? ""} initialMode={initialMode} />;
}
