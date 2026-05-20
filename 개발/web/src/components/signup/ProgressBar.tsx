"use client";

import { useT } from "@/lib/i18n";

export default function ProgressBar({
  step,
  total = 7,
}: {
  step: number;
  total?: number;
}) {
  const t = useT();
  const pct = Math.max(0, Math.min(100, (step / total) * 100));
  return (
    <div className="px-6">
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={t("signup.progressAria", { step, total })}
        className="h-1 bg-gray-200 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-signup-accent transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
