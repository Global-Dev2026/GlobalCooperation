"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase,
    MapPin,
    Clock,
    DollarSign,
    X,
    Check,
    ChevronRight,
} from "lucide-react";

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
    salary: string | null;
}

export default function Careers() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [applicationForm, setApplicationForm] = useState({
        name: "",
        email: "",
        resumeUrl: "",
        coverLetter: ""
    });
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | { success: false; message: "" }>({ success: false, message: "" });

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: "" });

        try {
            const response = await fetch("/api/jobs/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobId: selectedJob?.id,
                    ...applicationForm
                })
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({ success: true, message: "Application submitted successfully! We'll be in touch." });
                setTimeout(() => {
                    setIsApplying(false);
                    setSelectedJob(null);
                    setApplicationForm({ name: "", email: "", resumeUrl: "", coverLetter: "" });
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

    // Fetch jobs on mount
    useEffect(() => {
        fetchJobs();
    }, []);

    // Filter jobs when filters change
    useEffect(() => {
        let filtered = jobs;

        if (selectedDepartment !== "all") {
            filtered = filtered.filter((job) => job.department === selectedDepartment);
        }
        if (selectedLocation !== "all") {
            filtered = filtered.filter((job) => job.location === selectedLocation);
        }
        if (selectedType !== "all") {
            filtered = filtered.filter((job) => job.type === selectedType);
        }

        setFilteredJobs(filtered);
    }, [jobs, selectedDepartment, selectedLocation, selectedType]);

    const fetchJobs = async () => {
        try {
            const response = await fetch("/api/jobs");
            const data = await response.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterJobs = () => {
        let filtered = jobs;

        if (selectedDepartment !== "all") {
            filtered = filtered.filter((job) => job.department === selectedDepartment);
        }
        if (selectedLocation !== "all") {
            filtered = filtered.filter((job) => job.location === selectedLocation);
        }
        if (selectedType !== "all") {
            filtered = filtered.filter((job) => job.type === selectedType);
        }

        setFilteredJobs(filtered);
    };

    const departments = ["all", ...Array.from(new Set(jobs.map((j) => j.department)))];
    const locations = ["all", ...Array.from(new Set(jobs.map((j) => j.location)))];
    const types = ["all", ...Array.from(new Set(jobs.map((j) => j.type)))];

    return (
        <section id="careers" className="py-24 bg-whisper relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-burgundy/5" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-gold/20 rotate-45" />
            <div className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-burgundy/10" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-6 py-2 bg-burgundy/10 text-burgundy rounded-full text-sm font-medium mb-6">
                        We&apos;re Hiring
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                        Join Our Team
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Build the future with Global Cooperation. We&apos;re looking for
                        talented individuals to join our growing team.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 space-y-4"
                >
                    {/* Department Filter */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">
                            Department
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedDepartment === dept
                                        ? "bg-burgundy text-white shadow-lg"
                                        : "bg-white border-2 border-burgundy/20 text-burgundy hover:border-burgundy hover:shadow-md"
                                        }`}
                                >
                                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location & Type Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Location
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {locations.map((loc) => (
                                    <button
                                        key={loc}
                                        onClick={() => setSelectedLocation(loc)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLocation === loc
                                            ? "bg-gold text-pure-black shadow-lg"
                                            : "bg-white border border-gold/30 text-slate-700 hover:border-gold hover:shadow-md"
                                            }`}
                                    >
                                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Job Type
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {types.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setSelectedType(t)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === t
                                            ? "bg-gold text-pure-black shadow-lg"
                                            : "bg-white border border-gold/30 text-slate-700 hover:border-gold hover:shadow-md"
                                            }`}
                                    >
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Job Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-burgundy border-t-transparent" />
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-burgundy/10"
                    >
                        <Briefcase className="w-16 h-16 text-burgundy/30 mx-auto mb-4" />
                        <p className="text-xl text-slate-600 font-medium">No open positions at the moment.</p>
                        <p className="text-slate-500 mt-2 max-w-md mx-auto">
                            We are constantly growing and will have exciting opportunities coming very soon. Please check back later!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredJobs.map((job, index) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                onClick={() => setSelectedJob(job)}
                                className="group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-burgundy/10 cursor-pointer"
                            >
                                {/* Department Badge */}
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-1 bg-burgundy text-white text-sm rounded-full">
                                        {job.department}
                                    </span>
                                </div>

                                {/* Job Title */}
                                <h3 className="text-2xl font-bold text-burgundy mb-4 pr-8">
                                    {job.title}
                                </h3>

                                {/* Job Meta */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin className="w-4 h-4 text-gold" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock className="w-4 h-4 text-gold" />
                                        {job.type}
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <DollarSign className="w-4 h-4 text-gold" />
                                            {job.salary}
                                        </div>
                                    )}
                                </div>

                                {/* View Details Button */}
                                <button className="w-full py-3 bg-burgundy hover:bg-gold text-white hover:text-pure-black rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 group-hover:shadow-lg">
                                    View Details
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Job Detail Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4"
                            onClick={() => setSelectedJob(null)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            >
                                {/* Modal Header */}
                                <div className="sticky top-0 bg-gradient-to-br from-burgundy to-burgundy-900 p-8 text-white rounded-t-3xl">
                                    <button
                                        onClick={() => setSelectedJob(null)}
                                        className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <h2 className="text-4xl font-bold mb-4 pr-12">{selectedJob.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-gold-100">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-5 h-5" />
                                            {selectedJob.department}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {selectedJob.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5" />
                                            {selectedJob.type}
                                        </div>
                                        {selectedJob.salary && (
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-5 h-5" />
                                                {selectedJob.salary}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-8 space-y-8">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-burgundy mb-4">
                                            About This Role
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {/* Responsibilities */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-burgundy mb-4">
                                            Key Responsibilities
                                        </h3>
                                        <ul className="space-y-3">
                                            {selectedJob.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-burgundy mb-4">
                                            Requirements
                                        </h3>
                                        <ul className="space-y-3">
                                            {selectedJob.requirements.map((req, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-burgundy mb-4">
                                            What We Offer
                                        </h3>
                                        <ul className="space-y-3">
                                            {selectedJob.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Apply Button */}
                                    <div className="pt-6">
                                        <button
                                            onClick={() => setIsApplying(true)}
                                            className="block w-full py-4 bg-burgundy hover:bg-gold text-white hover:text-pure-black rounded-full transition-all duration-300 font-bold text-lg text-center shadow-lg hover:shadow-xl"
                                        >
                                            Apply Now
                                        </button>
                                        <p className="text-sm text-slate-500 text-center mt-3">
                                            Applications are reviewed on a rolling basis
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Application Modal */}
            <AnimatePresence>
                {isApplying && selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsApplying(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto flex flex-col">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Apply for Position</h3>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Applying for <span className="font-semibold text-burgundy">{selectedJob.title}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsApplying(false)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-gray-400" />
                                    </button>
                                </div>

                                <div className="p-8">
                                    <form onSubmit={handleApplicationSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={applicationForm.name}
                                                    onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={applicationForm.email}
                                                    onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Resume / Portfolio URL</label>
                                            <input
                                                type="url"
                                                required
                                                value={applicationForm.resumeUrl}
                                                onChange={(e) => setApplicationForm({ ...applicationForm, resumeUrl: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                                                placeholder="https://linkedin.com/in/johndoe"
                                            />
                                            <p className="text-xs text-gray-500">Please provide a link to your LinkedIn profile, Portfolio, or Google Drive file.</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Cover Letter</label>
                                            <textarea
                                                rows={4}
                                                value={applicationForm.coverLetter}
                                                onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all resize-none"
                                                placeholder="Tell us why you're a great fit..."
                                            />
                                        </div>

                                        {submitStatus.message && (
                                            <div className={`p-4 rounded-xl text-sm font-medium ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                                }`}>
                                                {submitStatus.message}
                                            </div>
                                        )}

                                        <div className="pt-4 flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsApplying(false)}
                                                className="flex-1 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 px-6 py-3 rounded-full bg-burgundy text-white font-medium hover:bg-burgundy-dark transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>Submit Application <Check className="w-4 h-4" /></>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
