"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANIES } from "@/lib/constants";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Companies() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  // Get height for each card based on hover state
  const getCardHeight = (index: number) => {
    // Default heights
    // Left column: Card 0 = Large (440px), Card 1 = Small (220px)
    // Right column: Card 2 = Small (220px), Card 3 = Large (440px)
    const defaultHeights = [440, 220, 220, 440];

    if (hoveredIndex === null) {
      return `${defaultHeights[index]}px`;
    }

    // Left column pair (0 and 1)
    if (index === 0 || index === 1) {
      if (hoveredIndex === 1) {
        // Card 1 hovered: Card 0 becomes small, Card 1 becomes large
        return index === 0 ? "220px" : "440px";
      } else if (hoveredIndex === 0) {
        // Card 0 hovered: stays as default
        return `${defaultHeights[index]}px`;
      }
    }

    // Right column pair (2 and 3)
    if (index === 2 || index === 3) {
      if (hoveredIndex === 2) {
        // Card 2 hovered: Card 2 becomes large, Card 3 becomes small
        return index === 2 ? "440px" : "220px";
      } else if (hoveredIndex === 3) {
        // Card 3 hovered: stays as default
        return `${defaultHeights[index]}px`;
      }
    }

    return `${defaultHeights[index]}px`;
  };

  return (
    <section
      id="companies"
      className="relative py-24 bg-whisper overflow-visible"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-slate-600 text-sm font-medium tracking-widest uppercase mb-2 block">
            Our Ecosystem
          </span>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet the Subsidiaries
          </h3>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Innovative companies driving excellence across diverse sectors
          </p>
        </motion.div>

        {/* Two Column Layout - Fixed columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Card 0 - Large on top */}
            {COMPANIES.slice(0, 1).map((company, idx) => (
              <motion.div
                key={company.slug}
                variants={cardVariants}
                animate={{ height: getCardHeight(0) }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  },
                }}
                onMouseEnter={() => setHoveredIndex(0)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                <Link
                  href={`/companies/${company.slug}`}
                  className="block h-full rounded-3xl overflow-hidden relative"
                >
                  <article className="relative h-full">
                    {/* Background Image Layer */}
                    <div className="absolute inset-0">
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/50 brightness-50 transition-all duration-500 group-hover:brightness-75" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                    </div>

                    {/* Dynamic SVG Shapes */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-white/20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:skew-x-12" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white/20 rotate-45 -translate-x-1/3 translate-y-1/3 transition-all duration-500 ease-out group-hover:scale-y-[2] group-hover:scale-x-[1.5]" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white select-none z-10">
                      <div className="flex items-start justify-between">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase border border-white/40 rounded-full backdrop-blur-md bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/60">
                          {company.focus[0]}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-500 group-hover:translate-y-[-4px] group-hover:text-white drop-shadow-lg">
                          {company.name}
                        </h4>

                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                          <p className="text-white/90 text-sm md:text-base leading-relaxed backdrop-blur-sm">
                            {company.short}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 delay-75 group-hover:opacity-100">
                          {company.focus.slice(1, 3).map((focus) => (
                            <span
                              key={focus}
                              className="text-xs bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:translate-x-2 group-hover:scale-105">
                        <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}

            {/* Card 1 - Small on bottom */}
            {COMPANIES.slice(1, 2).map((company, idx) => (
              <motion.div
                key={company.slug}
                variants={cardVariants}
                animate={{ height: getCardHeight(1) }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  },
                }}
                onMouseEnter={() => setHoveredIndex(1)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                <Link
                  href={`/companies/${company.slug}`}
                  className="block h-full rounded-3xl overflow-hidden relative"
                >
                  <article className="relative h-full">
                    <div className="absolute inset-0">
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/50 brightness-50 transition-all duration-500 group-hover:brightness-75" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-white/20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:skew-x-12" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white/20 rotate-45 -translate-x-1/3 translate-y-1/3 transition-all duration-500 ease-out group-hover:scale-y-[2] group-hover:scale-x-[1.5]" />
                    </div>

                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white select-none z-10">
                      <div className="flex items-start justify-between">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase border border-white/40 rounded-full backdrop-blur-md bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/60">
                          {company.focus[0]}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-500 group-hover:translate-y-[-4px] group-hover:text-white drop-shadow-lg">
                          {company.name}
                        </h4>

                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                          <p className="text-white/90 text-sm md:text-base leading-relaxed backdrop-blur-sm">
                            {company.short}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 delay-75 group-hover:opacity-100">
                          {company.focus.slice(1, 3).map((focus) => (
                            <span
                              key={focus}
                              className="text-xs bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:translate-x-2 group-hover:scale-105">
                        <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Card 2 - Small on top */}
            {COMPANIES.slice(2, 3).map((company, idx) => (
              <motion.div
                key={company.slug}
                variants={cardVariants}
                animate={{ height: getCardHeight(2) }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  },
                }}
                onMouseEnter={() => setHoveredIndex(2)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                <Link
                  href={`/companies/${company.slug}`}
                  className="block h-full rounded-3xl overflow-hidden relative"
                >
                  <article className="relative h-full">
                    <div className="absolute inset-0">
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/50 brightness-50 transition-all duration-500 group-hover:brightness-75" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-white/20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:skew-x-12" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white/20 rotate-45 -translate-x-1/3 translate-y-1/3 transition-all duration-500 ease-out group-hover:scale-y-[2] group-hover:scale-x-[1.5]" />
                    </div>

                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white select-none z-10">
                      <div className="flex items-start justify-between">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase border border-white/40 rounded-full backdrop-blur-md bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/60">
                          {company.focus[0]}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-500 group-hover:translate-y-[-4px] group-hover:text-white drop-shadow-lg">
                          {company.name}
                        </h4>

                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                          <p className="text-white/90 text-sm md:text-base leading-relaxed backdrop-blur-sm">
                            {company.short}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 delay-75 group-hover:opacity-100">
                          {company.focus.slice(1, 3).map((focus) => (
                            <span
                              key={focus}
                              className="text-xs bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:translate-x-2 group-hover:scale-105">
                        <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}

            {/* Card 3 - Large on bottom */}
            {COMPANIES.slice(3, 4).map((company, idx) => (
              <motion.div
                key={company.slug}
                variants={cardVariants}
                animate={{ height: getCardHeight(3) }}
                transition={{
                  height: {
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  },
                }}
                onMouseEnter={() => setHoveredIndex(3)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                <Link
                  href={`/companies/${company.slug}`}
                  className="block h-full rounded-3xl overflow-hidden relative"
                >
                  <article className="relative h-full">
                    <div className="absolute inset-0">
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/50 brightness-50 transition-all duration-500 group-hover:brightness-75" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" />
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-2 border-white/20 -translate-y-1/2 translate-x-1/2 transition-all duration-500 ease-out group-hover:scale-[1.8] group-hover:skew-x-12" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-white/20 rotate-45 -translate-x-1/3 translate-y-1/3 transition-all duration-500 ease-out group-hover:scale-y-[2] group-hover:scale-x-[1.5]" />
                    </div>

                    <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white select-none z-10">
                      <div className="flex items-start justify-between">
                        <span className="inline-block px-4 py-1.5 text-xs font-medium tracking-wider uppercase border border-white/40 rounded-full backdrop-blur-md bg-white/10 transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/60">
                          {company.focus[0]}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-all duration-500 group-hover:translate-y-[-4px] group-hover:text-white drop-shadow-lg">
                          {company.name}
                        </h4>

                        <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                          <p className="text-white/90 text-sm md:text-base leading-relaxed backdrop-blur-sm">
                            {company.short}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 opacity-0 transition-all duration-500 delay-75 group-hover:opacity-100">
                          {company.focus.slice(1, 3).map((focus) => (
                            <span
                              key={focus}
                              className="text-xs bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30"
                            >
                              {focus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:translate-x-2 group-hover:scale-105">
                        <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-12" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
