"use client";

import type { ReactNode } from "react";

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
  return [
    "rounded-2xl text-left border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signup-accent/40",
    pad,
    wide ? "col-span-2" : "",
    selected
      ? "bg-signup-accent text-white border-signup-accent"
      : "bg-white border-gray-200",
  ]
    .filter(Boolean)
    .join(" ");
}

function CardBody({
  icon,
  label,
  sublabel,
  selected,
  size = "default",
}: {
  icon?: ReactNode;
  label: ReactNode;
  sublabel?: ReactNode;
  selected: boolean;
  size?: "default" | "compact";
}) {
  return (
    <>
      {icon ? (
        <div className={size === "compact" ? "text-xl mb-1" : "text-2xl mb-1.5"}>
          {icon}
        </div>
      ) : null}
      <div className="text-sm font-semibold leading-tight whitespace-pre-line">
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
    </>
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
        size={size}
      />
    </button>
  );
}
