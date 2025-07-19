"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import ProjectFundingWidget from "./bike_project_widget.jsx";
import { motion } from "framer-motion";
import BikeProjectWindow from "@/app/projects/bike_project_window.jsx";
const Project = () => {
  return (
    <>
      <div className="min-h-screen w-full">
        <Screen>
          <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full items-center justify-start md:justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 w-full">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
                Projects
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                These are our current ongoing projects and efforts across the
                Inland Empire.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-6xl mx-auto px-2 sm:px-0"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                Bike Ramp Project Update
              </h2>
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 xl:col-span-8">
                  <BikeProjectWindow />
                </div>
                <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    <ProjectFundingWidget />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
};

export default Project;
