"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/layout/container";
import { useSections } from "./section-context";

type StorySectionProps = {
  id: string;
  /** Translated label shown by the section indicator. */
  label: string;
  /** Translated heading; omit for sections that render their own. */
  heading?: string;
  size?: "prose" | "content" | "wide" | "bleed";
  className?: string;
  children: ReactNode;
};

/**
 * One chapter of the landing scroll story: registers itself with the
 * section indicator and reveals its content as it enters the viewport.
 */
export default function StorySection({
  id,
  label,
  heading,
  size = "content",
  className = "",
  children,
}: StorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { register, unregister } = useSections();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (ref.current) register({ id, label, el: ref.current });
    return () => unregister(id);
  }, [id, label, register, unregister]);

  return (
    <section
      ref={ref}
      id={id}
      tabIndex={-1}
      className={`flex min-h-[70svh] scroll-mt-24 flex-col justify-center py-16 outline-none lg:min-h-[85svh] ${className}`}
    >
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {heading ? (
          <Container size="content">
            <h2 className="mb-10 text-center font-display text-display uppercase tracking-wide">
              {heading}
            </h2>
          </Container>
        ) : null}
        <Container size={size}>{children}</Container>
      </motion.div>
    </section>
  );
}
