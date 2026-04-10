"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode, HTMLAttributes, forwardRef } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "h1" | "h2" | "button" | "span";
}

const getVariants = (direction: Direction, distance: number): Variants => {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign =
    direction === "down" || direction === "right" ? -distance : distance;

  return {
    hidden: {
      opacity: 0,
      ...(direction !== "none" && { [axis]: sign }),
    },
    visible: {
      opacity: 1,
      ...(direction !== "none" && { [axis]: 0 }),
    },
  };
};

const ScrollReveal = forwardRef<HTMLElement, ScrollRevealProps>(
  (
    {
      children,
      direction = "up",
      delay = 0,
      duration = 0.6,
      distance = 24,
      once = true,
      className = "",
      as = "div",
      ...props
    },
    ref
  ) => {
    const Component = motion.create(as as any);

    return (
      <Component
        ref={ref}
        {...props}
        variants={getVariants(direction, distance)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier — smooth decel
      }}
      className={className}
    >
      {children}
    </Component>
  );
});

export default ScrollReveal;
