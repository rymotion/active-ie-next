import type { ReactNode } from "react";

type ContainerSize = "prose" | "content" | "wide" | "bleed";

const sizeClass: Record<ContainerSize, string> = {
  prose: "max-w-prose",
  content: "max-w-7xl",
  wide: "max-w-[96rem]",
  bleed: "max-w-none px-0",
};

/**
 * Width control lives here, per section — never on <main> globally.
 * "bleed" spans the full viewport for media; text sections stay readable.
 */
export default function Container({
  size = "content",
  className = "",
  children,
}: {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`mx-auto w-full px-[var(--gutter)] ${sizeClass[size]} ${className}`}
    >
      {children}
    </div>
  );
}
