"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import ProjectFundingWidget from "./bike_project_widget.jsx";
import { motion } from "framer-motion";
import BikeProjectWindow from "@/app/projects/bike_project_window.jsx";
const Project = () => {
  return (
    <>
      <div>
        <Screen>
          <div className="flex flex-col min-h-screen min-w-screen justify-center items-center h-full w-full px-20 max-w-xl">
            <h1>Project</h1>
            <p>
              These are our current ongoing projects and efforts across the
              Inland Empire.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-gray-200 max-w-xl flex flex-col items-center justify-center gap-4 w-full"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-lg text-gray-200 max-w-xl"
              >
                Bike Ramp Project Update
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center justify-center gap-4 w-full"
              >
                <BikeProjectWindow />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-col items-center justify-center gap-4 w-full"
              >
                <p>Support the Bike Ramp Project</p>
                <ProjectFundingWidget />
              </motion.div>
            </motion.div>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
};

export default Project;
