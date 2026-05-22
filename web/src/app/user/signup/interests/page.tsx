"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { INTERESTS } from "@/lib/enums";
import { useT } from "@/lib/i18n";
import {
  SignupShell,
  StepIntro,
  OptionGrid,
  OptionCard,
  BottomActions,
  LaterButton,
  PrimaryActionButton,
  EnumIcon,
} from "@/components/signup";

export default function SignupInterests() {
  const router = useRouter();
  const t = useT();
  const [selected, setSelected] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleFinish(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const interests = selected.map((i) => INTERESTS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interests }),
        });
      }
      router.push("/user/home");
    } finally {
      setSubmitting(false);
    }
  }

  // description §9 ICU plural — i18n key로 분기 처리
  const counterText =
    selected.length === 0
      ? t("signup.step7.counterEmpty")
      : t("signup.step7.counterSome", { count: selected.length });

  return (
    <SignupShell
      step={7}
      backHref="/user/signup/job"
      scrollable
      bottomActions={
        <BottomActions>
          <LaterButton
            onPress={() => handleFinish(true)}
            disabled={submitting}
          />
          <PrimaryActionButton
            label={t("signup.cta.complete")}
            onPress={() => handleFinish(false)}
            loading={submitting}
            loadingLabel={t("signup.cta.loadingSubmit")}
          />
        </BottomActions>
      }
    >
      <StepIntro
        icon={<Sparkles size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step7.heading")}
        mode="multi-min3"
        description={t("signup.step7.description")}
      />
      <p
        aria-live="polite"
        className="text-xs text-gray-500 mb-3"
      >
        {counterText}
      </p>
      <OptionGrid variant="multi" className="!gap-2.5">
        {INTERESTS.map((it, i) => (
          <OptionCard
            key={it.key}
            variant="multi"
            selected={selected.includes(i)}
            onPress={() => toggle(i)}
            icon={<EnumIcon name={it.iconKey} size={24} />}
            label={it.label}
            size="compact"
          />
        ))}
      </OptionGrid>
    </SignupShell>
  );
}
