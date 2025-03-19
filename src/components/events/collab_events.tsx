"use client";
import { Analytics } from "@vercel/analytics/react";
import Image from "next/image";
import React from "react";
import BMXJam from "@/assets/events/8B731E4D-00A5-4211-B4E6-33A9902F0EC9.jpeg";

export default function CollaborationEvents() {
  return (
    <>
      <div className="flex flex-col items-center padding-10">
        <h1>Events we are Collaborating with</h1>

        {/* standard vertical widget */}
        <div className="sm:hidden">
          <Image
            src={BMXJam}
            alt="BMX Bike Jam"
            width="400"
            height="400"
            priority
          ></Image>
        </div>
        {/* standard widescreen  marquee widget */}
        <div className={"flex flex-row items-center padding-10 hidden sm:flex"}>
          {/* TODO: Add programs and efforts components */}

          <Image
            src={BMXJam}
            alt="BMX Bike Jam"
            width="400"
            height="400"
            priority
          ></Image>
        </div>
      </div>
      <Analytics />
    </>
  );
}
