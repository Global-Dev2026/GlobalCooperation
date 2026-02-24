"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      >
        {/* Logo/Company Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Company Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
            Global Cooperation
          </h1>

          {/* Loading Spinner */}
          <div className="relative w-12 h-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 border-3 border-slate-200 border-t-slate-900 rounded-full"
              style={{ borderWidth: "3px" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
