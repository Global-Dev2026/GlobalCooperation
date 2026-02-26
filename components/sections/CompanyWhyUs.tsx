"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface WhyUsItem {
    title: string;
    description: string;
}

interface CompanyWhyUsProps {
    items: WhyUsItem[];
    companyColor: string;
}

export default function CompanyWhyUs({ items, companyColor }: CompanyWhyUsProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 lg:sticky lg:top-24"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                            <span
                                className="text-xs font-bold tracking-[0.25em] uppercase"
                                style={{ color: companyColor }}
                            >
                                Why Us
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Why Businesses Choose Us
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            We combined international standards with local expertise to deliver
                            solutions that drive real business value and sustainable growth.
                        </p>
                    </motion.div>

                    {/* Right: Checklist */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-2"
                    >
                        {items.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    <CheckCircle2 className="w-5 h-5" style={{ color: companyColor }} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
