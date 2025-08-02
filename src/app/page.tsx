"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import GofundmeWidget from "@/components/gofundme";
import Image from "next/image";
import LogoComponent, { logoStyle } from "@/components/logo";
import { motion } from "framer-motion";
import VolunteerInterestWidget from "./volunteer/volunteer_interest";
import { SubStackNibble } from "@/app/blog/substack";
import { InstaWidgetD2D } from "@/app/contact/instagram_gallery";
import ScrollableVideoView from "@/components/multi-media/scrollable_video";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <ScrollableVideoView componentUrl="https://cdn.shopify.com/videos/c/o/v/ee108db5cf354e62bf3cca4363d5bdb8.mp4">
          <div style={{ height: "100px" }} />
          <LogoComponent styles={logoStyle.welcome} />
          <div style={{ height: "100px" }} />
          <OrgContentBody />
          <div style={{ height: "100px" }} />
        </ScrollableVideoView>
        <section className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          {/* brand section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <h1 className="flex flex-col items-center justify-center text-2xl font-bold">
              Our Brands
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-gray-200 max-w-xl flex-row justify-center items-center"
            >
              <Image
                src={
                  "https://cdn.shopify.com/s/files/1/0638/5536/2102/files/be-wave-sticker-band-aid-brand.png?v=1754035334"
                }
                alt={"Anti-Detox Detox Club"}
                width={400}
                height={400}
              ></Image>
            </motion.div>
          </motion.section>
          <section>
            <InstaWidgetD2D />
          </section>
          <section>
            <SubStackNibble />
          </section>
          <section className="flex sm:flex-col md:flex-col lg:flex-row min-h-screen min-w-screen justify-center items-center h-full w-full px-20">
            <p className="text-2xl font-bold">
              Want to work our events or be a part of our organization? Fill out
              the form below to express your interest.
            </p>
            <VolunteerInterestWidget />
          </section>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <GofundmeWidget />
            <DonationBody />
          </motion.section>
        </section>
      </Screen>
    </>
  );
}
