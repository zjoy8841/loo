"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";
import { JOBS } from "@/lib/enums";
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

export default function SignupJob() {
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
          body: JSON.stringify({ jobKey: JOBS[selected].key }),
        });
      }
      router.push("/user/signup/interests");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SignupShell
      step={6}
      backHref="/user/signup/lifestyle"
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
        icon={<Briefcase size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step6.heading")}
        mode="single"
        description={t("signup.step6.description")}
      />
      <OptionGrid variant="single">
        {JOBS.map((j, i) => (
          <OptionCard
            key={j.key}
            variant="single"
            selected={selected === i}
            onPress={() => setSelected(i)}
            icon={<EnumIcon name={j.iconKey} size={28} />}
            label={j.label}
            sublabel={j.description}
            wide={j.key === "etc"}
          />
        ))}
      </OptionGrid>
    </SignupShell>
  );
}
