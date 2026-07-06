"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
  /** Translated labels for the two states. */
  openLabel: string;
  closeLabel: string;
  controlsId: string;
};

const lineClass = "absolute left-0 h-[2px] w-6 rounded-full bg-current";
const transition = { duration: 0.3, ease: "easeInOut" as const };

/** Three animated bars that morph into an X — no icon swapping. */
const HamburgerButton = forwardRef<HTMLButtonElement, HamburgerButtonProps>(
  function HamburgerButton({ open, onToggle, openLabel, closeLabel, controlsId }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={controlsId}
        aria-label={open ? closeLabel : openLabel}
        className="relative z-50 flex h-11 w-11 items-center justify-center text-white"
      >
        <span className="relative block h-4 w-6" aria-hidden="true">
          <motion.span
            className={lineClass}
            style={{ top: 0 }}
            animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={transition}
          />
          <motion.span
            className={lineClass}
            style={{ top: 7 }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className={lineClass}
            style={{ top: 14 }}
            animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={transition}
          />
        </span>
      </button>
    );
  }
);

export default HamburgerButton;
