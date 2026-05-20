"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";
import { HEALTH_TAGS } from "@/lib/enums";
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

export default function SignupHealth() {
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
        const healthTags = selected.map((i) => HEALTH_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ healthTags }),
        });
      }
      router.push("/user/signup/shape");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SignupShell
      step={2}
      backHref="/user/signup/account"
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
        icon={<Stethoscope size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step2.heading")}
        mode="multi"
        description={t("signup.step2.description")}
      />
      <OptionGrid variant="multi">
        {HEALTH_TAGS.map((tag, i) => (
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
    </SignupShell>
  );
}
