"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Stat = {
    label: string;
    value: number;
    suffix: string;
};

type CompanyStatsProps = {
    stats: readonly Stat[];
    companyColor: string;
};

function useCounter(end: number, duration: number = 2, shouldStart: boolean) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                setCount(Math.floor(end * progress));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
}

export default function CompanyStats({ stats, companyColor }: CompanyStatsProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    return (
        <section className="py-24 bg-white">
            <div ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                        <span
                            className="text-xs font-bold tracking-[0.25em] uppercase"
                            style={{ color: companyColor }}
                        >
                            Our Impact
                        </span>
                        <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                        Results That Matter
                    </h2>
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={index}
                            stat={stat}
                            companyColor={companyColor}
                            isInView={isInView}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function StatItem({
    stat,
    companyColor,
    isInView,
    index,
}: {
    stat: Stat;
    companyColor: string;
    isInView: boolean;
    index: number;
}) {
    const displayValue = useCounter(stat.value, 2.5, isInView);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-gray-100 rounded-2xl p-5 md:p-8 text-center shadow-sm hover:shadow-md transition-all duration-300"
        >
            <div className="mb-1">
                <span
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                    style={{ color: companyColor }}
                >
                    {displayValue}
                </span>
                <span
                    className="text-xl md:text-2xl lg:text-3xl font-bold ml-0.5"
                    style={{ color: companyColor }}
                >
                    {stat.suffix}
                </span>
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-2">
                {stat.label}
            </p>
        </motion.div>
    );
}
