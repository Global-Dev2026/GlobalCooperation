"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronDown,
    ShoppingCart,
    Laptop,
    Video,
    Wind,
    Code,
    Globe,
    Store,
    Headphones,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Star,
    Users,
    Award,
    Zap,
} from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
    {
        icon: ShoppingCart,
        title: "POS System Solutions",
        description:
            "Comprehensive point-of-sale systems tailored for retail stores, supermarkets, and restaurants — streamlining billing, inventory, and customer management.",
        highlights: ["Inventory Management", "Sales Reporting", "Multi-branch Support"],
    },
    {
        icon: Laptop,
        title: "Computer Hardware Supply",
        description:
            "Quality computers, laptops, peripherals, and networking equipment to build reliable IT infrastructure for your business.",
        highlights: ["Branded Hardware", "Networking Equipment", "Peripherals & Accessories"],
    },
    {
        icon: Video,
        title: "CCTV & Security Systems",
        description:
            "Professional installation and maintenance of CCTV surveillance systems to protect your premises and assets.",
        highlights: ["HD Camera Installation", "Remote Monitoring", "24/7 Recording"],
    },
    {
        icon: Wind,
        title: "AC Solutions & Maintenance",
        description:
            "Supply, installation, and servicing of air conditioning systems for commercial and retail environments.",
        highlights: ["Commercial AC Units", "Preventive Maintenance", "Energy Efficient Solutions"],
    },
    {
        icon: Code,
        title: "Custom Software Development",
        description:
            "Bespoke software solutions built to fit your exact business workflows — from inventory systems to enterprise management platforms.",
        highlights: ["Web Applications", "Desktop Software", "Database Systems"],
    },
    {
        icon: Globe,
        title: "Website Solutions",
        description:
            "Professional website design and development to establish your digital presence with modern, responsive, and SEO-optimized sites.",
        highlights: ["Responsive Design", "SEO Optimized", "E-commerce Ready"],
    },
    {
        icon: Store,
        title: "Supermarket Advisory",
        description:
            "Expert consulting for supermarket and retail operations — helping businesses optimize layout, technology, and management practices.",
        highlights: ["Operations Consulting", "Technology Planning", "Staff Training"],
    },
    {
        icon: Headphones,
        title: "IT Support & Maintenance",
        description:
            "Ongoing technical support, preventive maintenance, and rapid-response IT services to keep your operations running smoothly.",
        highlights: ["On-site Support", "Remote Assistance", "Preventive Maintenance"],
    },
];

const stats = [
    { value: "150+", label: "Businesses Served", icon: Users },
    { value: "200+", label: "POS Systems Deployed", icon: ShoppingCart },
    { value: "15+", label: "Years of Experience", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: Star },
];

const whyChooseUs = [
    {
        title: "One-Stop Technology Partner",
        description: "Hardware, software, CCTV, and advisory — everything under one roof.",
    },
    {
        title: "Local Expertise, Global Standards",
        description: "Sri Lanka-based team with international-quality solutions and service delivery.",
    },
    {
        title: "Tailored Solutions",
        description: "We don't believe in a one-size-fits-all approach — every solution is custom-built.",
    },
    {
        title: "Proven Track Record",
        description: "Trusted by 150+ businesses across retail, supermarkets, and commercial sectors.",
    },
    {
        title: "After-Sales Support",
        description: "Our relationship doesn't end at delivery — we provide ongoing support and maintenance.",
    },
    {
        title: "Backed by Global Cooperation Group",
        description: "Part of a diversified holding company, ensuring stability and long-term commitment.",
    },
];

