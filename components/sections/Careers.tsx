"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    X,
    Check,
    ChevronRight,
    ArrowUpRight,
    Send,
    Sparkles,
    Users,
    TrendingUp,
    Star,
    Brain,
    Rocket,
    ArrowRight,
    Search,
    GraduationCap
} from "lucide-react";
import Captcha from "@/components/ui/Captcha";
import { SITE_CONFIG } from "@/lib/constants";

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    salary?: string | null;
}

const DEPT_PALETTE: Record<string, { accent: string; light: string; border: string; label: string }> = {
    "Finance & Accounts": { accent: "#065f46", light: "#d1fae5", border: "#a7f3d0", label: "text-emerald-800" },
    "Administration": { accent: "#5b21b6", light: "#ede9fe", border: "#ddd6fe", label: "text-violet-800" },
    "Technical Support": { accent: "#1d4ed8", light: "#dbeafe", border: "#bfdbfe", label: "text-blue-800" },
    "Operations": { accent: "#b45309", light: "#fef3c7", border: "#fde68a", label: "text-amber-800" },
    "Sales & Marketing": { accent: "#9f1239", light: "#ffe4e6", border: "#fecdd3", label: "text-rose-800" },
    "Human Resources": { accent: "#86198f", light: "#fae8ff", border: "#f0abfc", label: "text-fuchsia-800" },
    "all": { accent: "#841818", light: "#fef2f2", border: "#fecaca", label: "text-red-800" },
};

function getPalette(dept: string) {
    return DEPT_PALETTE[dept] ?? DEPT_PALETTE["all"];
}

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

