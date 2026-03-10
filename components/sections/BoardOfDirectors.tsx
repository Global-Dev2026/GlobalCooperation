"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { BOARD_OF_DIRECTORS } from "@/lib/constants";
import { Linkedin } from "lucide-react";

export default function BoardOfDirectors() {
  const [expandedIds, setExpandedIds] = useState<Set<string | number>>(new Set());

  const toggleExpanded = (id: string | number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="board" className="relative py-24 bg-white">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-slate-600 text-sm font-medium tracking-widest uppercase mb-2 block">
            Leadership Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Board of Directors
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Meet the experienced leaders guiding our vision and driving
            innovation across our portfolio of companies.
          </p>
        </motion.div>

        {/* Board Members Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {BOARD_OF_DIRECTORS.map((member) => (
            <motion.article
              key={member.id}
              variants={cardVariants}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
            >
              {/* ── MOBILE: horizontal card (shown below md) ── */}
              <div className="flex md:hidden items-center gap-4 p-4">
                {/* Small circular photo */}
                <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-slate-100 ring-2 ring-slate-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                  />
                </div>

                {/* Text info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                        {member.position}
                      </p>
                      {member.education && (
                        <p className="text-[10px] text-slate-400 italic mt-0.5">
                          {member.education}
                        </p>
                      )}
                    </div>
                    {/* LinkedIn icon */}
                    {member.linkedin && !['', '#'].includes(member.linkedin) && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${member.name}'s LinkedIn profile`}
                        className="flex-shrink-0 w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-slate-700" />
                      </a>
                    )}
                  </div>
                  <p className={`text-[11px] text-slate-500 leading-relaxed mt-1 ${expandedIds.has(member.id) ? '' : 'line-clamp-2'}`}>
                    {member.bio}
                  </p>
                  <button
                    onClick={() => toggleExpanded(member.id)}
                    className="text-[11px] font-semibold text-slate-700 mt-1 hover:text-slate-900 transition-colors"
                  >
                    {expandedIds.has(member.id) ? 'See less ▲' : 'See more ▼'}
                  </button>
                </div>
              </div>

              {/* ── TABLET / DESKTOP (md+): vertical portrait card ── */}
              <div className="hidden md:block">
                {/* Member Photo */}
                <div className="relative aspect-[4/5] md:aspect-[4/5] lg:aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* LinkedIn Icon */}
                  {member.linkedin && !['', '#'].includes(member.linkedin) && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${member.name}'s LinkedIn profile`}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:scale-110"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-slate-900" />
                    </a>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-3 md:p-4">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 mb-0.5 group-hover:text-slate-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                    {member.position}
                  </p>
                  {member.education && (
                    <p className="text-[10px] font-medium text-slate-500 mb-2 italic">
                      {member.education}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    {member.bio}
                  </p>
                </div>


              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
