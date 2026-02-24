"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Target,
  Users,
  Zap,
  Shield,
  Building2,
  TrendingUp,
  Globe,
  Leaf,
  Handshake,
} from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";

const holdingRoles = [
  {
    icon: Target,
    title: "Strategic Leadership",
    description: "Setting the long-term vision and group-wide direction through experienced board oversight and strategic enablement.",
  },
  {
    icon: TrendingUp,
    title: "Capital Stewardship",
    description: "Disciplined capital allocation and refined investment management for long-term sustainability and value creation.",
  },
  {
    icon: Shield,
    title: "Risk & Governance",
    description: "Robust corporate governance frameworks, ensuring the highest ethical standards, accountability, and compliance.",
  },
  {
    icon: Users,
    title: "Advisory Support",
    description: "Continuous performance monitoring and high-level strategic advisory to maximize the potential of every subsidiary.",
  },
  {
    icon: Globe,
    title: "Future Growth",
    description: "Identifying emerging global opportunities and establishing strategic partnerships for sustainable international expansion.",
  },
];

const coreValues = [
  {
    icon: Shield,
    title: "Integrity & Transparency",
    description: "Ethical leadership and accountable decision-making.",
  },
  {
    icon: Target,
    title: "Strategic Discipline",
    description: "Thoughtful planning with a long-term perspective.",
  },
  {
    icon: Zap,
    title: "Innovation with Purpose",
    description: "Growth driven by real market needs.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Responsible and future-focused business practices.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "Strong relationships with stakeholders, clients, and communities.",
  },
];

const whyPartner = [
  {
    icon: Building2,
    title: "Diversified Structure",
    description: "Balancing established operations and growth-stage ventures.",
  },
  {
    icon: Zap,
    title: "Clear Separation",
    description: "Between strategic oversight and operational execution.",
  },
  {
    icon: Shield,
    title: "Strong Governance",
    description: "Disciplined capital management and governance framework.",
  },
  {
    icon: TrendingUp,
    title: "Proven Leadership",
    description: "Experience-driven management with long-term vision.",
  },
  {
    icon: Leaf,
    title: "Future Growth",
    description: "Commitment to ethical, sustainable, and scalable growth.",
  },
];


function useAutoRotate(length: number, intervalMs: number = 5000) {
  const [active, setActive] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [length, intervalMs, isPaused]);

  return { active, setActive, isPaused, setIsPaused };
}

