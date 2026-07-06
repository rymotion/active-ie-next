"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import { InstaWidgetD2D } from "../contact/instagram_gallery";

export default function Addc() {
  return (
    <>
      <Analytics />
      <Screen>
        <h1>Anti-Detox Detox Club</h1>
        <section className="flex flex-col items-center justify-center h-full w-full">
          <p>Get more information about Anti-Detox Detox Club</p>
        </section>
        <section>
          <InstaWidgetD2D />
        </section>
      </Screen>
    </>
  );
}
