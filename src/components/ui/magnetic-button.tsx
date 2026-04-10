"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string; // HSL values, e.g. "0 90% 60%" for red
}

export default function MagneticButton({
  children,
  onClick,
  className = "",
  glowColor = "0 90% 60%", // Active IE red
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  // Subtle glow follows cursor position
  const glowX = useTransform(springX, [-20, 20], ["35%", "65%"]);
  const glowY = useTransform(springY, [-10, 10], ["35%", "65%"]);

  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull — max 8px displacement
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={`
        relative overflow-hidden
        px-8 py-4 rounded-xl
        font-semibold text-white text-lg
        bg-gradient-to-br from-red-600 to-red-800
        transition-shadow duration-300
        hover:shadow-[0_0_30px_hsl(${glowColor}/0.4)]
        active:shadow-[0_0_15px_hsl(${glowColor}/0.3)]
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-red-400
        cursor-pointer
        ${className}
      `}
    >
      {/* Radial glow that follows cursor */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, hsl(${glowColor} / 0.25), transparent 60%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
