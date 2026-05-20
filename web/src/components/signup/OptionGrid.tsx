import type { ReactNode } from "react";

export default function OptionGrid({
  children,
  variant,
  labelledBy = "step-heading",
  className = "",
}: {
  children: ReactNode;
  variant: "multi" | "single";
  labelledBy?: string;
  className?: string;
}) {
  return (
    <div
      role={variant === "single" ? "radiogroup" : "group"}
      aria-labelledby={labelledBy}
      className={`grid grid-cols-2 gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
