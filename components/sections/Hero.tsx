"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/images/companies/globalworld.webp",
    title: "Transforming Ideas into",
    highlight: "Digital Reality",
    subtitle: "End-to-end software solutions for modern businesses",
  },
  {
    image: "/images/companies/software.webp",
    title: "Your Partner in",
    highlight: "Innovation",
    subtitle: "Building tomorrow's technology today",
  },
  {
    image: "/images/companies/pos2.webp",
    title: "Powering Growth Through",
    highlight: "Technology Excellence",
    subtitle: "Custom solutions that drive real business results",
  },
  {
    image: "/images/companies/advisory.webp",
    title: "Expert Advisory",
    highlight: "Services",
    subtitle: "Guiding your business towards success",
  },
  {
    image: "/images/companies/sleek.webp",
    title: "Sleek & Modern",
    highlight: "Designs",
    subtitle: "Crafting beautiful user experiences",
  },
  {
    image: "/images/companies/tech.jpg",
    title: "Advanced",
    highlight: "Technology",
    subtitle: "Leveraging the latest tech stack",
  },
];

const AUTO_SLIDE_INTERVAL = 8000;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setProgress(0);
    }, AUTO_SLIDE_INTERVAL);

    const progressTimer = setInterval(() => {
      setProgress((prev) =>
        Math.min(prev + 100 / (AUTO_SLIDE_INTERVAL / 100), 100),
      );
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [currentSlide]);

  return (
    <section
      id="home"
      className="relative h-screen min-h-screen w-full overflow-hidden bg-black"
    >
      {/* Cinematic Background Images with Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${slides[currentSlide].image}')`,
          }}
        >
          {/* Layers of Overlays for Depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 select-none">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Brand Introduction */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.05em" }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block"
              >
                <h1 className="text-sm sm:text-base md:text-lg font-medium text-white/70 tracking-[0.2em] mb-4 uppercase">
                  Global Cooperation
                </h1>
                <div className="w-12 h-[2px] bg-white/30 mx-auto" />
              </motion.div>

              {/* Dynamic Headlines */}
              <div className="space-y-2">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-thin text-white leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent leading-tight pb-2"
                  style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}
                >
                  {slides[currentSlide].highlight}
                </motion.h2>
              </div>

              {/* Subtitle with revealing animation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-lg sm:text-xl md:text-2xl text-white/60 font-light tracking-wide max-w-3xl mx-auto"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* Interactive CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="pt-10"
              >
                <a
                  href="#services"
                  className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden border border-white/20 rounded-full transition-all duration-500 hover:border-gold/60"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#services")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
                  <span className="relative text-sm font-semibold tracking-widest uppercase text-white transition-colors duration-500 group-hover:text-black">
                    Explore Solutions
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress & Slide Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-12 z-20">
        <div className="flex gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
              className="relative py-4"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="h-[2px] w-12 bg-white/20 overflow-hidden rounded-full">
                {currentSlide === index && (
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
