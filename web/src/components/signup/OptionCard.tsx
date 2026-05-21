"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";

type CommonProps = {
  selected: boolean;
  onPress: () => void;
  icon?: ReactNode;
  label: ReactNode;
  sublabel?: ReactNode;
  wide?: boolean;
  size?: "default" | "compact";
};

export default function OptionCard({
  variant,
  ...props
}: CommonProps & { variant: "multi" | "single" }) {
  return variant === "single" ? (
    <RadioCard {...props} />
  ) : (
    <CheckboxCard {...props} />
  );
}

function baseClass({
  selected,
  wide,
  size = "default",
}: {
  selected: boolean;
  wide?: boolean;
  size?: "default" | "compact";
}) {
  const pad = size === "compact" ? "p-3" : "p-4";
  const minH = size === "compact" ? "min-h-[96px]" : "min-h-[110px]";
  return [
    "rounded-2xl text-left border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signup-accent/40",
    pad,
    minH,
    wide ? "col-span-2" : "",
    selected
      ? "bg-signup-accent text-white border-signup-accent"
      : "bg-white border-gray-300",
  ]
    .filter(Boolean)
    .join(" ");
}

function CardBody({
  icon,
  label,
  sublabel,
  selected,
  variant,
  size = "default",
}: {
  icon?: ReactNode;
  label: ReactNode;
  sublabel?: ReactNode;
  selected: boolean;
  variant: "multi" | "single";
  size?: "default" | "compact";
}) {
  const iconSize = size === "compact" ? "w-7 h-7" : "w-8 h-8";
  // multi = checkbox(rounded-[4px]), single = radio(rounded-full)
  const indicatorShape = variant === "multi" ? "rounded-[4px]" : "rounded-full";
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        {icon ? (
          <div
            className={[
              iconSize,
              "rounded-full border flex items-center justify-center shrink-0",
              selected
                ? "border-white/60 text-white"
                : "border-gray-400 text-gray-600",
            ].join(" ")}
          >
            {icon}
          </div>
        ) : (
          <div />
        )}
        <div
          aria-hidden
          className={[
            "w-[18px] h-[18px] border flex items-center justify-center shrink-0",
            indicatorShape,
            selected
              ? "bg-white border-white"
              : "border-gray-400 bg-transparent",
          ].join(" ")}
        >
          {selected ? (
            <Check size={12} strokeWidth={3} className="text-signup-accent" />
          ) : null}
        </div>
      </div>
      <div className="text-sm font-semibold leading-tight whitespace-pre-line mt-auto">
        {label}
      </div>
      {sublabel ? (
        <div
          className={`text-[10px] mt-1 ${
            selected ? "opacity-80" : "text-gray-400"
          }`}
        >
          {sublabel}
        </div>
      ) : null}
    </div>
  );
}

function CheckboxCard({
  selected,
  onPress,
  icon,
  label,
  sublabel,
  wide,
  size,
}: CommonProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onPress}
      className={baseClass({ selected, wide, size })}
    >
      <CardBody
        icon={icon}
        label={label}
        sublabel={sublabel}
        selected={selected}
        variant="multi"
        size={size}
      />
    </button>
  );
}

function RadioCard({
  selected,
  onPress,
  icon,
  label,
  sublabel,
  wide,
  size,
}: CommonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onPress}
      className={baseClass({ selected, wide, size })}
    >
      <CardBody
        icon={icon}
        label={label}
        sublabel={sublabel}
        selected={selected}
        variant="single"
        size={size}
      />
    </button>
  );
}
