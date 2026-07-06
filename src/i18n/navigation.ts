import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware drop-in replacements for next/link and next/navigation.
// All internal links must use this Link so the active locale is preserved.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
