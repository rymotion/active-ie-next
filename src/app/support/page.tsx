"use client";
import Screen from "@/components/screen/screen";
import DonationBody from "@/components/donation/donation";

import { Analytics } from "@vercel/analytics/react";
import { motion } from "framer-motion";

export default function Project() {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-col min-h-screen justify-center items-center h-full w-full">
            <div className="flex flex-col items-center justify-center px-20 max-w-xl">
              <h1>Support</h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center px-4 max-w-xl"
            >
              <DonationBody />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center px-4 max-w-xl"
          >
            <h1 className="text-2xl font-bold">Interested in Sponsorship?</h1>
            <p>
              In the health and wellness space and looking to grow your brand?
              Expand your brand's reach with us!
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl font-bold bg-black text-white hover:bg-red-500 transition-all duration-300 transform hover:scale-105"
              onClick={() =>
                (window.location.href = "mailto:sponsorships@active-ie.org")
              }
            >
              Get in touch
            </motion.button>
          </motion.div>

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
