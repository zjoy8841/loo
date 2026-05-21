"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useT } from "@/lib/i18n";
import HomeHeader from "./HomeHeader";
import ChatInputBar from "./ChatInputBar";
import HomeActive from "./HomeActive";
import HomeIdle from "./HomeIdle";

export default function HomeView({
  name,
  initialMode,
}: {
  name: string;
  initialMode: "active" | "idle";
}) {
  const t = useT();
  const router = useRouter();
  const [mode, setMode] = useState<"active" | "idle">(initialMode);

  function handleChat() {
    if (mode === "idle") setMode("active");
  }

  function handleQuickAction() {
    setMode("active");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white pb-24">
      <HomeHeader
        unreadCount={mode === "active" ? 3 : 0}
        onBell={() => router.push("/user/notifications")}
        onMenu={() => alert("사이드 패널은 v0.2에서 — 메뉴 항목 미확정")}
      />
      <main className="flex-1 flex flex-col px-5">
        {mode === "active" ? (
          <HomeActive name={name} />
        ) : (
          <HomeIdle
            name={name}
            timeLabel={t("user.home.time_label.lunch")}
            onQuickAction={handleQuickAction}
          />
        )}
      </main>
      <ChatInputBar onSubmit={handleChat} />
    </div>
  );
}
