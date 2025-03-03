"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";

import { Analytics } from "@vercel/analytics/react";

export default function Events() {
  return (
    <>
      <div>
        <Screen>
          <div></div>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <PublicCalendar />
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
