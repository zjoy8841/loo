"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Coffee } from "lucide-react";
import { LIFESTYLE_TAGS } from "@/lib/enums";
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

export default function SignupLifestyle() {
  const router = useRouter();
  const t = useT();
  const [selected, setSelected] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (i: number) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const lifestyleTags = selected.map((i) => LIFESTYLE_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lifestyleTags }),
        });
      }
      router.push("/user/signup/job");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SignupShell
      step={5}
      backHref="/user/signup/diet"
      bottomActions={
        <BottomActions>
          <LaterButton onPress={() => handleNext(true)} disabled={submitting} />
          <PrimaryActionButton
            label={t("signup.cta.next")}
            onPress={() => handleNext(false)}
            loading={submitting}
            disabled={selected.length === 0}
          />
        </BottomActions>
      }
    >
      <StepIntro
        icon={<Coffee size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step5.heading")}
        mode="multi"
        description={t("signup.step5.description")}
      />
      <OptionGrid variant="multi">
        {LIFESTYLE_TAGS.map((tag, i) => (
          <OptionCard
            key={tag.key}
            variant="multi"
            selected={selected.includes(i)}
            onPress={() => toggle(i)}
            icon={<EnumIcon name={tag.iconKey} size={28} />}
            label={tag.label}
          />
        ))}
      </OptionGrid>

      <div className="mt-8 bg-signup-accent-soft rounded-2xl px-4 py-3 flex gap-3 items-start">
        <p className="text-sm text-signup-accent-deep leading-relaxed">
          {t("signup.step5.banner")}
        </p>
      </div>
    </SignupShell>
  );
}
