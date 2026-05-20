"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

/**
 * StepIcon + StepHeading + ModeChip + StepDescription 4개를 묶은 헤더 영역.
 * description §2 공통 레이아웃의 ③~⑥.
 */
export default function StepIntro({
  icon,
  heading,
  description,
  mode,
  headingId = "step-heading",
}: {
  icon?: ReactNode;
  heading: ReactNode;
  description?: ReactNode;
  mode?: "multi" | "single" | "multi-min3";
  headingId?: string;
}) {
  return (
    <div>
      {icon ? <div className="text-3xl mb-3">{icon}</div> : null}
      <h1 id={headingId} className="text-2xl font-bold mb-2">
        {heading}
      </h1>
      {mode ? <ModeChip mode={mode} /> : null}
      {description ? (
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ModeChip({ mode }: { mode: "multi" | "single" | "multi-min3" }) {
  const t = useT();
  const key =
    mode === "single"
      ? "signup.mode.single"
      : mode === "multi-min3"
        ? "signup.mode.multiMin3"
        : "signup.mode.multi";
  return (
    <p
      aria-hidden="true"
      className="text-xs text-signup-accent-deep/70 mb-3 font-medium"
    >
      {t(key)}
    </p>
  );
}
