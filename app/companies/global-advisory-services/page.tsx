"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronDown,
    Target,
    CloudUpload,
    BarChart3,
    Sparkles,
    Shield,
    Users,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Lightbulb,
    TrendingUp,
    Award,
    Briefcase,
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
    {
        icon: Target,
        title: "Digital Strategy",
        description: "Develop comprehensive digital transformation strategies aligned with your business goals and market demands.",
        highlights: ["Roadmap Planning", "Market Analysis", "Goal Alignment"],
    },
    {
        icon: CloudUpload,
        title: "Cloud Migration",
        description: "Plan and execute seamless cloud migrations with minimal disruption and maximum cost optimization.",
        highlights: ["AWS & Azure", "Zero-downtime Migration", "Cost Optimization"],
    },
    {
        icon: BarChart3,
        title: "Data Analytics",
        description: "Build data strategies and analytics frameworks that turn your data into actionable business insights.",
        highlights: ["BI Dashboards", "Predictive Models", "Data Governance"],
    },
    {
        icon: Sparkles,
        title: "AI Implementation",
        description: "Strategic planning for AI adoption, from use case identification to implementation roadmaps.",
        highlights: ["Use Case Discovery", "AI Roadmaps", "Proof of Concept"],
    },
    {
        icon: Shield,
        title: "Technology Governance",
        description: "Establish governance frameworks that balance innovation with security, compliance, and risk management.",
        highlights: ["Risk Management", "Compliance", "Security Audits"],
    },
    {
        icon: Users,
        title: "Change Management",
        description: "Guide your organization through technology changes with structured change management programs.",
        highlights: ["Training Programs", "Adoption Planning", "Stakeholder Buy-in"],
    },
];

const stats = [
    { value: "180+", label: "Consulting Projects", icon: Briefcase },
    { value: "65+", label: "Enterprise Clients", icon: Users },
    { value: "45%", label: "Avg. ROI Improvement", icon: TrendingUp },
    { value: "50+", label: "Expert Consultants", icon: Award },
];

const whyChooseUs = [
    { title: "Strategic Depth", description: "We go beyond surface-level advice — delivering strategies grounded in deep industry analysis." },
    { title: "Data-Driven Decisions", description: "Every recommendation is backed by rigorous data analysis and benchmarking." },
    { title: "Proven ROI", description: "Our clients see an average 45% improvement in operational ROI within 12 months of engagement." },
    { title: "Risk-Focused Approach", description: "We identify and mitigate technology risks before they become business problems." },
    { title: "Industry-Wide Knowledge", description: "With clients across retail, finance, healthcare, and government — our expertise is broad and deep." },
    { title: "Backed by Global Cooperation Group", description: "Part of a diversified holding company, ensuring stability and long-term commitment." },
];

export default function GlobalAdvisoryServicesPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">

                {/* HERO */}
                <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
                    <motion.div style={{ y }} className="absolute inset-0">
                        <Image src="/images/companies/advisory.webp" alt="Global Advisory Services" fill className="object-cover" priority sizes="100vw" />
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
                    </motion.div>
                    <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-5">
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70">Global Cooperation Group</motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                                Global Advisory Services
                                <span className="block !text-accent font-light whitespace-nowrap">(Private) Limited</span>
                            </motion.h1>
                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="h-px w-20 bg-white/40 mx-auto" />
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Strategic consulting for digital transformation and cloud adoption — helping organizations navigate complexity and unlock sustainable growth.
                            </motion.p>
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="absolute bottom-10">
                            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-1 text-white/50">
                                <span className="text-xs tracking-widest uppercase">Scroll</span>
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ABOUT + STATS */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">About Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Your Strategic <span className="text-burgundy">Advisory</span> Partner
                                </h2>
                                <p className="text-gray-600 leading-relaxed">Global Advisory Services provides expert strategic consulting to guide organizations through their digital transformation journey. We bring together strategy consultants, cloud architects, and industry experts for informed technology decisions.</p>
                                <p className="text-gray-600 leading-relaxed">Led by <strong className="text-gray-900">Director Rumesh Lakshitha</strong> (B.Sc. Accounting — USJP), we provide actionable roadmaps, risk assessments, and change management support to ensure transformation initiatives deliver measurable business value.</p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link href="#services" className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white rounded-full text-sm font-semibold hover:bg-burgundy-800 transition-colors">Our Services <ArrowRight className="w-4 h-4" /></Link>
                                    <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-burgundy hover:text-burgundy transition-colors">Get in Touch</Link>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 text-center shadow-sm hover:shadow-md hover:border-burgundy/20 transition-all duration-300">
                                        <stat.icon className="w-7 h-7 text-burgundy mx-auto mb-3" />
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">What We Offer</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Services</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">Comprehensive advisory to navigate your digital transformation with confidence</p>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((service, index) => (
                                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: index * 0.06 }} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <div className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#84181815" }}>
                                        <service.icon className="w-5 h-5 text-burgundy" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{service.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{service.description}</p>
                                    <ul className="space-y-1">
                                        {service.highlights.map((h) => (
                                            <li key={h} className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <div className="w-1 h-1 rounded-full bg-burgundy flex-shrink-0" />{h}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="space-y-6 lg:sticky lg:top-24">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Why Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Why Businesses <span className="text-burgundy">Choose</span> Global Advisory</h2>
                                <p className="text-gray-600 leading-relaxed">We bridge the gap between technology and business outcomes — delivering advisory that translates complex decisions into clear, profitable action.</p>
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 space-y-3">
                                    <Lightbulb className="w-8 h-8 text-burgundy" />
                                    <h3 className="font-bold text-gray-900 text-lg">Actionable Intelligence, Measurable Results</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">From strategy to execution, we have guided 65+ enterprise clients through digital transformation — delivering an average 45% ROI improvement within 12 months.</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="space-y-2">
                                {whyChooseUs.map((item, i) => (
                                    <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
                                        <div className="flex-shrink-0 mt-0.5"><CheckCircle2 className="w-5 h-5 text-burgundy" /></div>
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

                {/* DIRECTOR */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Leadership</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Meet Our Director</h2>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                                        <Image src="/images/directers/lakshitha.png" alt="Mr. Rumesh Lakshitha" width={128} height={128} className="object-cover object-top w-full h-full" />
                                    </div>
                                </div>
                                <div className="text-center md:text-left space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Mr. Rumesh Lakshitha</h3>
                                        <p className="text-sm font-semibold mt-1 text-burgundy">Director — Global Advisory Services (Private) Limited</p>
                                        <p className="text-xs text-gray-400 mt-0.5">B.Sc. Accounting (Special) USJP</p>
                                    </div>
                                    <div className="h-px w-10 bg-gray-200 mx-auto md:mx-0" />
                                    <p className="text-sm text-gray-600 leading-relaxed">Director Rumesh leads Global Advisory Services with expertise in providing strategic advisory solutions that help businesses navigate complex challenges and achieve sustainable growth.</p>
                                    <Link href="https://www.linkedin.com/in/rumesh-lakshitha/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-burgundy hover:text-burgundy-800 transition-colors">
                                        Connect on LinkedIn <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact" className="py-16 md:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-10">
                            <div>
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Get Started</span>
                                    <div className="h-px w-8 bg-burgundy" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Transform Your Business Strategy</h2>
                                <p className="text-gray-500 max-w-xl mx-auto">Partner with our experts to navigate your digital transformation journey with confidence.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: Phone, label: "Phone", value: "+94 11 216 0252", href: "tel:+94112160252" },
                                    { icon: Mail, label: "Email", value: "info@globalsoftsl.com", href: "mailto:info@globalsoftsl.com" },
                                    { icon: MapPin, label: "Address", value: "22/20 Yahampath Mawatha, Maharagama", href: "https://share.google/1aP2fDU4AXd1WB2AJ" },
                                ].map((contact) => (
                                    <motion.a key={contact.label} href={contact.href} target={contact.label === "Address" ? "_blank" : undefined} rel="noopener noreferrer" whileHover={{ y: -3 }} className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-burgundy/30 hover:shadow-md transition-all duration-300 bg-white">
                                        <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-burgundy flex items-center justify-center transition-colors duration-300">
                                            <contact.icon className="w-5 h-5 text-burgundy group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{contact.label}</div>
                                            <div className="text-sm font-medium text-gray-700 group-hover:text-burgundy transition-colors">{contact.value}</div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                            <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy hover:bg-burgundy-800 text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-sm shadow-burgundy/20">
                                Schedule Consultation <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
