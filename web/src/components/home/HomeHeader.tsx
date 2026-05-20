"use client";

import { Menu, Bell } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function HomeHeader({
  unreadCount,
  onMenu,
  onBell,
}: {
  unreadCount: number;
  onMenu?: () => void;
  onBell?: () => void;
}) {
  const t = useT();
  const bellAria =
    unreadCount > 0
      ? t("user.home.bell_aria", { count: unreadCount })
      : t("user.home.bell_aria_none");

  return (
    <header className="px-5 h-14 flex items-center bg-white">
      <button
        type="button"
        onClick={onMenu}
        aria-label={t("user.home.menu_aria")}
        className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
      >
        <Menu size={22} strokeWidth={1.75} />
      </button>
      <span className="mx-auto text-base font-semibold text-gray-900">
        {t("user.home.brand")}
      </span>
      <button
        type="button"
        onClick={onBell}
        aria-label={bellAria}
        className="w-10 h-10 -mr-2 flex items-center justify-center text-gray-700 relative"
      >
        <Bell size={22} strokeWidth={1.75} />
        {unreadCount > 0 && (
          <span
            aria-hidden
            className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gray-900"
          />
        )}
      </button>
    </header>
  );
}
