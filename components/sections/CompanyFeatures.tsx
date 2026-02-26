"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

type Feature = {
    title: string;
    description: string;
    icon: string;
    highlights?: readonly string[];
};

type CompanyFeaturesProps = {
    features: readonly Feature[];
    companyColor: string;
};

export default function CompanyFeatures({
    features,
    companyColor,
}: CompanyFeaturesProps) {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            What We Offer
                        </span>
                        <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Our Services
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Comprehensive solutions designed to drive your business forward
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="flex flex-wrap justify-center gap-5">
                    {features.map((feature, index) => {
                        const IconComponent =
                            (LucideIcons as any)[feature.icon] || LucideIcons.Circle;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: index * 0.06 }}
                                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                            >
                                {/* Icon */}
                                <div
                                    className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:opacity-90"
                                    style={{ backgroundColor: `${companyColor}15` }}
                                >
                                    <IconComponent
                                        className="w-5 h-5"
                                        style={{ color: companyColor }}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                    {feature.description}
                                </p>

                                {/* Highlights */}
                                {feature.highlights && feature.highlights.length > 0 && (
                                    <ul className="space-y-1.5 mt-auto">
                                        {feature.highlights.map((highlight, hIdx) => (
                                            <li key={hIdx} className="flex items-center gap-2 text-[10px] text-gray-400">
                                                <div
                                                    className="w-1 h-1 rounded-full flex-shrink-0"
                                                    style={{ backgroundColor: companyColor }}
                                                />
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
