"use client";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import GofundmeWidget from "@/components/gofundme";
import { Analytics } from "@vercel/analytics/react";
import BMXJam from "../assets/events/8B731E4D-00A5-4211-B4E6-33A9902F0EC9.jpeg";
import SH from "../assets/events/street-hockey.png";
import Breathe from "../assets/events/breathe-ig.png";
import Image from "next/image";
import React from "react";
import ScrollableScreen from "@/components/screen/scrollable_screen";
import ReEmblaCarousel from "@/components/carousel/script/index";

export default function Home() {
  return (
    <>
      <Analytics />
      <ScrollableScreen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="contnr">
            <OrgContentBody />
          </div>

          <ReEmblaCarousel
            data={[
              <Image
                src={SH}
                alt="Sweatpals events"
                width="400"
                height="400"
                priority
              ></Image>,
              <Image
                src={Breathe}
                alt="Sweatpals events"
                width="400"
                height="400"
                priority
              ></Image>,
              <Image
                src={BMXJam}
                alt="BMX Bike Jam"
                width="400"
                height="400"
                priority
              ></Image>,
            ]}
          />

          <div className="contnr">
            <h1>Our Long-Term Goal</h1>
            <p className="max-w-xl text-center">
              Build a physical space and establish a third-place that is easily
              accessible, multi-use, and becomes an anchor destination for
              travelers near and far.
            </p>
          </div>
          <div>
            <DonationBody />
          </div>
        </div>
      </ScrollableScreen>
    </>
  );
}
