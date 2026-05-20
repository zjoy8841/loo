"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target } from "lucide-react";
import { SHAPE_GOALS } from "@/lib/enums";
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

export default function SignupShape() {
  const router = useRouter();
  const t = useT();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip && selected !== null) {
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shapeKey: SHAPE_GOALS[selected].key }),
        });
      }
      router.push("/user/signup/diet");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SignupShell
      step={3}
      backHref="/user/signup/health"
      bottomActions={
        <BottomActions>
          <LaterButton onPress={() => handleNext(true)} disabled={submitting} />
          <PrimaryActionButton
            label={t("signup.cta.next")}
            onPress={() => handleNext(false)}
            loading={submitting}
            disabled={selected === null}
          />
        </BottomActions>
      }
    >
      <StepIntro
        icon={<Target size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step3.heading")}
        mode="single"
        description={t("signup.step3.description")}
      />
      <OptionGrid variant="single">
        {SHAPE_GOALS.map((tag, i) => (
          <OptionCard
            key={tag.key}
            variant="single"
            selected={selected === i}
            onPress={() => setSelected(i)}
            icon={<EnumIcon name={tag.iconKey} size={28} />}
            label={tag.label}
            wide={tag.key === "maintain"}
          />
        ))}
      </OptionGrid>
    </SignupShell>
  );
}
