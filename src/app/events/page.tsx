"use client";
import Screen from "@/components/screen/screen";
import PublicCalendar from "./calender";
import ScheduleSurvey from "./suvey";
import { Analytics } from "@vercel/analytics/react";
import ACTVDialog from "@/components/dialog/dialog";

import React, { useState } from "react";

export default function Events() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Screen>
          <Analytics />
          <div className="flex justify-center p-20 min-h-screen h-full">
            <p>
              We want to hear from you, the community, on how we can best serve
              you and have our in-person events. By Filling out the survey
              below, we can learn how to better serve you to support you on your
              health journey.
            </p>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setOpen(true)}>
              Take the Program Schedule Survey
            </button>
          </div>

          {/* Modal Dialog */}
          <ACTVDialog open={open} setOpen={setOpen}>
            <div className=" inset-0 z-50 items-center justify-center bg-black/40 p-20">
              <div className="w-full flex items-center justify-center">
                <div className="relative bg-black rounded-lg shadow-lg w-[95vw] max-w-4xl max-h-[95vh] p-4 md:p-8 overflow-auto flex flex-col">
                  <button
                    className="absolute top-20 right-20text-2xl font-bold text-gray-400 hover:text-gray-700"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <h2 className="text-lg md:text-2xl font-semibold mb-4 text-center">
                    Program Schedule Survey
                  </h2>
                  <ScheduleSurvey />
                </div>
              </div>
            </div>
          </ACTVDialog>

          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full px-20">
            <PublicCalendar />
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
