"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * description §5 strong-warn 확인 다이얼로그.
 * Native <dialog> 사용으로 focus trap · backdrop inert · Esc dismiss 자동.
 *
 * 사용 예 (4단계 알레르기 미입력 후 건너뛰기):
 *   <ConfirmDialog
 *     open={open}
 *     title="알레르기 정보 없이 건너뛸까요?"
 *     description="..."
 *     confirmLabel="네, 건너뛸게요"
 *     onConfirm={() => { setOpen(false); handleNext(true); }}
 *     onCancel={() => setOpen(false)}
 *     confirmVariant="danger"
 *   />
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  cancelLabel = "다시 입력",
  confirmLabel = "확인",
  confirmVariant = "primary",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: "primary" | "danger";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const handleCancel = (e: Event) => {
      e.preventDefault(); // Esc 기본 close 막고 onCancel로 위임
      onCancel();
    };
    dlg.addEventListener("cancel", handleCancel);
    return () => dlg.removeEventListener("cancel", handleCancel);
  }, [onCancel]);

  const confirmClass =
    confirmVariant === "danger"
      ? "bg-danger hover:bg-danger/90 text-white"
      : "bg-signup-accent hover:bg-signup-accent-hover text-white";

  return (
    <dialog
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby={description ? "confirm-desc" : undefined}
      className="rounded-2xl p-0 backdrop:bg-black/40 max-w-[320px] w-[88%] m-auto"
      onClick={(e) => {
        // backdrop 클릭 시 cancel
        if (e.target === ref.current) onCancel();
      }}
    >
      <div className="bg-white rounded-2xl px-5 pt-5 pb-3 text-charcoal">
        <h2 id="confirm-title" className="text-base font-bold mb-2">
          {title}
        </h2>
        {description ? (
          <p
            id="confirm-desc"
            className="text-sm text-gray-500 leading-relaxed mb-4"
          >
            {description}
          </p>
        ) : null}
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl"
            autoFocus
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 font-semibold py-3 rounded-xl transition ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
