"use client";

import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 20,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + Math.round(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [spring, prefix, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-label={`${prefix}${target.toLocaleString()}${suffix}`}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
