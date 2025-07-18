"use client";
import Screen from "@/components/screen/screen";
import { SubStack } from "./substack";
import { Analytics } from "@vercel/analytics/react";

export default function Blog() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <SubStack />
          </div>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
