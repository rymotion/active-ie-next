"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

/**
 * Direction-aware header visibility: hidden after scrolling down past
 * `threshold`, shown again on any upward scroll or near the top.
 * Also reports whether the page is scrolled at all (for the solid
 * background transition).
 */
export function useScrollDirection(threshold = 80) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > threshold);
    if (latest < threshold) {
      setHidden(false);
    } else if (latest > previous) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return { hidden, scrolled };
}
