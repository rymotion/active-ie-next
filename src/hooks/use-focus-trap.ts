"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab focus cycling inside `ref` while `active`, and restores focus
 * to the previously focused element on deactivation.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    const node = ref.current;
    if (!active || !node) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const elements = focusables();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", handleKeyDown);
    return () => {
      node.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [ref, active]);
}
