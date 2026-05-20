import type { ReactNode } from "react";
import StepHeader from "./StepHeader";
import ProgressBar from "./ProgressBar";

/**
 * 회원가입 2~7단계 공통 쉘. 1단계(account)는 form 구조가 달라 별도.
 *
 * 레이아웃 (description §2):
 *  ① StepHeader  ② ProgressBar  ③~⑥ 콘텐츠(children)  ⑦ BottomActions
 */
export default function SignupShell({
  step,
  total = 7,
  backHref,
  counterLabel,
  scrollable,
  children,
  bottomActions,
}: {
  step: number;
  total?: number;
  backHref: string;
  counterLabel?: string;
  scrollable?: boolean;
  children: ReactNode;
  bottomActions: ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col">
      <StepHeader
        step={step}
        total={total}
        backHref={backHref}
        counterLabel={counterLabel}
      />
      <ProgressBar step={step} total={total} />
      <div
        className={`flex-1 px-6 pt-10 ${scrollable ? "overflow-y-auto" : ""}`}
      >
        {children}
      </div>
      {bottomActions}
    </main>
  );
}
