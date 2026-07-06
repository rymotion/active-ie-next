"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SectionEntry = {
  id: string;
  label: string;
  el: HTMLElement;
};

type SectionContextValue = {
  register: (entry: SectionEntry) => void;
  unregister: (id: string) => void;
  sections: SectionEntry[];
  activeId: string | null;
};

const SectionContext = createContext<SectionContextValue | null>(null);

export function useSections() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error("useSections must be used within SectionProvider");
  return ctx;
}

/** Optional variant for components that may render outside the provider. */
export function useSectionsOptional() {
  return useContext(SectionContext);
}

export function SectionProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<SectionEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Created lazily: child section effects run BEFORE this provider's own
  // effect would, so the observer must exist by first register() call.
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      // A section is "active" while it crosses the viewport's vertical midline.
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          }
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );
    }
    return observerRef.current;
  }, []);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const register = useCallback((entry: SectionEntry) => {
    setSections((prev) => {
      const next = [...prev.filter((s) => s.id !== entry.id), entry];
      // Keep indicator dots in document order regardless of mount order.
      next.sort((a, b) =>
        a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
      );
      return next;
    });
    getObserver().observe(entry.el);
  }, [getObserver]);

  const unregister = useCallback((id: string) => {
    setSections((prev) => {
      const entry = prev.find((s) => s.id === id);
      if (entry) observerRef.current?.unobserve(entry.el);
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const value = useMemo(
    () => ({ register, unregister, sections, activeId }),
    [register, unregister, sections, activeId]
  );

  return (
    <SectionContext.Provider value={value}>{children}</SectionContext.Provider>
  );
}
