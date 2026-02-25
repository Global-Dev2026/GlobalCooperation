"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronDown,
    Code2,
    Globe,
    MonitorSmartphone,
    ShoppingCart,
    Building2,
    Smartphone,
    Layers,
    Headphones,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Star,
    Users,
    Award,
    Briefcase,
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
    {
        icon: Code2,
        title: "Software Development",
        description:
            "End-to-end software development using modern frameworks and technologies to build scalable, performant applications tailored to your business.",
        highlights: ["Web Applications", "Backend Systems", "Desktop Software"],
    },
    {
        icon: Globe,
        title: "Website Development",
        description:
            "Design and develop responsive, high-performance websites that establish a strong digital presence and drive user engagement.",
        highlights: ["Corporate Websites", "E-commerce", "Landing Pages"],
    },
    {
        icon: ShoppingCart,
        title: "POS System & Services",
        description:
            "Our flagship product, Global POS, is a comprehensive point-of-sale solution designed to manage supermarkets, retail outlets, and more — with full maintenance and ongoing support.",
        highlights: ["Global POS Product", "Supermarket Management", "Maintenance & Support"],
    },
    {
        icon: Building2,
        title: "Enterprise Architecture",
        description:
            "Build robust, secure enterprise systems that integrate seamlessly with your existing technology stack.",
        highlights: ["System Integration", "Security", "Microservices"],
    },
    {
        icon: Smartphone,
        title: "Mobile Development",
        description:
            "Build feature-rich, intuitive mobile applications for iOS and Android platforms that provide seamless user experiences.",
        highlights: ["iOS & Android", "React Native", "Native Apps"],
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description:
            "Round-the-clock technical support and maintenance to ensure your applications run smoothly at all times.",
        highlights: ["On-call Engineers", "Monitoring", "Rapid Response"],
    },
];

const stats = [
    { value: "250+", label: "Projects Delivered", icon: Briefcase },
    { value: "85+", label: "Active Clients", icon: Users },
    { value: "98%", label: "Success Rate", icon: Star },
    { value: "15+", label: "Years Experience", icon: Award },
];

const whyChooseUs = [
    {
        title: "Established in 2009",
        description: "Over 15 years of delivering reliable software solutions to businesses of all sizes.",
    },
    {
        title: "Software Expertise",
        description: "From database design to frontend — our team covers the complete development lifecycle.",
    },
    {
        title: "Modern Web Solutions",
        description: "We design scalable, user-centric web architectures built for performance and resilience.",
    },
    {
        title: "Global POS — Our Flagship Product",
        description: "Global POS manages supermarkets and retail businesses end-to-end, backed by our dedicated maintenance and support team.",
    },
    {
        title: "Transparent Communication",
        description: "Regular updates, clear reporting, and honest timelines — no surprises.",
    },
    {
        title: "Backed by Global Cooperation Group",
        description: "Part of a diversified holding company, ensuring stability and long-term commitment.",
    },
];

