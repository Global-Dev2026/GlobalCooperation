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
    ArrowUpRight,
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
        resume: null as File | null,
        coverLetter: ""
    });
    const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | { success: false; message: "" }>({ success: false, message: "" });

    const handleApplicationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: "" });

        try {
            const formData = new FormData();
            formData.append("jobId", selectedJob?.id || "");
            formData.append("name", applicationForm.name);
            formData.append("email", applicationForm.email);
            formData.append("coverLetter", applicationForm.coverLetter);
            if (applicationForm.resume) {
                formData.append("resume", applicationForm.resume);
            }

            const response = await fetch("/api/jobs/apply", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus({ success: true, message: "Application submitted successfully! We'll be in touch." });
                setTimeout(() => {
                    setIsApplying(false);
                    setSelectedJob(null);
                    setApplicationForm({ name: "", email: "", resume: null, coverLetter: "" });
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

    useEffect(() => {
        fetchJobs();
    }, []);

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

    const departments = ["all", ...Array.from(new Set(jobs.map((j) => j.department)))];
    const locations = ["all", ...Array.from(new Set(jobs.map((j) => j.location)))];
    const types = ["all", ...Array.from(new Set(jobs.map((j) => j.type)))];

    return (
        <section id="careers" className="relative py-20 bg-gray-200 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Modern Header */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-burgundy text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
                    >
                        Career Opportunities
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat tracking-tight"
                    >
                        Work with <span className="text-burgundy">Purpose</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Join a global ecosystem of innovation and excellence. We're looking for passionate individuals to help us build the future.
                    </motion.p>
                </div>

                {/* Filter Bar */}
                {jobs.length > 0 && (
                    <div className="mb-12">
                        <div className="bg-white border border-gray-200 rounded-xl p-1.5 inline-flex flex-wrap gap-1">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${selectedDepartment === dept
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {dept.charAt(0).toUpperCase() + dept.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Job Grid */}
                {loading ? (
                    <div className="text-center py-32">
                        <div className="relative inline-block w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                            <div className="absolute inset-0 rounded-full border-4 border-gray-900 border-t-transparent animate-spin" />
                        </div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-32 bg-whisper rounded-[2.5rem] border border-gray-100 shadow-xl shadow-black/5">
                        <div className="w-20 h-20 bg-white shadow-sm rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Roles</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find any positions matching your current filters. Try resetting them to see all openings.</p>
                        <button
                            onClick={() => {
                                setSelectedDepartment("all");
                                setSelectedLocation("all");
                                setSelectedType("all");
                            }}
                            className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job, idx) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: idx * 0.08, duration: 0.4 }}
                                onClick={() => setSelectedJob(job)}
                                className="group bg-white rounded-2xl p-6 border border-gray-200 shadow-[0_4px_16px_rgba(148,163,184,0.5)] hover:shadow-[0_8px_28px_rgba(148,163,184,0.75)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                                        {job.department}
                                    </span>
                                    <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-2 flex-grow">
                                    {job.title}
                                </h3>

                                {/* Meta Info */}
                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                        {job.type}
                                    </div>
                                    {job.salary && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <DollarSign className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                            {job.salary}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-sm font-semibold text-gray-700">View Details</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Job Detail Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[110]"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-[110] p-4 pointer-events-none"
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl pointer-events-auto relative"
                            >

                                <div className="sticky top-0 bg-white px-10 py-6 border-b border-gray-100 z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-grow pr-8">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                                                {selectedJob.department}
                                            </span>
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                                {selectedJob.type}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedJob(null)}
                                        className="absolute top-6 right-8 w-10 h-10 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-10">
                                    {!isApplying ? (
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                            <div className="lg:col-span-2 space-y-10">
                                                <section>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                                        About the Role
                                                    </h3>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {selectedJob.description}
                                                    </p>
                                                </section>

                                                <section>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                                        Key Responsibilities
                                                    </h3>
                                                    <ul className="grid grid-cols-1 gap-4">
                                                        {selectedJob.responsibilities.map((resp, idx) => (
                                                            <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100/50 text-gray-700 text-sm items-start transition-all hover:bg-white hover:shadow-md">
                                                                <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    <Check className="w-3 h-3 text-gray-600" />
                                                                </div>
                                                                {resp}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>

                                                <section>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                                                        What You Bring
                                                    </h3>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {selectedJob.requirements.map((req, idx) => (
                                                            <li key={idx} className="flex gap-3 text-gray-600 text-sm items-start border border-gray-100 p-3 rounded-lg">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                                                                {req}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            </div>

                                            <div className="lg:col-span-1">
                                                <div className="sticky top-32 space-y-6">
                                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                        <h4 className="font-bold text-gray-900 mb-4">Role Insights</h4>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Location</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{selectedJob.location}</p>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                                                                    <Clock className="w-4 h-4 text-gray-500" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Schedule</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{selectedJob.type}</p>
                                                                </div>
                                                            </div>
                                                            {selectedJob.salary && (
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                                                                        <DollarSign className="w-4 h-4 text-gray-500" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500">Compensation</p>
                                                                        <p className="text-sm font-semibold text-gray-900">{selectedJob.salary}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="mt-8 pt-8 border-t border-gray-200">
                                                            <button
                                                                onClick={() => setIsApplying(true)}
                                                                className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-black transition-colors"
                                                            >
                                                                Apply Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in duration-300">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-xl font-bold text-gray-900">Application Form</h3>
                                                <button
                                                    onClick={() => setIsApplying(false)}
                                                    className="px-4 py-2 bg-gray-50 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    Back to Details
                                                </button>
                                            </div>

                                            <form onSubmit={handleApplicationSubmit} className="space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={applicationForm.name}
                                                            onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm font-medium"
                                                            placeholder="John Doe"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                                        <input
                                                            type="email"
                                                            required
                                                            value={applicationForm.email}
                                                            onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                                                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm font-medium"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700 ml-1">Resume (PDF, Max 2MB)</label>
                                                    <div className="relative group/file">
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            required
                                                            onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files?.[0] || null })}
                                                            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 cursor-pointer text-sm font-medium file:hidden"
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 group-hover/file:bg-gray-200 transition-colors">
                                                            {applicationForm.resume ? 'File Selected' : 'Choose File'}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-gray-700 ml-1">Cover Letter (Optional)</label>
                                                    <textarea
                                                        rows={4}
                                                        value={applicationForm.coverLetter}
                                                        onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                                                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all text-sm font-medium resize-none"
                                                        placeholder="Briefly explain your suitability for the role..."
                                                    />
                                                </div>

                                                {submitStatus.message && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`p-4 rounded-lg text-sm font-medium flex items-center gap-3 ${submitStatus.success ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}
                                                    >
                                                        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${submitStatus.success ? 'bg-green-100' : 'bg-red-100'}`}>
                                                            {submitStatus.success ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                                        </div>
                                                        {submitStatus.message}
                                                    </motion.div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full py-4 bg-gray-900 text-white rounded-lg font-bold transition-colors hover:bg-black disabled:opacity-50"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            Processing...
                                                        </span>
                                                    ) : "Submit Application"}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