export default function GlobalTechPage() {
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
                <section
                    ref={containerRef}
                    className="relative h-screen min-h-[600px] overflow-hidden"
                >
                    {/* Background image with subtle dark overlay */}
                    <motion.div style={{ y }} className="absolute inset-0">
                        <Image
                            src="/images/companies/tech.jpg"
                            alt="Global Tech (Private) Limited"
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        {/* Light, clean overlay — not too dark */}
                        <div className="absolute inset-0 bg-black/55" />
                        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
                    </motion.div>

                    {/* Hero content */}
                    <motion.div
                        style={{ opacity }}
                        className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8"
                    >
                        <div className="max-w-4xl mx-auto space-y-5">
                            {/* Group badge */}
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xs font-semibold tracking-[0.3em] uppercase text-white/70"
                            >
                                Global Cooperation Group
                            </motion.p>

                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-tight"
                            >
                                Global Tech
                                <span className="block text-[#E0BB20] font-light">(Private) Limited</span>
                            </motion.h1>

                            {/* Thin divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="h-px w-20 bg-white/40 mx-auto"
                            />

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                                className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
                            >
                                Sri Lanka&apos;s trusted one-stop technology partner — POS systems, hardware,
                                CCTV, software, and expert advisory services.
                            </motion.p>
                        </div>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.1 }}
                            className="absolute bottom-10"
                        >
                            <motion.div
                                animate={{ y: [0, 7, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="flex flex-col items-center gap-1 text-white/50"
                            >
                                <span className="text-xs tracking-widest uppercase">Scroll</span>
                                <ChevronDown className="w-5 h-5" />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── ABOUT ── */}
                <section className="py-16 md:py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                            {/* Text */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">About Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Your Complete<br />
                                    <span className="text-burgundy">Technology</span> Partner
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Global Tech (Private) Limited stands at the forefront of Sri Lanka&apos;s technology landscape,
                                    offering a wide spectrum of IT products and services for businesses of all sizes.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    From POS systems and hardware to CCTV, custom software, and expert advisory —
                                    we bring global-standard solutions to the local market, led by <strong className="text-gray-900">Director Pasan Wickramathanthri</strong> and
                                    backed by the Global Cooperation Group.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <Link
                                        href="#services"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-burgundy text-white rounded-full text-sm font-semibold hover:bg-burgundy-800 transition-colors"
                                    >
                                        Our Services <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-burgundy hover:text-burgundy transition-colors"
                                    >
                                        Get in Touch
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 text-center shadow-sm hover:shadow-md hover:border-burgundy/20 transition-all duration-300"
                                    >
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
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">What We Offer</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">Our Services</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">
                                End-to-end technology solutions designed to modernize and grow your business
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ duration: 0.5, delay: index * 0.06 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#80000015" }}>
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

                            {/* Left */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7 }}
                                className="space-y-6 lg:sticky lg:top-24"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Why Us</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Why Businesses<br />
                                    <span className="text-burgundy">Choose</span> Global Tech
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We are not just a vendor. We are a long-term technology partner committed to your
                                    business success — from first deployment to ongoing support.
                                </p>

                                {/* Highlight card */}
                                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 space-y-3">
                                    <Zap className="w-8 h-8 text-burgundy" />
                                    <h3 className="font-bold text-gray-900 text-lg">Delivering Business Value Through Technology</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        Since our founding, we have served over 150 businesses across Sri Lanka with reliable,
                                        affordable, and high-impact technology solutions — from small shops to large supermarket chains.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right: checklist */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7 }}
                                className="space-y-2"
                            >
                                {whyChooseUs.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.07 }}
                                        className="flex gap-4 p-5 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                                    >
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

                {/* ── DIRECTOR ── */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-14"
                        >
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <div className="h-px w-8 bg-burgundy" />
                                <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Leadership</span>
                                <div className="h-px w-8 bg-burgundy" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">Meet Our Director</h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                                {/* Photo */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                                        <Image
                                            src="/images/directers/pasan.png"
                                            alt="Mr. Pasan Wickramathanthri"
                                            width={128}
                                            height={128}
                                            className="object-cover object-top w-full h-full"
                                        />
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center md:text-left space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Mr. Pasan Wickramathanthri</h3>
                                        <p className="text-sm text-burgundy font-semibold mt-1">Director — Global Tech (Pvt) Ltd</p>
                                    </div>
                                    <div className="h-px w-10 bg-gray-200 mx-auto md:mx-0" />
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Under the leadership of Director Pasan, Global Tech (Pvt) Ltd delivers cutting-edge technology
                                        solutions that empower businesses to innovate, optimize, and grow.
                                    </p>
                                    <Link
                                        href="https://www.linkedin.com/in/pasan-dileepa-457ab7131/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-burgundy hover:text-burgundy-800 font-medium transition-colors"
                                    >
                                        Connect on LinkedIn <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── CONTACT ── */}
                <section id="contact" className="py-16 md:py-24 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="space-y-10"
                        >
                            <div>
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-px w-8 bg-burgundy" />
                                    <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy">Get Started</span>
                                    <div className="h-px w-8 bg-burgundy" />
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Ready to Upgrade Your Business Technology?
                                </h2>
                                <p className="text-gray-500 max-w-xl mx-auto">
                                    From POS systems to full IT infrastructure — we deliver the right technology solutions for your business.
                                </p>
                            </div>

                            {/* Contact cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { icon: Phone, label: "Phone", value: "+94 11 216 0252", href: "tel:+94112160252" },
                                    { icon: Mail, label: "Email", value: "info@globalsoftsl.com", href: "mailto:info@globalsoftsl.com" },
                                    { icon: MapPin, label: "Address", value: "22/20 Yahampath Mawatha, Maharagama", href: "https://share.google/1aP2fDU4AXd1WB2AJ" },
                                ].map((contact) => (
                                    <motion.a
                                        key={contact.label}
                                        href={contact.href}
                                        target={contact.label === "Address" ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3 }}
                                        className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-burgundy/30 hover:shadow-md transition-all duration-300 bg-white"
                                    >
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

                            <Link
                                href="/#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy hover:bg-burgundy-800 text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-sm shadow-burgundy/20"
                            >
                                Send Us a Message <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
