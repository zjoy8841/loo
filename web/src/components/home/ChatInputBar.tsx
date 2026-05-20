"use client";

import { Plus, Mic, ArrowUp } from "lucide-react";
import { useState } from "react";
import { useT } from "@/lib/i18n";

export default function ChatInputBar({
  onSubmit,
}: {
  onSubmit?: (text: string) => void;
}) {
  const t = useT();
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-200 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        <button
          type="button"
          aria-label={t("user.home.chat.attach_aria")}
          className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
        >
          <Plus size={18} strokeWidth={1.75} />
        </button>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("user.home.chat.placeholder")}
          className="flex-1 h-10 bg-gray-100 rounded-full px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border focus:border-gray-300"
        />
        <button
          type="button"
          aria-label={t("user.home.chat.mic_aria")}
          className="w-10 h-10 shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
        >
          <Mic size={18} strokeWidth={1.75} />
        </button>
        <button
          type="submit"
          aria-label={t("user.home.chat.send_aria")}
          disabled={!text.trim()}
          className="w-10 h-10 shrink-0 rounded-full bg-signup-accent text-white flex items-center justify-center disabled:bg-gray-300 transition"
        >
          <ArrowUp size={18} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
