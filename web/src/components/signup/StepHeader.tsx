"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function StepHeader({
  step,
  total = 7,
  backHref,
  counterLabel,
}: {
  step: number;
  total?: number;
  backHref: string;
  counterLabel?: string;
}) {
  const t = useT();
  return (
    <header className="px-6 pt-6 pb-4 flex items-center justify-between">
      <Link
        href={backHref}
        aria-label={t("signup.back")}
        className="text-2xl text-gray-500"
      >
        ←
      </Link>
      <span className="text-sm text-gray-500">
        {counterLabel ??
          t("signup.progressCounter", { step, total })}
      </span>
    </header>
  );
}
