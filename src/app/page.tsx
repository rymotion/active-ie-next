"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import GofundmeWidget from "@/components/gofundme";
import { Analytics } from "@vercel/analytics/react";
import BMXJam from "../assets/events/8B731E4D-00A5-4211-B4E6-33A9902F0EC9.jpeg";
import Sweatpals from "../assets/events/1452E6AA-867D-4D63-95DB-15597572C6E5.jpeg";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center px-4 max-w-xl">
            <OrgContentBody />
          </div>
          <div className="flex flex-col items-center padding-10">
            <GofundmeWidget />
            <div className="flex flex-row items-center padding-10">
              <Image
                src={Sweatpals}
                alt="BMX Bike Jam"
                width="400"
                height="400"
                priority
              ></Image>
              <Image
                src={BMXJam}
                alt="BMX Bike Jam"
                width="400"
                height="400"
                priority
              ></Image>
            </div>
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