export default function GlobalSoftSolutionsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">

                {/* ── HERO ── */}
                <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
                    <motion.div style={{ y }} className="absolute inset-0">
                        <Image
                            src="/images/companies/software.webp"
                            alt="Global Soft Solutions"
                            fill className="object-cover" priority sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
                    </motion.div>

                    <motion.div style={{ opacity }} className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-5">
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70">
                                Global Cooperation Group
                            </motion.p>
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
                                Global Soft Solutions
                                <span className="block !text-accent font-light whitespace-nowrap">(Private) Limited</span>
                            </motion.h1>
                            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
                                className="h-px w-20 bg-white/40 mx-auto" />
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
                                className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Custom software development, website solutions, and mobile applications — empowering businesses to achieve efficiency, scalability, and sustainable growth.
                            </motion.p>
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="absolute bottom-10">
                            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                                className="flex flex-col items-center gap-1 text-white/50">
                                <span className="text-xs tracking-widest uppercase">Scroll</span>
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── ABOUT + STATS ── */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">About Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Your Complete<br /><span className="text-burgundy">Software</span> Partner
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Global Soft Solutions (Private) Limited delivers comprehensive software development and POS services, from concept to deployment. Our flagship product, <strong className="text-gray-900">Global POS</strong>, powers supermarkets, retail outlets, and more — supported by our dedicated maintenance team.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Established in 2009 and led by <strong className="text-gray-900">Director Sumudu Masakorala</strong> and <strong className="text-gray-900">Director Rashmika Perera</strong>, we combine technical excellence with business acumen to deliver software that drives real results.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link href="#services" className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white rounded-full text-sm font-semibold hover:bg-burgundy-800 transition-colors">
                                        Our Services <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-burgundy hover:text-burgundy transition-colors">
                                        Get in Touch
                                    </Link>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-4">
                                {stats.map((stat, i) => (
                                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 text-center shadow-sm hover:shadow-md hover:border-burgundy/20 transition-all duration-300">
                                        <stat.icon className="w-7 h-7 text-burgundy mx-auto mb-3" />
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ── SERVICES ── */}
                <section id="services" className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">What We Offer</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Services</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">End-to-end software solutions designed to transform and grow your business</p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((service, index) => (
                                <motion.div key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <div className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#84181815" }}>
                                        <service.icon className="w-5 h-5 text-burgundy" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{service.title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{service.description}</p>
                                    <ul className="space-y-1">
                                        {service.highlights.map((h) => (
                                            <li key={h} className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <div className="w-1 h-1 rounded-full bg-burgundy flex-shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY CHOOSE US ── */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="space-y-6 lg:sticky lg:top-24">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Why Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Why Businesses<br /><span className="text-burgundy">Choose</span> Global Soft
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We are not just a vendor. We are a long-term technology partner committed to your business success — from first line of code to post-deployment support.
                                </p>
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 space-y-3">
                                    <Layers className="w-8 h-8 text-burgundy" />
                                    <h3 className="font-bold text-gray-900 text-lg">Delivering Software That Works</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Since 2009, we have delivered 250+ software projects across industries — from small business tools to enterprise platforms — always on time and within budget.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="space-y-2">
                                {whyChooseUs.map((item, i) => (
                                    <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-200 group">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <CheckCircle2 className="w-5 h-5 text-burgundy" />
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

                {/* ── DIRECTORS ── */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Leadership</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Meet Our Directors</h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
                            {[
                                { name: "Mr. Sumudu Masakorala", title: "Director — Global Soft Solutions (Private) Limited", image: "/images/directers/sumudu.png", linkedin: "https://www.linkedin.com/in/sumudu-masakorala/", bio: "Leads Global Soft Solutions (Private) Limited with a focus on innovative software and IT solutions that empower businesses to achieve efficiency, scalability, and sustainable growth." },
                                { name: "Mr. Rashmika Perera", title: "Director — Global Soft Solutions (Private) Limited", image: "/images/directers/rashmika.png", linkedin: "https://www.linkedin.com/in/rashmika-perera-640639149/", bio: "Drives the company's commitment to quality and forward-thinking strategies, transforming ideas into impactful digital solutions for clients across Sri Lanka." },
                            ].map((director, i) => (
                                <motion.div key={director.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.1 }} className="h-full">
                                    <div className="h-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                                                <Image src={director.image} alt={director.name} width={96} height={96} className="object-cover object-top w-full h-full" />
                                            </div>
                                        </div>
                                        <div className="text-center sm:text-left space-y-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{director.name}</h3>
                                                <p className="text-sm font-semibold mt-0.5 text-burgundy">{director.title}</p>
                                            </div>
                                            <div className="h-px w-8 bg-gray-200 mx-auto sm:mx-0" />
                                            <p className="text-sm text-gray-600 leading-relaxed">{director.bio}</p>
                                            <Link href={director.linkedin} target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-sm font-medium text-burgundy hover:text-burgundy-800 transition-colors">
                                                Connect on LinkedIn <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CONTACT ── */}
                <section id="contact" className="py-16 md:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-10">
                            <div>
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Get Started</span>
                                    <div className="h-px w-8 bg-burgundy" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
                                <p className="text-gray-500 max-w-xl mx-auto">Let&apos;s discuss how our custom software solutions can help you achieve your goals.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: Phone, label: "Phone", value: "+94 11 216 0252", href: "tel:+94112160252" },
                                    { icon: Mail, label: "Email", value: "info@globalsoftsl.com", href: "mailto:info@globalsoftsl.com" },
                                    { icon: MapPin, label: "Address", value: "22/20 Yahampath Mawatha, Maharagama", href: "https://share.google/1aP2fDU4AXd1WB2AJ" },
                                ].map((contact) => (
                                    <motion.a key={contact.label} href={contact.href} target={contact.label === "Address" ? "_blank" : undefined} rel="noopener noreferrer"
                                        whileHover={{ y: -3 }} className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-burgundy/30 hover:shadow-md transition-all duration-300 bg-white">
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
                                Start Your Project <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
