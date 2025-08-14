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
      <Screen className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <ScrollableVideoView componentUrl="https://cdn.shopify.com/videos/c/o/v/ee108db5cf354e62bf3cca4363d5bdb8.mp4">
            <div style={{ height: "100px" }} />
            <LogoComponent styles={logoStyle.welcome} />
            <div style={{ height: "400px" }} />
            <OrgContentBody />
            <div style={{ height: "100px" }} />
          </ScrollableVideoView>

          <div className="w-full">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full py-12"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                  <h2 className="text-xl font-semibold mb-6 text-center">
                    Our Event Calendar
                  </h2>
                  <div className="w-full">
                    <PublicCalendar />
                  </div>
                </div>
              </div>
            </motion.section>

            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-center mb-8">
                  Shop Active Inland Empire
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <BuyButton
                    componentId="product-component-1754935153925"
                    productId="7900658729014"
                  />
                  <BuyButton
                    componentId="product-component-1754937482467"
                    productId="7813628297270"
                  />
                </div>
              </div>
            </section>

            <section className="py-12 bg-black">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-center mb-8">Donate</h1>
                <div className="flex justify-center">
                  <GofundmeWidget />
                  <DonationBody />
                </div>
              </div>
            </section>

            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-center mb-8">
                  Volunteer
                </h1>
                <div className="flex justify-center">
                  <VolunteerInterestWidget />
                </div>
              </div>
            </section>

            <section className="py-12 bg-black">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-center mb-8">
                  Read Our Blog
                </h1>
                <div className="flex justify-center">
                  <SubStackNibble />
                </div>
              </div>
            </section>
          </div>
        </div>
      </Screen>
    </>
  );
}
