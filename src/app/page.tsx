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

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <section className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <LogoComponent styles={logoStyle.welcome} />
          <OrgContentBody />
          <SweatpalEvents />
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <h1 className="flex flex-col items-center justify-center text-2xl font-bold">
              {" "}
              Our Brands{" "}
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
