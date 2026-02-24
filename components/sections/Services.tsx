"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Card from "@/components/ui/Card";
import { SERVICES } from "@/lib/constants";

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
                    <p className="text-xl text-slate-600">Comprehensive technology solutions for your business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, index) => {
                        const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.Circle;

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Card className="p-8 h-full text-left bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div className="mb-6 inline-flex items-center justify-center">
                                        <IconComponent className="w-10 h-10 text-burgundy stroke-[1.5]" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-slate-900 mb-3 group-hover:text-burgundy transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-base text-slate-600 leading-relaxed font-light text-left">
                                        {service.description}
                                    </p>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
