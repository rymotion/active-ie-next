"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";
import ScheduleSurvey from "./suvey";

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
              We want to hear from you, the community, on how we can best serve
              you and have our in-person events. Fill out the survey below.
            </p>
            <ScheduleSurvey />
          </div>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <PublicCalendar />
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
