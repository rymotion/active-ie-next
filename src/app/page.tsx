"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import CollaborationEvents from "@/components/events/collab_events";
import GofundmeWidget from "@/components/gofundme";
import AltGFMPoster from "@/components/donation/special-donation/gfm-bike-ramp";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center px-4 max-w-xl">
            <OrgContentBody />
          </div>
          <SweatpalEvents />
          <CollaborationEvents />
          <div className="flex flex-col items-center px-4 ptop-20">
            <h1>Our Long-Term Goal</h1>
            <p className="max-w-xl text-center">
              Build a physical space and establish a third-place that is easily
              accessible, multi-use, and becomes an anchor destination for
              travelers near and far.
            </p>
          </div>
          <div className="flex flex-col items-center px-4 max-w-xl">
            <AltGFMPoster />
            <GofundmeWidget />
            <DonationBody />
          </div>
        </div>
      </Screen>
    </>
  );
}
