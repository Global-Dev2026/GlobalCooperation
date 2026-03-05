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
        <section id="careers" className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Join Our Team
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Build the future with Global Cooperation. We&apos;re looking for
                        talented individuals to join our growing team.
                    </p>
                </div>

                {/* Filters */}
                {jobs.length > 0 && (
                    <div className="mb-12 space-y-6">
                        {/* Department Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                Department
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {departments.map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDepartment(dept)}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedDepartment === dept
                                            ? "bg-gray-900 text-white"
                                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {dept.charAt(0).toUpperCase() + dept.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location & Type Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                    Location
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map((loc) => (
                                        <button
                                            key={loc}
                                            onClick={() => setSelectedLocation(loc)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedLocation === loc
                                                ? "bg-gray-900 text-white"
                                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {loc.charAt(0).toUpperCase() + loc.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                                    Job Type
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {types.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedType(t)}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedType === t
                                                ? "bg-gray-900 text-white"
                                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                                }`}
                                        >
                                            {t.charAt(0).toUpperCase() + t.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                            <div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
                            >
                                {/* Department Badge */}
                                <div className="mb-4">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold tracking-wide uppercase rounded-md">
                                        {job.department}
                                    </span>
                                </div>

                                {/* Job Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-burgundy transition-colors">
                                    {job.title}
                                </h3>

                                {/* Job Meta */}
                                <div className="space-y-2 mb-8 flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        {job.type}
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                            {job.salary}
                                        </div>
                                    )}
                                </div>

                                {/* View Details Button */}
                                <div className="flex items-center text-burgundy font-medium text-sm group-hover:underline">
                                    View Details
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            className="fixed inset-0 flex items-center justify-center z-[110] p-4"
                            onClick={() => setSelectedJob(null)}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            >
                                {/* Modal Header */}
                                <div className="sticky top-0 bg-white p-8 border-b border-gray-100 z-10 rounded-t-3xl">
                                    <button
                                        onClick={() => setSelectedJob(null)}
                                        className="absolute top-6 right-6 w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <h2 className="text-3xl font-bold text-gray-900 mb-4 pr-12">{selectedJob.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-gray-600">
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium">
                                            <Briefcase className="w-4 h-4 text-gray-400" />
                                            {selectedJob.department}
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {selectedJob.location}
                                        </div>
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {selectedJob.type}
                                        </div>
                                        {selectedJob.salary && (
                                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md text-sm font-medium">
                                                <DollarSign className="w-4 h-4 text-gray-400" />
                                                {selectedJob.salary}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-8 space-y-8">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                                            About This Role
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed text-sm">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {/* Responsibilities */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                                            Key Responsibilities
                                        </h3>
                                        <ul className="space-y-2">
                                            {selectedJob.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                    <span>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                                            Requirements
                                        </h3>
                                        <ul className="space-y-2">
                                            {selectedJob.requirements.map((req, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                                            What We Offer
                                        </h3>
                                        <ul className="space-y-2">
                                            {selectedJob.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Apply Button */}
                                    <div className="pt-6">
                                        <button
                                            onClick={() => setIsApplying(true)}
                                            className="block w-full py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors font-semibold text-center"
                                        >
                                            Apply Now
                                        </button>
                                        <p className="text-xs text-gray-500 text-center mt-3">
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
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-[120] p-4 pointer-events-none"
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
                                                className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
