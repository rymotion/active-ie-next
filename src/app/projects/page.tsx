"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import ProjectFundingWidget from "./bike_project_widget.jsx";
import { motion } from "framer-motion";
import BikeProjectWindow from "@/app/projects/bike_project_window.jsx";
import PublicCommentBoard from "@/app/projects/public_comment_board.jsx";
import GofundmeWidget from "@/components/gofundme.jsx";
const Project = () => {
  return (
    <>
      <Screen className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="text-center mb-6 sm:mb-8 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
              Projects
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              These are our current ongoing projects and efforts across the
              Inland Empire.
            </p>
          </div>
          <motion.section
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
              <div className="flex flex-col items-center justify-center mx-auto px-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
                  Public Comment Board
                </h2>
                <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                  By selecting the image below you will be taken to the file
                  hosted on Google Drive to provide feedback on the bike ramp
                  project. And have a voice in the planning of the project. You
                  must be signed in to a registered Google account to
                  participate.
                </p>
                <PublicCommentBoard />
              </div>
              <div className="lg:col-span-12 xl:col-span-12">
                <GofundmeWidget />
              </div>
            </div>
          </motion.section>
        </div>
        <Analytics />
      </Screen>
    </>
  );
};

export default Project;
