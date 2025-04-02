"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import CollaborationEvents from "@/components/events/collab_events";

export default function SpecialEvent() {
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full px-20">
          <div
            className="relative flex w-full w-flex h-full h-flex
      flex-col items-center overflow-hidden py-20 md:py-32"
          >
            <h1>Thank you for your support!</h1>
            <p>
              A part of your purchase has gone back towards investing in our
              programs and efforts throughout the Inland Empire. We invite you
              to join us at our official Active Inland Empire events or the
              events we will be helping support in the next few months.
            </p>
          </div>
          <SweatpalEvents />
          <CollaborationEvents />
        </div>
      </Screen>
    </>
  );
}
