"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import Captcha from "@/components/ui/Captcha";

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

/* ── Per-department color palette that complements burgundy + gold ── */
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

    // Filter jobs derived from initialJobs — no client-side fetch needed
    const filteredJobs = useMemo(() => {
        let filtered = initialJobs;
        if (selectedDepartment !== "all") filtered = filtered.filter(j => j.department === selectedDepartment);
        if (selectedLocation !== "all") filtered = filtered.filter(j => j.location === selectedLocation);
        if (selectedType !== "all") filtered = filtered.filter(j => j.type === selectedType);
        return filtered;
    }, [initialJobs, selectedDepartment, selectedLocation, selectedType]);

    const departments = useMemo(() => ["all", ...Array.from(new Set(initialJobs.map(j => j.department)))], [initialJobs]);
    const locations   = useMemo(() => ["all", ...Array.from(new Set(initialJobs.map(j => j.location)))],   [initialJobs]);
    const types       = useMemo(() => ["all", ...Array.from(new Set(initialJobs.map(j => j.type)))],       [initialJobs]);

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
        <section id="careers" className="relative overflow-hidden bg-[#FAFAFA]">

            {/* ── Drifting blobs matching site style ── */}
            <div className="absolute top-1/4 -left-20  w-96 h-96 bg-[#841818]/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E0BB20]/5 rounded-full blur-[120px] animate-pulse delay-1000 pointer-events-none" />

            {/* ── Hero: Burgundy gradient banner ── */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#841818] to-[#5a0f0f] pt-40 pb-24 px-4 sm:px-6 lg:px-8">
                {/* Noise texture */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#E0BB20]/10 blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
                        style={{ background: "rgba(224,187,32,0.2)", border: "1px solid rgba(224,187,32,0.4)", color: "#E0BB20" }}
                    >
                        <Sparkles className="w-4 h-4" />
                        Career Opportunities
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight font-montserrat"
                    >
                        Work with{" "}
                        <span className="text-[#E0BB20]">Purpose</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
                    >
                        Join a global ecosystem of innovation and excellence. We&apos;re looking for passionate individuals to help us build the future.
                    </motion.p>


                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* Department filter tabs */}
                {initialJobs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10 flex flex-wrap gap-2"
                    >
                        {departments.map((dept) => {
                            const active = selectedDepartment === dept;
                            const p = getPalette(dept);
                            return (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                                    style={active
                                        ? { background: p.accent, color: "#fff", boxShadow: `0 4px 14px ${p.accent}50` }
                                        : { background: "#fff", border: "1px solid #e5e7eb", color: "#374151" }
                                    }
                                >
                                    {dept === "all" ? "All Roles" : dept}
                                </button>
                            );
                        })}
                    </motion.div>
                )}

                {/* Job grid */}
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/5">
                        <div className="w-20 h-20 bg-[#841818]/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-10 h-10 text-[#841818]/40" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Roles</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn&apos;t find any positions matching your current filters.</p>
                        <button
                            onClick={() => { setSelectedDepartment("all"); setSelectedLocation("all"); setSelectedType("all"); }}
                            className="px-8 py-3 bg-[#841818] hover:bg-[#5a0f0f] text-white rounded-2xl font-bold transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job, idx) => {
                            const p = getPalette(job.department);
                            return (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ delay: idx * 0.07, duration: 0.4 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    onClick={() => setSelectedJob(job)}
                                    className="group relative bg-gray-50 rounded-2xl p-6 border-4 border-gray-300 shadow-[0_4px_24px_rgba(148,163,184,0.25)] hover:shadow-[0_8px_32px_rgba(148,163,184,0.45)] cursor-pointer flex flex-col overflow-hidden transition-all duration-300"
                                >
                                    {/* Hover glow overlay */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ background: `radial-gradient(ellipse at top left, ${p.accent}0d, transparent 65%)` }} />

                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4 mt-2 relative z-10">
                                        <span className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                                            style={{ background: p.light, color: p.accent, border: `1px solid ${p.border}` }}>
                                            {job.department}
                                        </span>
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                                            style={{ background: p.light, color: p.accent }}>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-2 flex-grow relative z-10">
                                        {job.title}
                                    </h3>

                                    {/* Meta */}
                                    <div className="space-y-2 mb-5 relative z-10">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: p.accent }} />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: p.accent }} />
                                            {job.type}
                                        </div>
                                        {job.salary && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <DollarSign className="w-3.5 h-3.5 flex-shrink-0" style={{ color: p.accent }} />
                                                {job.salary}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 relative z-10">
                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">View Details</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" style={{ color: p.accent }} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
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
                                className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-[3px]"
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
                                    className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
                                    style={{ border: `1px solid ${p.border}` }}
                                >
                                    {/* Colored top strip */}
                                    <div className="h-1.5 flex-shrink-0 rounded-t-3xl" style={{ background: p.accent }} />

                                    {/* Sticky header */}
                                    <div className="sticky top-0 z-20 flex-shrink-0 bg-white px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 pr-20">
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                                                    style={{ background: p.light, color: p.accent, border: `1px solid ${p.border}` }}>
                                                    {selectedJob.department}
                                                </span>
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider bg-gray-100 text-gray-600">
                                                    {selectedJob.type}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">{selectedJob.title}</h2>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedJob(null); setIsApplying(false); }}
                                            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Scrollable body */}
                                    <div className="overflow-y-auto flex-1 p-8">
                                        {!isApplying ? (
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                                {/* Left: details */}
                                                <div className="lg:col-span-2 space-y-10">
                                                    <section>
                                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                            <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accent }} />
                                                            About the Role
                                                        </h3>
                                                        <p className="text-gray-600 leading-relaxed text-sm">{selectedJob.description}</p>
                                                    </section>

                                                    <section>
                                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                            <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accent }} />
                                                            Key Responsibilities
                                                        </h3>
                                                        <ul className="space-y-3">
                                                            {selectedJob.responsibilities.map((resp, i) => (
                                                                <li key={i} className="flex gap-3 p-4 rounded-xl text-sm text-gray-700 items-start border border-gray-100 hover:bg-gray-50 transition-colors">
                                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                                                        style={{ background: p.light }}>
                                                                        <Check className="w-3 h-3" style={{ color: p.accent }} />
                                                                    </div>
                                                                    {resp}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>

                                                    <section>
                                                        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                            <span className="w-1 h-5 rounded-full inline-block" style={{ background: p.accent }} />
                                                            What You Bring
                                                        </h3>
                                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {selectedJob.requirements.map((req, i) => (
                                                                <li key={i} className="flex gap-3 text-gray-600 text-sm items-start border border-gray-100 p-3 rounded-xl bg-gray-50/50">
                                                                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: p.accent }} />
                                                                    {req}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                </div>

                                                {/* Right: sidebar */}
                                                <div className="lg:col-span-1">
                                                    <div className="sticky top-4 rounded-2xl p-6 border border-gray-100 space-y-5"
                                                        style={{ background: p.light, borderColor: p.border }}>
                                                        <h4 className="font-bold text-gray-900 text-sm">Role Details</h4>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                                                                    <MapPin className="w-4 h-4" style={{ color: p.accent }} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Location</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{selectedJob.location}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                                                                    <Clock className="w-4 h-4" style={{ color: p.accent }} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Schedule</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{selectedJob.type}</p>
                                                                </div>
                                                            </div>
                                                            {selectedJob.salary && (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-sm">
                                                                        <DollarSign className="w-4 h-4" style={{ color: p.accent }} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Compensation</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{selectedJob.salary}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="pt-5 border-t border-white/60">
                                                            <button
                                                                onClick={() => setIsApplying(true)}
                                                                className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                                                style={{ background: p.accent }}
                                                            >
                                                                <Send className="w-4 h-4" />
                                                                Apply Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="animate-in fade-in duration-300 max-w-2xl mx-auto">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h3 className="text-xl font-bold text-gray-900">Application Form</h3>
                                                    <button
                                                        onClick={() => setIsApplying(false)}
                                                        className="px-4 py-2 bg-gray-100 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
                                                    >
                                                        ← Back to Details
                                                    </button>
                                                </div>

                                                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="text" required
                                                                value={applicationForm.name}
                                                                onChange={e => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 text-sm font-medium transition-all"
                                                                style={{ "--tw-ring-color": `${p.accent}33` } as React.CSSProperties}
                                                                placeholder="John Doe"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                                                            <input
                                                                type="email" required
                                                                value={applicationForm.email}
                                                                onChange={e => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 text-sm font-medium transition-all"
                                                                placeholder="john@example.com"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-gray-700">Resume (PDF, Max 2MB) <span className="text-red-500">*</span></label>
                                                        <div className="relative group/file">
                                                            <input
                                                                type="file" accept=".pdf" required
                                                                onChange={e => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
                                                                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-gray-300 cursor-pointer text-sm font-medium file:hidden"
                                                            />
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-semibold bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-gray-600 group-hover/file:bg-gray-200 transition-colors">
                                                                {applicationForm.resume ? "✓ Selected" : "Choose File"}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-gray-700">Cover Letter <span className="font-normal text-gray-400">(Optional)</span></label>
                                                        <textarea
                                                            rows={4}
                                                            value={applicationForm.coverLetter}
                                                            onChange={e => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 text-sm font-medium resize-none transition-all"
                                                            placeholder="Briefly explain your suitability for the role..."
                                                        />
                                                    </div>

                                                    <div className="space-y-4 pt-2">
                                                        <label className="text-sm font-semibold text-gray-700 block">Security Verification <span className="text-red-500">*</span></label>
                                                        <div className="flex flex-col sm:flex-row gap-4">
                                                            <Captcha onChange={setCaptchaValue} onRefresh={() => setUserCaptchaInput("")} />
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text"
                                                                    required
                                                                    value={userCaptchaInput}
                                                                    onChange={e => setUserCaptchaInput(e.target.value)}
                                                                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 text-sm font-medium transition-all"
                                                                    style={{ "--tw-ring-color": `${p.accent}33` } as React.CSSProperties}
                                                                    placeholder="Enter characters"
                                                                />
                                                            </div>
                                                        </div>
                                                        <p className="text-[11px] text-gray-400">Please enter the characters exactly as shown above to prove you are human.</p>
                                                    </div>

                                                    {submitStatus.message && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                                            className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${submitStatus.success ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                                                        >
                                                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${submitStatus.success ? "bg-green-100" : "bg-red-100"}`}>
                                                                {submitStatus.success ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                            </div>
                                                            {submitStatus.message}
                                                        </motion.div>
                                                    )}

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
                                                        style={{ background: p.accent }}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                                Processing…
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Send className="w-4 h-4" />
                                                                Submit Application
                                                            </>
                                                        )}
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
