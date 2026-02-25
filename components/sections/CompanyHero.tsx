"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type CompanyHeroProps = {
    name: string;
    description: string;
    image: string;
    gradient: string;
};

export default function CompanyHero({
    name,
    description,
    image,
}: CompanyHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen min-h-[600px] overflow-hidden"
        >
            {/* Background image */}
            <motion.div style={{ y }} className="absolute inset-0">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                {/* Clean minimal overlay */}
                <div className="absolute inset-0 bg-black/55" />
                {/* Fade to white at bottom for seamless section transition */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
            </motion.div>

            {/* Hero content */}
            <motion.div
                style={{ opacity }}
                className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto space-y-5">
                    {/* Group label */}
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70"
                    >
                        Global Cooperation Group
                    </motion.p>

                    {/* Company name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
                    >
                        {name}
                    </motion.h1>

                    {/* Thin divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="h-px w-20 bg-white/40 mx-auto"
                    />

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed text-justify"
                    >
                        {description}
                    </motion.p>
                </div>

            </motion.div>
        </section>
    );
}
