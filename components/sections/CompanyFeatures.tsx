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
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: companyColor }} />
                        <span
                            className="text-sm font-bold tracking-[0.25em] uppercase"
                            style={{ color: companyColor }}
                        >
                            What We Offer
                        </span>
                        <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: companyColor }} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Our Services
                    </h2>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Comprehensive solutions meticulously designed to drive your business forward with excellence.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent =
                            (LucideIcons as any)[feature.icon] || LucideIcons.Circle;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
                                className="group relative bg-white rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden z-10"
                                style={{
                                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
                                }}
                            >
                                {/* Subtle Background Gradient on Hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                                    style={{
                                        background: `linear-gradient(135deg, ${companyColor}05 0%, transparent 100%)`,
                                    }}
                                />

                                {/* Icon Container */}
                                <div className="mb-8 relative w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                        style={{ backgroundColor: companyColor }}
                                    />
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"
                                        style={{ backgroundColor: companyColor }}
                                    />
                                    <IconComponent
                                        className="w-8 h-8 relative z-10 transition-colors duration-500"
                                        style={{ color: companyColor }}
                                        strokeWidth={1.5}
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-gray-800 transition-colors">
                                    {feature.title}
                                </h3>

                                <p className="text-base text-gray-600 leading-relaxed mb-8 flex-grow">
                                    {feature.description}
                                </p>

                                {/* Highlights */}
                                {feature.highlights && feature.highlights.length > 0 && (
                                    <ul className="space-y-3 mt-auto pt-6 border-t border-gray-100/80">
                                        {feature.highlights.map((highlight, hIdx) => (
                                            <li key={hIdx} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                                <LucideIcons.CheckCircle2
                                                    className="w-5 h-5 shrink-0 mt-0.5"
                                                    style={{ color: companyColor }}
                                                    strokeWidth={2}
                                                />
                                                <span className="leading-snug">{highlight}</span>
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
