"use client";

import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import styles from "./dialog.module.css";

export type DialogProps = {
  open: boolean;
  /** Fired for every close path: ESC, backdrop click, and the close button. */
  onClose: () => void;
  /** Required accessible name, rendered as the dialog heading. */
  title: string;
  description?: string;
  /** Close when the backdrop is clicked. Defaults to true. */
  closeOnBackdrop?: boolean;
  /** Accessible label for the close button (pass a translated string). */
  closeLabel?: string;
  size?: "sm" | "md" | "lg";
  /** Element to focus on open. Defaults to the close button. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
};

const sizeClass: Record<NonNullable<DialogProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};

/**
 * Accessible modal dialog built on the native <dialog> element.
 * showModal() gives us top-layer rendering, focus containment, focus
 * restoration to the trigger, and ESC handling for free; background
 * content is made inert by the browser.
 */
export default function Dialog({
  open,
  onClose,
  title,
  description,
  closeOnBackdrop = true,
  closeLabel = "Close",
  size = "md",
  initialFocusRef,
  children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      (initialFocusRef?.current ?? closeButtonRef.current)?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initialFocusRef]);

  // The top layer doesn't lock page scroll by itself.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${sizeClass[size]} w-[calc(100vw-2rem)] bg-black text-white rounded-lg border border-cream/20 p-0`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Keep React state the source of truth for open/closed.
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        // Clicks on the <dialog> element itself are backdrop clicks;
        // clicks inside land on the content wrapper below.
        if (closeOnBackdrop && event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[85vh] flex-col p-4 md:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold md:text-2xl">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="shrink-0 rounded p-2 text-2xl leading-none text-gray-400 transition-colors hover:bg-maroon hover:text-white"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {description ? (
          <p id={descriptionId} className="mb-4 text-gray-300">
            {description}
          </p>
        ) : null}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}
