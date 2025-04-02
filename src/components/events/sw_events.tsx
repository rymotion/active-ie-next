"use client";
import { Analytics } from "@vercel/analytics/react";
import StreetHockeyPoster from "@/assets/events/street-hockey.png";
import BreathePoster from "@/assets/events/breathe-ig.png";
import SweatPalsLogo from "@/assets/vendors/sweatpals-logo.svg";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SweatpalEvents() {
  return (
    <>
      <div className="flex flex-col items-center px-20">
        <h1>Our Programs</h1>
        <div className="bg-black">
          <Image
            src={SweatPalsLogo}
            alt="SweatPals"
            width="800"
            height="400"
            priority
          ></Image>
        </div>
        <p>
          Click on the marquee to go directly to the event page and get more
          information
        </p>
        {/* standard vertical widget */}
        <div className="sm:hidden">
          <Link href="https://www.sweatpals.com/event/active-nights-breath/">
            <Image
              src={BreathePoster}
              alt="Active Nights"
              width="400"
              height="400"
              priority
            ></Image>
          </Link>
          <Link href="https://www.sweatpals.com/event/active-nights-street-hockey/">
            <Image
              src={StreetHockeyPoster}
              alt="Active Nights"
              width="400"
              height="400"
              priority
            ></Image>
          </Link>
        </div>
        {/* standard widescreen  marquee widget */}
        <div className={"flex flex-row items-center padding-10 hidden sm:flex"}>
          {/* TODO: Add programs and efforts components */}

          <Link href="https://www.sweatpals.com/event/active-nights-breath/">
            <Image
              src={BreathePoster}
              alt="Active Nights"
              width="400"
              height="400"
              priority
            ></Image>
          </Link>
          <Link href="https://www.sweatpals.com/event/active-nights-street-hockey/">
            {" "}
            <Image
              src={StreetHockeyPoster}
              alt="Active Nights"
              width="400"
              height="400"
              priority
            ></Image>
          </Link>
        </div>
      </div>
      <Analytics />
    </>
  );
}

{
  /*<Image
    src={BMXJam}
    alt="BMX Bike Jam"
    width="400"
    height="400"
    priority
    ></Image> */
}
