"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";
import OrgContentBody from "@/components/about-body";
import { Analytics } from "@vercel/analytics/react";
import GofundmeWidget from "@/components/gofundme";

import LogoComponent, { logoStyle } from "@/components/logo";
import { motion } from "framer-motion";
import VolunteerInterestWidget from "./volunteer/volunteer_interest";
import { SubStackNibble } from "@/app/blog/substack";

import ScrollableVideoView from "@/components/multi-media/scrollable_video";
import BuyButton from "./products/products/buybutton";
import PublicCalendar from "./events/calender";

export default function Home() {
  return (
    <>
      <Analytics />
      <Screen>
        <ScrollableVideoView componentUrl="https://cdn.shopify.com/videos/c/o/v/ee108db5cf354e62bf3cca4363d5bdb8.mp4">
          <div style={{ height: "100px" }} />
          <LogoComponent styles={logoStyle.welcome} />
          <div style={{ height: "400px" }} />
          <OrgContentBody />
          <div style={{ height: "100px" }} />
        </ScrollableVideoView>
        <section className="flex flex-col min-h-screen justify-center items-center h-full w-full">
          {/* brand section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="flex flex-col h-[10vh] items-center justify-center text-2xl font-bold">
              Join Our Events
            </h1>
            <div className="flex flex-col w-full h-[calc(100vh-4rem)] min-h-[600px] py-8">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Our Event Calendar
              </h2>
              <div className="flex-1 w-full max-w-5xl mx-auto">
                <PublicCalendar />
              </div>
            </div>
          </motion.section>
          {/* <section>
            <InstaWidgetD2D />
          </section> */}

          <section>
            <h1 className="flex flex-col h-[10vh] items-center justify-center text-2xl font-bold">
              Shop Active Inland Empire
            </h1>
            <BuyButton
              componentId="product-component-1754935153925"
              productId="7900658729014"
            />
            <BuyButton
              componentId="product-component-1754937482467"
              productId="7813628297270"
            />
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
