"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import { Analytics } from "@vercel/analytics/react";
import SweatpalEvents from "@/components/events/sw_events";
import GofundmeWidget from "@/components/gofundme";
import AltGFMPoster from "@/components/donation/special-donation/gfm-bike-ramp";
import LogoComponent, { logoStyle } from "@/components/logo";
import CustomHeadlineWidget, {
  textBoxStyle,
} from "@/components/animated/container/text/custom-headline-text";
import { motion } from "framer-motion";
import VolunteerInterestWidget from "./volunteer/volunteer_interest";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          <div className="flex flex-col items-center justify-center px-20 ">
            <LogoComponent styles={logoStyle.welcome} />
          </div>
          <OrgContentBody />
          <SweatpalEvents />
          <div className="flex flex-col flex-row items-center justify-center px-4">
            <CustomHeadlineWidget
              headline="Our Long-Term Goal"
              headlineStyle={textBoxStyle.standard}
              bodyStyle={textBoxStyle.content}
              body={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-6 text-lg text-gray-200 max-w-xl"
                >
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-6 text-lg text-gray-200 max-w-xl"
                  >
                    Build a physical space and establish a third-place that is
                    easily accessible, multi-use, and becomes an anchor
                    destination for travelers near and far.
                  </motion.p>
                  <AltGFMPoster />
                </motion.div>
              }
            />
          </div>
          <div className="flex sm:flex-col md:flex-col lg:flex-row min-h-screen min-w-screen justify-center items-center h-full w-full px-20">
            <p className="text-2xl font-bold">
              Want to work our events or be a part of our organization? Fill out
              the form below to express your interest.
            </p>
            <VolunteerInterestWidget />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <GofundmeWidget />
            <DonationBody />
          </motion.div>
        </div>
      </Screen>
    </>
  );
}
