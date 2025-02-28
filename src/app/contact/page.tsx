"use client";
import Screen from "@/components/screen/screen";
import InstaWidget from "./instagram_gallery";
import { Analytics } from "@vercel/analytics/react";

export default function Contact() {
  return (
    <>
      <div>
        <Screen>
          <div>
            <InstaWidget />
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