export default function About() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const {
    active: activeRole,
    setActive: setActiveRole,
    setIsPaused: setIsRolePaused
  } = useAutoRotate(holdingRoles.length, 5000);

  const {
    active: activeCoreValue,
    setActive: setActiveCoreValue,
    setIsPaused: setIsCoreValuePaused
  } = useAutoRotate(coreValues.length, 5000);

  const {
    active: activePartner,
    setActive: setActivePartner,
    setIsPaused: setIsPartnerPaused
  } = useAutoRotate(whyPartner.length, 5000);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="about" className="py-24 bg-whisper overflow-hidden relative">
      {/* Background Drifting Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-burgundy/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-slate-600 mb-2 block">
            Global Cooperation (Private) Limited
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-burgundy mb-6">
            About Us
          </h2>
          <div className="max-w-4xl mx-auto space-y-4 text-left">
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Global Cooperation (Private) Limited is a Sri Lanka–based holding
              company established to build, manage, and scale a diversified
              portfolio of businesses with long-term growth potential. The Group
              provides strategic leadership, governance oversight, and
              disciplined capital stewardship to its subsidiaries, ensuring
              sustainable value creation and resilient growth.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              We focus on developing and nurturing businesses across technology,
              advisory services, retail management, and professional services.
              Through experienced leadership and a centralized management
              framework, Global Cooperation enables its portfolio companies to
              operate efficiently, respond to market change, and compete
              successfully in both local and international markets.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              As a holding company, our mandate is strategic enablement rather
              than operational execution. We align vision, governance, and
              resources—empowering each subsidiary to reach its full potential
              while maintaining strong standards of accountability and
              performance.
            </p>
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <Card className="p-8 md:p-12 bg-gradient-to-br from-burgundy to-burgundy-950 text-white text-center group overflow-hidden relative">
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <motion.div variants={fadeInUp} className="relative z-10">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Our Approach
              </h3>
              <p className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto">
                At Global Cooperation (Private) Limited, we provide strategic oversight, disciplined capital management, and strong governance to empower our subsidiaries. By aligning vision, performance, and long-term planning, we enable sustainable growth, operational excellence, and enduring value creation across our diversified portfolio.
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* Vision & Mission - Redesigned Immersive Sections */}
        <div className="mb-32 space-y-32">
          {[
            {
              id: "vision",
              label: "VISION",
              text: "To be a respected, diversified holding company delivering sustainable long-term value regionally and globally.",
              image: "/images/companies/vision.png",
              reverse: false,
              accent: "burgundy",
            },
            {
              id: "mission",
              label: "MISSION",
              text: "To strategically invest in and manage subsidiaries through strong governance and leadership, creating enduring stakeholder value.",
              image: "/images/companies/mission.png",
              reverse: true,
              accent: "gold",
            },
          ].map((item, idx) => (
            <div
              key={item.id}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${item.reverse ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: item.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-3"
                  >
                    <div className={`w-8 h-[2px] ${item.accent === "burgundy" ? "bg-burgundy" : "bg-gold"}`} />
                    <span className={`text-[11px] font-bold tracking-[0.5em] uppercase ${item.accent === "burgundy" ? "text-burgundy" : "text-gold"}`}>
                      {item.label}
                    </span>
                  </motion.div>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
                    {item.id === "vision" ? (
                      <>Our Strategic <span className="text-burgundy italic">Vision</span></>
                    ) : (
                      <>Our Core <span className="text-gold italic">Mission</span></>
                    )}
                  </h3>
                </div>

                <div className="relative">
                  <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light text-justify">
                    {item.text}
                  </p>
                  {/* Premium Accent Line */}
                  <div className={`absolute -left-6 top-2 bottom-2 w-[1px] ${item.accent === "burgundy" ? "bg-burgundy/20" : "bg-gold/20"} hidden md:block`} />
                </div>

                <div className="flex gap-4 items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.accent === "burgundy" ? "bg-burgundy/5 text-burgundy" : "bg-gold/5 text-gold"}`}>
                    <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
                    Commitment to Excellence
                  </span>
                </div>
              </motion.div>

              {/* Image Side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: item.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 relative group"
              >
                {/* Visual Flair Elements */}
                <div className={`absolute -inset-4 bg-gradient-to-tr ${item.accent === "burgundy" ? "from-burgundy/10 to-transparent" : "from-gold/10 to-transparent"} blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative aspect-[16/10] bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/80 transition-colors duration-500">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === 0}
                  />

                  {/* Glass Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                </div>

                {/* Decorative floating badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute -bottom-6 ${item.reverse ? "-left-6" : "-right-6"} bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/50 hidden md:flex items-center gap-3 z-20`}
                >
                  <div className={`w-2 h-2 rounded-full ${item.accent === "burgundy" ? "bg-burgundy" : "bg-gold"}`} />
                  <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">Global Standards</span>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Our Role as a Holding Company - Modern Split Interactive Section */}
        <div className="mb-40">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
            <div className="max-w-3xl w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-6"
              >
                <div className="h-[2px] w-12 bg-gold" />
                <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
                  Strategic Oversight
                </span>
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-heading font-bold text-burgundy tracking-tight leading-[1.1] text-center lg:text-left">
                Our Role as a <br className="hidden lg:block" />
                <span className="text-slate-900">Holding Entity</span>
              </h3>
            </div>

          </div>

          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
            onMouseEnter={() => setIsRolePaused(true)}
            onMouseLeave={() => setIsRolePaused(false)}
          >
            {/* Left Column: Interactive Menu */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {holdingRoles.map((role, index) => (
                <div
                  key={role.title}
                  onMouseEnter={() => setActiveRole(index)}
                  onClick={() => setActiveRole(index)} // For mobile/touch
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activeRole === index
                    ? 'bg-white shadow-xl border-burgundy/10 scale-105 z-10'
                    : 'bg-transparent border-transparent hover:bg-white/40 hover:border-white/50'
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeRole === index
                      ? 'bg-burgundy text-white shadow-lg rotate-3'
                      : 'bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-burgundy'
                      }`}>
                      <role.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold transition-colors duration-300 ${activeRole === index ? 'text-burgundy' : 'text-slate-500 group-hover:text-slate-800'
                        }`}>
                        {role.title}
                      </h4>
                    </div>
                    {activeRole === index && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1.5 h-1.5 rounded-full bg-gold"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Display Area */}
            <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRole}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-burgundy to-burgundy-950 p-10 md:p-16 text-white shadow-[0_32px_80px_-20px_rgba(128,0,0,0.3)]">

                    {/* Abstract Shapes/Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/3" />

                    {/* Big Icon Background */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.07] pointer-events-none rotate-12 scale-150">
                      {React.createElement(holdingRoles[activeRole].icon, {
                        size: 400,
                        strokeWidth: 0.5
                      })}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gold">
                        {React.createElement(holdingRoles[activeRole].icon, {
                          size: 32
                        })}
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3 opacity-60">
                          <span className="text-xs font-bold tracking-[0.2em] uppercase">Example Role</span>
                          <div className="h-[1px] w-10 bg-white/50" />
                          <span className="text-xs font-mono">0{activeRole + 1} / 0{holdingRoles.length}</span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                          {holdingRoles[activeRole].title}
                        </h3>

                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-xl">
                          {holdingRoles[activeRole].description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button className="group flex items-center gap-3 text-sm font-bold tracking-wider uppercase text-gold hover:text-white transition-colors">
                          <span>Explore Capability</span>
                          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
                            <TrendingUp size={14} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Core Values - Split Interactive Section */}
        <div className="mb-40">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
            <div className="max-w-3xl w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-6"
              >
                <div className="h-[2px] w-12 bg-gold" />
                <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
                  Our Principles
                </span>
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-heading font-bold text-burgundy tracking-tight leading-[1.1] text-center lg:text-left">
                Core <br className="hidden lg:block" />
                <span className="text-slate-900">Values</span>
              </h3>
            </div>

          </div>

          <div
            className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start"
            onMouseEnter={() => setIsCoreValuePaused(true)}
            onMouseLeave={() => setIsCoreValuePaused(false)}
          >
            {/* Right Column (previously left): Interactive Menu */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {coreValues.map((value, index) => (
                <div
                  key={value.title}
                  onMouseEnter={() => setActiveCoreValue(index)}
                  onClick={() => setActiveCoreValue(index)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activeCoreValue === index
                    ? 'bg-white shadow-xl border-gold/10 scale-105 z-10'
                    : 'bg-transparent border-transparent hover:bg-white/40 hover:border-white/50'
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeCoreValue === index
                      ? 'bg-gold text-burgundy shadow-lg rotate-3'
                      : 'bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-gold'
                      }`}>
                      <value.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold transition-colors duration-300 ${activeCoreValue === index ? 'text-burgundy' : 'text-slate-500 group-hover:text-slate-800'
                        }`}>
                        {value.title}
                      </h4>
                    </div>
                    {activeCoreValue === index && (
                      <motion.div
                        layoutId="activeIndicatorValue"
                        className="w-1.5 h-1.5 rounded-full bg-burgundy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Left Column (previously right): Display Area */}
            <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCoreValue}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-600 to-gold-900 p-10 md:p-16 text-white shadow-[0_32px_80px_-20px_rgba(202,138,4,0.3)]">

                    {/* Abstract Shapes/Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/10 blur-[100px] -translate-y-1/2 -translate-x-1/3" />

                    {/* Big Icon Background */}
                    <div className="absolute -bottom-10 -left-10 opacity-[0.1] pointer-events-none -rotate-12 scale-150">
                      {React.createElement(coreValues[activeCoreValue].icon, {
                        size: 400,
                        strokeWidth: 0.5
                      })}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        {React.createElement(coreValues[activeCoreValue].icon, {
                          size: 32
                        })}
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3 opacity-60">
                          <span className="text-xs font-bold tracking-[0.2em] uppercase">Core Value</span>
                          <div className="h-[1px] w-10 bg-white/50" />
                          <span className="text-xs font-mono">0{activeCoreValue + 1} / 0{coreValues.length}</span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                          {coreValues[activeCoreValue].title}
                        </h3>

                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light max-w-xl">
                          {coreValues[activeCoreValue].description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeCoreValue ? 'w-8 bg-white' : 'w-1.5 bg-white/30'}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Why Partner or Invest - Split Interactive Section */}
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
            <div className="max-w-3xl w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-6"
              >
                <div className="h-[2px] w-12 bg-gold" />
                <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
                  Growth & Opportunity
                </span>
              </motion.div>
              <h3 className="text-4xl md:text-6xl font-heading font-bold text-burgundy tracking-tight leading-[1.1] text-center lg:text-left">
                Why Partner <br className="hidden lg:block" />
                <span className="text-slate-900">With Us</span>
              </h3>
            </div>

          </div>

          <div
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start"
            onMouseEnter={() => setIsPartnerPaused(true)}
            onMouseLeave={() => setIsPartnerPaused(false)}
          >
            {/* Left Column: Interactive Menu */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {whyPartner.map((partner, index) => (
                <div
                  key={partner.title}
                  onMouseEnter={() => setActivePartner(index)}
                  onClick={() => setActivePartner(index)}
                  className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${activePartner === index
                    ? 'bg-white shadow-xl border-burgundy/10 scale-105 z-10'
                    : 'bg-transparent border-transparent hover:bg-white/40 hover:border-white/50'
                    }`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activePartner === index
                      ? 'bg-slate-900 text-white shadow-lg rotate-3'
                      : 'bg-white/50 text-slate-400 group-hover:bg-white group-hover:text-slate-900'
                      }`}>
                      <partner.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold transition-colors duration-300 ${activePartner === index ? 'text-burgundy' : 'text-slate-500 group-hover:text-slate-800'
                        }`}>
                        {partner.title}
                      </h4>
                    </div>
                    {activePartner === index && (
                      <motion.div
                        layoutId="activeIndicatorPartner"
                        className="w-1.5 h-1.5 rounded-full bg-gold"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Display Area */}
            <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePartner}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <div className="relative h-full overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-16 text-white shadow-[0_32px_80px_-20px_rgba(15,23,42,0.3)]">

                    {/* Abstract Shapes/Texture */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/3" />

                    {/* Big Icon Background */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.05] pointer-events-none rotate-12 scale-150">
                      {React.createElement(whyPartner[activePartner].icon, {
                        size: 400,
                        strokeWidth: 0.5
                      })}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                      <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        {React.createElement(whyPartner[activePartner].icon, {
                          size: 32
                        })}
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center gap-3 opacity-60">
                          <span className="text-xs font-bold tracking-[0.2em] uppercase">Partnership Benefit</span>
                          <div className="h-[1px] w-10 bg-white/50" />
                          <span className="text-xs font-mono">0{activePartner + 1} / 0{whyPartner.length}</span>
                        </div>

                        <h3 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
                          {whyPartner[activePartner].title}
                        </h3>

                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light max-w-xl">
                          {whyPartner[activePartner].description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <button className="group flex items-center gap-3 text-sm font-bold tracking-wider uppercase text-white/50 hover:text-white transition-colors">
                          <span>View Details</span>
                          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                            <TrendingUp size={14} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
