"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import { 
    Send, 
    Users, 
    Sparkles, 
    TrendingUp, 
    Star, 
    Briefcase, 
    Check, 
    GraduationCap, 
    Calendar, 
    MapPin, 
    ChevronRight,
    ArrowRight,
    Search,
    Brain,
    Rocket
} from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function InternshipPrograms() {
    return (
        <section className="relative overflow-hidden bg-white">
            {/* ── Background Elements ── */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#841818]/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E0BB20]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            {/* ── Hero Section ── */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold bg-[#841818]/10 text-[#841818] border border-[#841818]/20"
                            >
                                <Users className="w-4 h-4" />
                                Future Leaders Program
                            </motion.div>
                            
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight font-heading"
                            >
                                Build Your <span className="text-[#841818]">Future</span> <br className="hidden md:block" />
                                With <span className="text-[#E0BB20]">Industry Leaders</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-600 mb-10 leading-relaxed text-justify max-w-2xl mx-auto lg:mx-0"
                            >
                                Global Soft Solutions also welcomes collaboration with universities, higher education institutions, and professional training organizations that wish to provide their students with structured internship opportunities. Through these partnerships, we aim to strengthen industry–academia collaboration, provide practical exposure to students, and support institutions in fulfilling their internship and training requirements.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                <a
                                    href={`#apply-now`}
                                    className="px-8 py-4 bg-[#841818] text-white rounded-2xl font-bold shadow-2xl shadow-[#841818]/30 hover:shadow-[#841818]/50 hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    Apply Now <ArrowRight className="w-5 h-5" />
                                </a>
                                <a
                                    href="#details"
                                    className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                                >
                                    View Details
                                </a>
                            </motion.div>
                        </div>

                        <div className="flex-1 relative w-full max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="relative aspect-[4/3] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-[#841818]/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <NextImage 
                                    src="/images/Intern.png" 
                                    alt="Collaboration at Global" 
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </motion.div>
                            
                            {/* Floating Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ 
                                    opacity: 1, 
                                    x: 0,
                                    y: [0, -10, 0]
                                }}
                                transition={{ 
                                    delay: 0.5,
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="absolute -right-8 top-1/4 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">100+</p>
                                        <p className="text-xs text-gray-500">Alumni Hired</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ 
                                    opacity: 1, 
                                    x: 0, 
                                    y: [0, 10, 0]
                                }}
                                transition={{ 
                                    delay: 0.6,
                                    y: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                className="absolute -left-8 bottom-1/4 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Star className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">4.9/5</p>
                                        <p className="text-xs text-gray-500">Mentor Rating</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Key Highlights ── */}
            <div id="details" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Why Intern With Us?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We don&apos;t just offer internships; we provide a career-launching pad with hands-on guidance and real impact.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Brain className="w-6 h-6" />,
                                title: "Mentorship",
                                desc: "Learn from senior experts with 1-on-1 guidance.",
                                color: "blue"
                            },
                            {
                                icon: <Rocket className="w-6 h-6" />,
                                title: "Real Impact",
                                desc: "Work on products that reach thousands of users.",
                                color: "amber"
                            },
                            {
                                icon: <Star className="w-6 h-6" />,
                                title: "Skill Building",
                                desc: "Access premium training and internal tech talks.",
                                color: "emerald"
                            },
                            {
                                icon: <Briefcase className="w-6 h-6" />,
                                title: "Career Path",
                                desc: "Top performers get fast-tracked for full-time roles.",
                                color: "purple"
                            }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : stat.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' : stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'}`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{stat.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content Grid: Wrapped in Unified Container ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#eceef1]/80 backdrop-blur-xl border border-white/20 rounded-[4rem] p-8 md:p-16 lg:p-20 shadow-2xl shadow-gray-200/40 relative overflow-hidden"
                >
                    {/* Subtle Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#841818]/10 to-transparent" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                        
                        <div className="lg:col-span-8 space-y-20">
                            {/* ── Eligibility: Re-imagined ── */}
                            <motion.section 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={containerVariants}
                                className="relative"
                            >
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#841818] to-[#5a0f0f] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#841818]/20">
                                        <GraduationCap className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Eligibility Criteria</h3>
                                        <p className="text-sm text-gray-500 font-medium">What we look for in our future leaders</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { text: "Undergraduate students or recent graduates", icon: <Users /> },
                                        { text: "Fields such as IT, Software Development, Business, or Marketing", icon: <Briefcase /> },
                                        { text: "Strong communication skills in English", icon: <Check /> },
                                        { text: "Basic computer literacy & adaptive mindset", icon: <Sparkles /> }
                                    ].map((req, i) => (
                                        <motion.div 
                                            key={i} 
                                            variants={itemVariants}
                                            className="group relative flex gap-5 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden"
                                        >
                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#841818] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50 text-[#841818] group-hover:bg-[#841818] group-hover:text-white transition-all duration-500">
                                                {req.icon && <div className="w-5 h-5">{req.icon}</div>}
                                            </div>
                                            <p className="text-gray-700 font-bold text-sm leading-relaxed pt-1.5">{req.text}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* ── Internship Areas: Premium Grid ── */}
                            <motion.section 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={containerVariants}
                            >
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#E0BB20] to-[#c9a71b] text-[#841818] rounded-2xl flex items-center justify-center shadow-lg shadow-[#E0BB20]/20">
                                        <Search className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Internship Areas</h3>
                                        <p className="text-sm text-gray-500 font-medium">Explore professional pathways</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        "Software Development",
                                        "Web Development",
                                        "Digital Marketing",
                                        "Business Administration",
                                        "Finance & Accounting",
                                        "Customer Support / Operations"
                                    ].map((area, i) => (
                                        <motion.div 
                                            key={i} 
                                            variants={itemVariants}
                                            className="group px-6 py-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#E0BB20] hover:bg-gray-50 transition-all flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-2 h-2 rounded-full bg-[#E0BB20] group-hover:scale-150 transition-transform" />
                                                <span className="font-extrabold text-gray-800 text-sm">{area}</span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#E0BB20] group-hover:translate-x-1 transition-all" />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        </div>

                        {/* ── Applications Sidebar: Brand Aligned ── */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                id="apply-now"
                                className="lg:sticky lg:top-32 bg-gradient-to-br from-[#841818] to-[#5a0f0f] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/10"
                            >
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#E0BB20]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="relative z-10">
                                    <h4 className="text-3xl font-black mb-8 italic tracking-tight">Apply Now</h4>
                                    
                                    <div className="space-y-6 mb-10">
                                        {[
                                            { label: "Duration", val: "3 – 6 Months", sub: "Base on requirements", icon: <Calendar className="w-5 h-5" /> },
                                            { label: "Location", val: SITE_CONFIG.address, icon: <MapPin className="w-5 h-5" /> },
                                            { label: "Submission", val: "Via Email", icon: <Send className="w-5 h-5" /> }
                                        ].map((info, idx) => (
                                            <div key={idx} className="flex gap-4 group/item">
                                                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#E0BB20]/20 transition-colors">
                                                    <div className="text-[#E0BB20]">
                                                        {info.icon}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">{info.label}</p>
                                                    <p className="font-bold text-sm leading-relaxed">{info.val}</p>
                                                    {info.sub && <p className="text-[10px] text-white/30 mt-1">{info.sub}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="mailto:jobs@globalsoftsl.com?subject=Internship Application"
                                        className="w-full py-5 bg-[#E0BB20] hover:bg-white text-[#841818] rounded-2xl font-black text-center text-lg shadow-xl shadow-black/20 transition-all block active:scale-95"
                                    >
                                        Apply via Email
                                    </a>
                                    
                                    <p className="text-center text-white/40 text-[10px] mt-6 leading-relaxed px-4 font-medium">
                                        Include your resume and mention your field of interest in the subject.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </div>


        </section>
    );
}
