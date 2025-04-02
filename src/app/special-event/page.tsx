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
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center px-4 max-w-xl">
            <h1>Thank You for your Support</h1>
            <main>
              <p>Your purchase has helped make a healthier Inland Empire.</p>
            </main>
            <div>
              <SweatpalEvents />
              <CollaborationEvents />
            </div>
          </div>
        </div>
      </Screen>
    </>
  );
}
