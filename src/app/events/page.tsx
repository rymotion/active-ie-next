"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";

import { Analytics } from "@vercel/analytics/react";

export default function Events() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <h1>Active Inland Empire Events Calendar</h1>
            <p className="max-w-xl text-center">
              These are the current list of events we are supporting, running,
              or appearing at. Find us, follow us on social media, and we may
              have some cool giveaways for you.
            </p>
            <p className="max-w-xl text-center">
              We will regularly update this calendar so subscribe and meet us at
              any of the events we are going to show up at.
            </p>
          </div>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <PublicCalendar />
          </div>
          <div>
            <h1>Active Inland Empire Transparency Commitment</h1>
            <p className="max-w-xl text-center">
              Active Inland Empire will always provide full funding and
              sponsorship transparency for all our events outside of our
              required reporting in accordance to regulations.
            </p>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
