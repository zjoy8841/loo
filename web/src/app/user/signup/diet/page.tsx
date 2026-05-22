"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { UtensilsCrossed, AlertCircle } from "lucide-react";
import { DIET_TAGS, ALLERGY_TAGS } from "@/lib/enums";
import { useT } from "@/lib/i18n";
import {
  SignupShell,
  StepIntro,
  OptionGrid,
  OptionCard,
  BottomActions,
  LaterButton,
  PrimaryActionButton,
  ConfirmDialog,
  EnumIcon,
} from "@/components/signup";

export default function SignupDiet() {
  const router = useRouter();
  const t = useT();
  const [diet, setDiet] = useState<number[]>([]);
  const [allergy, setAllergy] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [allergySkipDialogOpen, setAllergySkipDialogOpen] = useState(false);

  // description §5: 알레르기 미입력 상태에서 "건너뛰기" 클릭 시 strong-warn 다이얼로그
  const requestSkip = () => {
    if (allergy.length === 0) {
      setAllergySkipDialogOpen(true);
    } else {
      handleNext(true);
    }
  };

  const toggle = (setter: Dispatch<SetStateAction<number[]>>, i: number) =>
    setter((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  async function handleNext(skip = false) {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!skip) {
        const dietTags = diet.map((i) => DIET_TAGS[i].key);
        const allergyTags = allergy.map((i) => ALLERGY_TAGS[i].key);
        await fetch("/api/me/profile", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dietTags, allergyTags }),
        });
      }
      router.push("/user/signup/lifestyle");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SignupShell
      step={4}
      backHref="/user/signup/shape"
      scrollable
      bottomActions={
        <BottomActions>
          <LaterButton
            onPress={requestSkip}
            disabled={submitting}
            warnLevel="strong"
          />
          <PrimaryActionButton
            label={t("signup.cta.next")}
            onPress={() => handleNext(false)}
            loading={submitting}
          />
        </BottomActions>
      }
    >
      <StepIntro
        icon={<UtensilsCrossed size={32} strokeWidth={1.5} aria-hidden />}
        heading={t("signup.step4.heading")}
        description={t("signup.step4.description")}
      />

      <SectionLabel>{t("signup.step4.section.diet")}</SectionLabel>
      <OptionGrid variant="multi" className="mb-6">
        {DIET_TAGS.map((tag, i) => (
          <OptionCard
            key={tag.key}
            variant="multi"
            selected={diet.includes(i)}
            onPress={() => toggle(setDiet, i)}
            icon={<EnumIcon name={tag.iconKey} size={24} />}
            label={tag.label}
            size="compact"
          />
        ))}
      </OptionGrid>

      <SectionLabel>{t("signup.step4.section.allergy")}</SectionLabel>
      <OptionGrid variant="multi">
        {ALLERGY_TAGS.map((tag, i) => (
          <OptionCard
            key={tag.key}
            variant="multi"
            selected={allergy.includes(i)}
            onPress={() => toggle(setAllergy, i)}
            icon={<EnumIcon name={tag.iconKey} size={24} />}
            label={tag.label}
            size="compact"
          />
        ))}
      </OptionGrid>

      {allergy.length === 0 && (
        <div
          role="note"
          className="mt-4 flex items-start gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
        >
          <AlertCircle
            size={20}
            strokeWidth={1.75}
            aria-hidden
            className="text-gray-700 shrink-0 mt-0.5"
          />
          <p className="text-[11px] font-bold text-gray-700 leading-relaxed">
            {t("signup.step4.allergyWarn")}
          </p>
        </div>
      )}

      <ConfirmDialog
        open={allergySkipDialogOpen}
        title={t("signup.step4.skipDialog.title")}
        description={t("signup.step4.skipDialog.description")}
        cancelLabel={t("signup.step4.skipDialog.cancel")}
        confirmLabel={t("signup.step4.skipDialog.confirm")}
        confirmVariant="danger"
        onCancel={() => setAllergySkipDialogOpen(false)}
        onConfirm={() => {
          setAllergySkipDialogOpen(false);
          handleNext(true);
        }}
      />
    </SignupShell>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}
