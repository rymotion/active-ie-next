"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";

export default function Project() {
  return (
    <>
      <div>
        <Screen>
          <div>
            <h1>Project</h1>
          </div>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
