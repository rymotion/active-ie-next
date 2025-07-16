"use client";
import Screen from "@/components/screen/screen";
import { Analytics } from "@vercel/analytics/react";
import ProjectWidget from "./bike_project_widget.jsx";
import { motion } from "framer-motion";
const Project = () => {
  return (
    <>
      <div>
        <Screen>
          <div>
            <h1>Project</h1>
            <p>
              These are our current ongoing projects and efforts across the
              Inland Empire.
            </p>
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
                Bike Ramp Project
              </motion.p>
              <ProjectWidget />
            </motion.div>
          </div>
          <Analytics />
        </Screen>
      </div>
    </>
  );
};

export default Project;