export default function Careers({ initialJobs }: { initialJobs: Job[] }) {
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isApplying, setIsApplying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationForm, setApplicationForm] = useState({
        name: "", email: "", resume: null as File | null, coverLetter: ""
    });
    const [captchaValue, setCaptchaValue] = useState("");
    const [userCaptchaInput, setUserCaptchaInput] = useState("");
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | { success: false; message: "" }>({ success: false, message: "" });

    const filteredJobs = useMemo(() => {
        let filtered = initialJobs;
        if (selectedDepartment !== "all") filtered = filtered.filter(j => j.department === selectedDepartment);
        if (selectedLocation !== "all") filtered = filtered.filter(j => j.location === selectedLocation);
        if (selectedType !== "all") filtered = filtered.filter(j => j.type === selectedType);
        return filtered;
    }, [initialJobs, selectedDepartment, selectedLocation, selectedType]);

    const departments = useMemo(() => ["all", ...Array.from(new Set(initialJobs.map(j => j.department)))], [initialJobs]);

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (userCaptchaInput.toLowerCase() !== captchaValue.toLowerCase()) {
            setSubmitStatus({ success: false, message: "Invalid CAPTCHA. Please try again." });
            return;
        }

        if (!applicationForm.name.trim()) {
            setSubmitStatus({ success: false, message: "Full Name is required." });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!applicationForm.email.trim()) {
            setSubmitStatus({ success: false, message: "Email Address is required." });
            return;
        } else if (!emailRegex.test(applicationForm.email)) {
            setSubmitStatus({ success: false, message: "Please enter a valid email address." });
            return;
        }

        if (!applicationForm.resume) {
            setSubmitStatus({ success: false, message: "Resume file is required." });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: "" });
        try {
            const formData = new FormData();
            formData.append("jobId", selectedJob?.id || "");
            formData.append("name", applicationForm.name);
            formData.append("email", applicationForm.email);
            formData.append("coverLetter", applicationForm.coverLetter);
            if (applicationForm.resume) formData.append("resume", applicationForm.resume);

            const response = await fetch("/api/jobs/apply", { method: "POST", body: formData });
            const data = await response.json();

            if (data.success) {
                setSubmitStatus({ success: true, message: "Application submitted successfully! We'll be in touch." });
                setTimeout(() => {
                    setIsApplying(false);
                    setSelectedJob(null);
                    setApplicationForm({ name: "", email: "", resume: null, coverLetter: "" });
                    setUserCaptchaInput("");
                    setSubmitStatus({ success: false, message: "" });
                }, 2000);
            } else {
                setSubmitStatus({ success: false, message: data.message || "Something went wrong. Please try again." });
            }
        } catch (error) {
            setSubmitStatus({ success: false, message: "Failed to submit application. Please check your connection." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="careers" className="relative overflow-hidden bg-white">
            
            {/* ── Background Elements ── */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#841818]/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#E0BB20]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

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
                                <Sparkles className="w-4 h-4" />
                                Career Opportunities
                            </motion.div>
                            
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight font-heading"
                            >
                                Work With <span className="text-[#841818]">Purpose</span> <br className="hidden md:block" />
                                Build The <span className="text-[#E0BB20]">Future</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl text-gray-600 mb-10 leading-relaxed text-justify max-w-2xl mx-auto lg:mx-0"
                            >
                                Join a global ecosystem of innovation and excellence. We&apos;re looking for passionate individuals who are ready to push boundaries, solve complex problems, and create lasting impact across industries.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            >
                                <a
                                    href="#open-roles"
                                    className="px-8 py-4 bg-[#841818] text-white rounded-2xl font-bold shadow-2xl shadow-[#841818]/30 hover:shadow-[#841818]/50 hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    View Open Roles <ChevronRight className="w-5 h-5" />
                                </a>
                                <Link
                                    href="/careers/internships"
                                    className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2"
                                >
                                    Internship Programs <ArrowRight className="w-5 h-5" />
                                </Link>
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
                                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Careers at Global" 
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </motion.div>
                            
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
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">12+</p>
                                        <p className="text-xs text-gray-500">Departments</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Culture Highlights ── */}
            <div className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Culture</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We foster an environment where growth, innovation, and collaboration are part of our DNA.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Brain className="w-6 h-6" />,
                                title: "Growth Mindset",
                                desc: "Continuous learning and professional development resources.",
                                color: "blue"
                            },
                            {
                                icon: <Rocket className="w-6 h-6" />,
                                title: "Innovate Daily",
                                desc: "Empowering every employee to share and build new ideas.",
                                color: "amber"
                            },
                            {
                                icon: <Star className="w-6 h-6" />,
                                title: "Global Impact",
                                desc: "Work on solutions that scale across international markets.",
                                color: "emerald"
                            },
                            {
                                icon: <TrendingUp className="w-6 h-6" />,
                                title: "Career Growth",
                                desc: "Fast-tracked pathways for high performers and leaders.",
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

            {/* ── Role Board with Tinted Background ── */}
            <div id="open-roles" className="relative bg-[#f8fafc] py-24 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Open Roles</h2>
                        <p className="text-gray-500">Discover your next career move among our available positions.</p>
                    </div>

                    {/* Department filter tabs */}
                    {initialJobs.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {departments.map((dept) => {
                                const active = selectedDepartment === dept;
                                const p = getPalette(dept);
                                return (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDepartment(dept)}
                                        className="px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300"
                                        style={active
                                            ? { background: p.accent, color: "#fff", boxShadow: `0 8px 16px ${p.accent}30` }
                                            : { background: "#f3f4f6", color: "#4b5563" }
                                        }
                                    >
                                        {dept === "all" ? "All Roles" : dept}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Job grid */}
                {filteredJobs.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200"
                    >
                        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Roles</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Try adjusting your filters to see more results.</p>
                        <button
                            onClick={() => setSelectedDepartment("all")}
                            className="px-8 py-3 bg-[#841818] text-white rounded-2xl font-bold transition-all"
                        >
                            Reset Selection
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.map((job, idx) => {
                            const p = getPalette(job.department);
                            return (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -12 }}
                                    onClick={() => setSelectedJob(job)}
                                    className="group relative bg-white rounded-[2.5rem] p-10 border-2 border-gray-200 cursor-pointer transition-all duration-500 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)]"
                                >
                                    {/* Advanced Hover Glow */}
                                    <div 
                                        className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-500" 
                                        style={{ 
                                            background: `linear-gradient(145deg, ${p.accent}05, ${p.accent}15)`,
                                            border: `2px solid ${p.accent}30`,
                                            boxShadow: `inset 0 0 20px ${p.accent}10`
                                        }} 
                                    />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-xs font-black px-5 py-2 rounded-xl uppercase tracking-[0.15em] border transition-all duration-300 group-hover:border-transparent group-hover:shadow-md"
                                                style={{ background: p.light, color: p.accent, borderColor: `${p.accent}20` }}>
                                                {job.department}
                                            </span>
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-[#841818] group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                                <ArrowUpRight className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-[#841818] transition-colors leading-[1.3] line-clamp-2 min-h-[4rem]">
                                            {job.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 mb-10">
                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-[#841818]/10 transition-colors">
                                                <MapPin className="w-4 h-4 text-[#841818]" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-3 text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-[#841818]/10 transition-colors">
                                                <Clock className="w-4 h-4 text-[#841818]" />
                                                {job.type}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#841818] opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0">Next Step</span>
                                                <span className="text-sm font-black text-gray-900 transition-all group-hover:ml-1">View Details</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-[#841818] scale-0 group-hover:scale-110 transition-all origin-right">
                                                <div className="w-8 h-8 rounded-full border border-[#841818]/20 flex items-center justify-center">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
            </div>

            {/* ── Compact & Brand-Aligned Internship CTA ── */}
            <div className="bg-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative group rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#841818] to-[#5a0f0f] shadow-[0_30px_60px_-12px_rgba(132,24,24,0.2)] border-2 border-gray-100"
                    >
                        {/* Subtle Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-14">
                            {/* Left Content: More Compact */}
                            <div className="flex-1 text-left">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[10px] font-black bg-[#E0BB20] text-[#841818] uppercase tracking-[0.2em] shadow-lg shadow-[#E0BB20]/10"
                                >
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    Future Leaders
                                </motion.div>
                                
                                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                                    Start Your <span className="text-[#E0BB20]">Journey</span> as an Intern
                                </h3>
                                
                                <p className="text-lg text-white/50 mb-8 leading-relaxed max-w-lg">
                                    Ready to bridge the gap between academia and industry? Join our ecosystem of innovation.
                                </p>

                                <div className="flex items-center gap-6">
                                    <Link
                                        href="/careers/internships"
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#841818] rounded-xl font-black hover:bg-[#E0BB20] transition-all group/btn shadow-xl"
                                    >
                                        Explore Programs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Right List: Smaller Grid */}
                            <div className="flex-1 grid grid-cols-2 gap-3 max-w-sm">
                                {[
                                    { title: "Mentorship", icon: <Users className="w-4 h-4" /> },
                                    { title: "Impact", icon: <Rocket className="w-4 h-4" /> },
                                    { title: "Skills", icon: <Brain className="w-4 h-4" /> },
                                    { title: "Pathways", icon: <Star className="w-4 h-4" /> }
                                ].map((feature, i) => (
                                    <div
                                        key={feature.title}
                                        className="bg-white/10 backdrop-blur-sm border border-white/5 p-4 rounded-2xl flex items-center gap-3 group/card transition-all"
                                    >
                                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-[#E0BB20]">
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm font-bold text-white">{feature.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Job Detail Modal ── */}
            <AnimatePresence>
                {selectedJob && (() => {
                    const p = getPalette(selectedJob.department);
                    return (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                                className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-[6px]"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                                className="fixed inset-0 flex items-center justify-center z-[110] p-4 pointer-events-none"
                            >
                                <div
                                    onClick={e => e.stopPropagation()}
                                    className="relative bg-white rounded-[3rem] max-w-5xl w-full max-h-[92vh] overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
                                >
                                    {/* Header Section */}
                                    <div className="sticky top-0 z-20 bg-white px-10 py-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="max-w-2xl">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"
                                                    style={{ background: p.light, color: p.accent, border: `1px solid ${p.accent}20` }}>
                                                    {selectedJob.department}
                                                </span>
                                                <span className="text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest bg-gray-100 text-gray-600">
                                                    {selectedJob.type}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{selectedJob.title}</h2>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                                            className="absolute top-8 right-8 w-12 h-12 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Scrollable Content */}
                                    <div className="overflow-y-auto flex-1 p-10">
                                        {!isApplying ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                                <div className="lg:col-span-8 space-y-12">
                                                    <section>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                                            <div className="w-1.5 h-6 rounded-full" style={{ background: p.accent }} />
                                                            Role Overview
                                                        </h3>
                                                        <p className="text-gray-600 leading-relaxed text-lg">{selectedJob.description}</p>
                                                    </section>

                                                    <section>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                                            <div className="w-1.5 h-6 rounded-full" style={{ background: p.accent }} />
                                                            Responsibilities
                                                        </h3>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {selectedJob.responsibilities.map((resp, i) => (
                                                                <div key={i} className="flex gap-4 p-5 rounded-2xl text-md text-gray-700 items-start border border-gray-100 hover:border-gray-200 transition-colors">
                                                                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                                                        style={{ background: p.light }}>
                                                                        <Check className="w-3.5 h-3.5" style={{ color: p.accent }} />
                                                                    </div>
                                                                    {resp}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>

                                                    <section>
                                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                                            <div className="w-1.5 h-6 rounded-full" style={{ background: p.accent }} />
                                                            Requirements
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {selectedJob.requirements.map((req, i) => (
                                                                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-gray-600 text-sm font-medium">
                                                                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.accent }} />
                                                                    {req}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                </div>

                                                <div className="lg:col-span-4">
                                                    <div className="sticky top-0 bg-gray-50 rounded-[3rem] p-8 space-y-8 border border-gray-100">
                                                        <h4 className="text-xl font-black text-gray-900">Key Information</h4>
                                                        <div className="space-y-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                                                    <MapPin className="w-6 h-6" style={{ color: p.accent }} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 uppercase font-black">Location</p>
                                                                    <p className="font-bold text-gray-900">{selectedJob.location}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                                                    <Clock className="w-6 h-6" style={{ color: p.accent }} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 uppercase font-black">Contract</p>
                                                                    <p className="font-bold text-gray-900">{selectedJob.type}</p>
                                                                </div>
                                                            </div>
                                                            {selectedJob.salary && (
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                                                                        <DollarSign className="w-6 h-6" style={{ color: p.accent }} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-400 uppercase font-black">Budget</p>
                                                                        <p className="font-bold text-gray-900">{selectedJob.salary}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={() => setIsApplying(true)}
                                                            className="w-full py-5 rounded-[1.5rem] font-bold text-white shadow-2xl transition-all hover:-translate-y-1 block text-center"
                                                            style={{ background: p.accent, boxShadow: `0 10px 30px ${p.accent}30` }}
                                                        >
                                                            Apply Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-2xl mx-auto py-8">
                                                <div className="flex items-center justify-between mb-12">
                                                    <div>
                                                        <h3 className="text-3xl font-black text-gray-900">Application Form</h3>
                                                        <p className="text-gray-500 mt-2">Personalize your application below.</p>
                                                    </div>
                                                    <button
                                                        onClick={() => setIsApplying(false)}
                                                        className="px-6 py-3 bg-gray-100 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-2xl transition-all"
                                                    >
                                                        ← Back
                                                    </button>
                                                </div>

                                                <form onSubmit={handleApplicationSubmit} className="space-y-8">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
                                                            <input
                                                                type="text" required
                                                                value={applicationForm.name}
                                                                onChange={e => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#841818]/20 focus:ring-4 focus:ring-[#841818]/5 outline-none transition-all font-medium"
                                                                placeholder="Sineth Dinsara"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-bold text-gray-700 ml-1">Email *</label>
                                                            <input
                                                                type="email" required
                                                                value={applicationForm.email}
                                                                onChange={e => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#841818]/20 focus:ring-4 focus:ring-[#841818]/5 outline-none transition-all font-medium"
                                                                placeholder="sineth@example.com"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-gray-700 ml-1">Resume (PDF) *</label>
                                                        <div className="relative">
                                                            <input
                                                                type="file" accept=".pdf" required
                                                                onChange={e => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
                                                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-dashed border-gray-300 hover:border-[#841818]/40 cursor-pointer text-sm font-medium file:hidden transition-all"
                                                            />
                                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none px-4 py-2 bg-white rounded-xl shadow-sm text-xs font-black text-[#841818] uppercase">
                                                                {applicationForm.resume ? "Selected ✓" : "Upload File"}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold text-gray-700 ml-1">Cover Letter (Optional)</label>
                                                        <textarea
                                                            rows={5}
                                                            value={applicationForm.coverLetter}
                                                            onChange={e => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#841818]/20 focus:ring-4 focus:ring-[#841818]/5 outline-none transition-all font-medium resize-none"
                                                            placeholder="Tell us why you are the best fit for this role..."
                                                        />
                                                    </div>

                                                    <div className="space-y-4 bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                                                        <label className="text-sm font-bold text-gray-700 mb-4 block">Security Check *</label>
                                                        <div className="flex flex-col sm:flex-row gap-6">
                                                            <Captcha onChange={setCaptchaValue} onRefresh={() => setUserCaptchaInput("")} />
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text" required
                                                                    value={userCaptchaInput}
                                                                    onChange={e => setUserCaptchaInput(e.target.value)}
                                                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-4 focus:ring-[#841818]/5 outline-none transition-all font-bold"
                                                                    placeholder="Type Capcha"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {submitStatus.message && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                                            className={`p-5 rounded-2xl text-center font-bold text-sm ${submitStatus.success ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}
                                                        >
                                                            {submitStatus.message}
                                                        </motion.div>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all shadow-2xl ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-black hover:-translate-y-1 shadow-gray-900/30"}`}
                                                    >
                                                        {isSubmitting ? "Sending..." : "Submit Application"}
                                                    </button>
                                                </form>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    );
                })()}
            </AnimatePresence>
        </section>
    );
}
