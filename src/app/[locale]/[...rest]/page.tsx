import { notFound } from "next/navigation";

// Any path that no page above matched is a 404 rendered by the
// locale-aware not-found page.
export default function CatchAllPage() {
  notFound();
}
