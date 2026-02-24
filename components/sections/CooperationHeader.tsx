"use client";

import { motion } from "framer-motion";

export default function CooperationHeader() {
  return (
    <div className="relative w-full flex justify-center mt-24 md:mt-28 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-gradient-to-r from-maroon via-maroon-light to-maroon backdrop-blur-sm border border-yellow/20 rounded-xl py-6 px-8 flex items-center justify-center shadow-2xl pointer-events-auto">
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-heading font-bold">
            <span className="block text-yellow drop-shadow-lg">
              Global Cooperation
            </span>
            <span className="block text-white text-base sm:text-lg font-semibold mt-1">
              Private Limited
            </span>
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
