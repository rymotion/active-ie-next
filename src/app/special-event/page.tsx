"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import CollaborationEvents from "@/components/events/collab_events";
import AxelBikeRamp from "@/assets/event-photos/Eagle-scout-poster.png";
import Image from "next/image";
import Link from "next/link";
import PublicCalendar from "../events/calender";
import NewsletterWidget from "../contact/newsletter_subscribe";

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

            {/* standard vertical widget */}
            <div className="sm:hidden">
              <Link href="https://gofund.me/af39d7ad">
                <Image
                  src={AxelBikeRamp}
                  alt="SweatPals"
                  width="800"
                  height="400"
                  priority
                ></Image>
              </Link>
            </div>
            {/* standard widescreen  marquee widget */}
            <div
              className={"flex flex-row items-center padding-10 hidden sm:flex"}
            >
              {/* TODO: Add programs and efforts components */}

              <Link href="https://gofund.me/af39d7ad">
                <Image
                  src={AxelBikeRamp}
                  alt="SweatPals"
                  width="800"
                  height="400"
                  priority
                ></Image>
              </Link>
            </div>
          </div>
          <SweatpalEvents />
          <CollaborationEvents />
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <div>
              <p>Our Event Calendar</p>
            </div>
            <PublicCalendar />
          </div>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center  w-full">
            <div>
              <p>Stay in Touch</p>
            </div>
            <NewsletterWidget />
          </div>
        </div>
      </Screen>
    </>
  );
}
