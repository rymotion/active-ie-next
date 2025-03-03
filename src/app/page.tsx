"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import GofundmeWidget from "@/components/gofundme";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen min-w-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center px-4 max-w-xl">
            <OrgContentBody />
          </div>
          <div className="flex flex-col items-center px-4 max-w-xl">
            <GofundmeWidget />
          </div>
          <div className="flex flex-col items-center px-4 ptop-20">
            <h1>Our Long-Term Goal</h1>
            <p className="max-w-xl text-center">
              Build a physical space and establish a third-place that is easily
              accessible, multi-use, and becomes an anchor destination for
              travelers near and far.
            </p>
          </div>
          <div className="flex flex-col items-center px-4 max-w-xl">
            <DonationBody />
          </div>
        </div>
      </Screen>
    </>
  );
}
