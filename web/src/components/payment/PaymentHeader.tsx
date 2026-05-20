"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, X } from "lucide-react";
import { useT } from "@/lib/i18n";

export default function PaymentHeader({
  left = "back",
  backHref,
  title,
  stepPill,
  statusPill,
}: {
  left?: "back" | "close" | "none";
  backHref?: string;
  title: string;
  stepPill?: string;
  statusPill?: { label: string; tone?: "neutral" | "success" | "warning" | "danger" };
}) {
  const t = useT();
  const router = useRouter();

  function handleLeft() {
    if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  }

  const leftEl =
    left === "none" ? (
      <span className="w-10 h-10" />
    ) : (
      <button
        type="button"
        onClick={handleLeft}
        aria-label={left === "close" ? t("user.lunch_payment.close_aria") : t("user.lunch_payment.back_aria")}
        className="w-10 h-10 -ml-2 flex items-center justify-center text-gray-700"
      >
        {left === "close" ? <X size={20} strokeWidth={1.75} /> : <ChevronLeft size={22} strokeWidth={1.75} />}
      </button>
    );

  return (
    <header className="px-5 h-14 flex items-center bg-white sticky top-0 z-30">
      {leftEl}
      <span className="mx-auto text-base font-semibold text-gray-900 truncate">
        {title}
      </span>
      {stepPill ? (
        <span className="text-xs text-gray-500 font-medium -mr-2 w-10 text-right">
          {stepPill}
        </span>
      ) : statusPill ? (
        <span
          className={`-mr-2 px-2 h-7 inline-flex items-center text-[11px] font-semibold rounded-full ${pillTone(
            statusPill.tone,
          )}`}
        >
          {statusPill.label}
        </span>
      ) : (
        <span className="w-10 h-10" />
      )}
    </header>
  );
}

function pillTone(tone?: "neutral" | "success" | "warning" | "danger") {
  switch (tone) {
    case "success":
      return "bg-gray-900 text-white";
    case "warning":
      return "bg-gray-200 text-gray-900";
    case "danger":
      return "bg-gray-100 text-gray-900 border border-gray-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

// 일관성 위해 Link 진입은 PaymentHeader 자체에서 처리하므로 외부 Link 의존 X.
// 명시적 backHref가 필요한 경우만 사용.
export function PaymentHeaderLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-xs text-gray-500 hover:text-gray-900">
      {label}
    </Link>
  );
}
