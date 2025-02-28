"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import GofundmeWidget from "@/components/gofundme";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-row min-h-screen min-w-screen justify-center items-center h-full w-full">
            <OrgContentBody />
          </div>
          <div>
            <div className="flex flex-col items-center px-4">
              <h1>Pardon Our Dust</h1>
              <p className="max-w-xl text-center">
                We are continually improving Active Inland Empire to better
                serve the people in the Inland Empire this includes the ongoing
                effort to rebuild our website.
              </p>
            </div>
          </div>
          <div>
            <DonationBody />
          </div>
          <div>
            <GofundmeWidget />
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
}
