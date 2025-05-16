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

          <Analytics />
        </Screen>
      </div>
    </>
  );
}
