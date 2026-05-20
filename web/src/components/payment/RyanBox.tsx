"use client";

import { Sparkles, Clock, ShieldCheck, Compass } from "lucide-react";
import { useT } from "@/lib/i18n";

type Variant = "reason" | "wait" | "promise" | "alternative";

const VARIANT_ICON: Record<Variant, typeof Sparkles> = {
  reason: Sparkles,
  wait: Clock,
  promise: ShieldCheck,
  alternative: Compass,
};

export default function RyanBox({
  variant,
  heading,
  body,
  cta,
}: {
  variant: Variant;
  heading: string;
  body: React.ReactNode;
  cta?: React.ReactNode;
}) {
  const t = useT();
  const Icon = VARIANT_ICON[variant];
  return (
    <section
      role="region"
      aria-label={t("user.lunch_payment.menu.ryan_label")}
      className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon size={14} strokeWidth={1.75} className="text-gray-500" aria-hidden />
        <span className="text-[11px] font-semibold tracking-wider text-gray-500">
          {t("user.lunch_payment.menu.ryan_label")}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-900">{heading}</p>
      <div className="mt-1 text-sm text-gray-700 leading-relaxed">{body}</div>
      {cta && <div className="mt-2">{cta}</div>}
    </section>
  );
}
