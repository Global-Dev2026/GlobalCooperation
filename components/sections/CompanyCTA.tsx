"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

type CTAContent = {
    title: string;
    description: string;
    buttonText: string;
};

type CompanyCTAProps = {
    cta: CTAContent;
    companyColor: string;
    companyName: string;
};

export default function CompanyCTA({ cta, companyColor }: CompanyCTAProps) {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="space-y-10"
                >
                    {/* Heading */}
                    <div>
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                            <span
                                className="text-xs font-bold tracking-[0.25em] uppercase"
                                style={{ color: companyColor }}
                            >
                                Get Started
                            </span>
                            <div className="h-px w-8" style={{ backgroundColor: companyColor }} />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {cta.title}
                        </h2>
                        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
                            {cta.description}
                        </p>
                    </div>

                    {/* Contact cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                icon: Phone,
                                label: "Phone",
                                value: SITE_CONFIG.phone,
                                href: `tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`,
                            },
                            {
                                icon: Mail,
                                label: "Email",
                                value: SITE_CONFIG.email,
                                href: `mailto:${SITE_CONFIG.email}`,
                            },
                            {
                                icon: MapPin,
                                label: "Address",
                                value: SITE_CONFIG.address,
                                href: SITE_CONFIG.mapUrl,
                            },
                        ].map((contact) => (
                            <motion.a
                                key={contact.label}
                                href={contact.href}
                                target={contact.label === "Address" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                whileHover={{ y: -3 }}
                                className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-all duration-300"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:opacity-90"
                                    style={{ backgroundColor: `${companyColor}12` }}
                                >
                                    <contact.icon
                                        className="w-5 h-5"
                                        style={{ color: companyColor }}
                                    />
                                </div>
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        {contact.label}
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        {contact.value}
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
