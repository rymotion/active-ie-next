"use client";
import Screen from "@/components/screen/screen";

import { Analytics } from "@vercel/analytics/react";

export default function Programs() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <h1>Active Inland Empire Programs</h1>
            <p className="max-w-xl text-center">
              These are programs that we design and implement across the Inland
              Empire to bring people unique experiences.
            </p>
            <p className="max-w-xl text-center">
              We will regularly update this calendar so subscribe and meet us at
              any of the events we are going to show up at.
            </p>
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
