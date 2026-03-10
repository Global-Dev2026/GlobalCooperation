"use client";

import { useState, useEffect } from "react";
import {
    Plus, Trash2, Users, Briefcase, X, Search,
    MapPin, Clock, CheckCircle2, XCircle, Pencil, ChevronRight, ToggleLeft, ToggleRight
} from "lucide-react";

interface Job {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    isActive: boolean;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    createdAt: string;
    _count?: {
        applications: number;
    };
}

const DEPARTMENTS = [
    "Operations", "Sales & Marketing", "Human Resources",
    "Technical Support", "Administration", "Finance & Accounts", "Management",
];

const LOCATIONS = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle",
    "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle",
    "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala",
    "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
    "Trincomalee", "Vavuniya",
];

const TYPE_COLORS: Record<string, string> = {
    "Full-time": "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    "Part-time": "bg-purple-50 text-purple-700 ring-1 ring-purple-200",
    "Contract": "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    "Internship": "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
};

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/admin/jobs");
            const data = await res.json();
            if (data.success) setJobs(data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const filtered = jobs.filter(j =>
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.department.toLowerCase().includes(search.toLowerCase()) ||
        j.location.toLowerCase().includes(search.toLowerCase())
    );

    const openAdd = () => { setEditingJob(null); setShowModal(true); };
    const openEdit = (j: Job) => { setEditingJob(j); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setEditingJob(null); };

    const handleToggleActive = async (job: Job) => {
        const newStatus = !job.isActive;
        // Optimistic UI update
        setJobs(prev => prev.map(j => j.id === job.id ? { ...j, isActive: newStatus } : j));
        try {
            const res = await fetch(`/api/admin/jobs/${job.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            if (!res.ok) {
                // Revert on failure
                setJobs(prev => prev.map(j => j.id === job.id ? { ...j, isActive: job.isActive } : j));
            }
        } catch (e) {
            console.error(e);
            setJobs(prev => prev.map(j => j.id === job.id ? { ...j, isActive: job.isActive } : j));
        }
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        const fd = new FormData(e.currentTarget);
        const body = {
            title: fd.get("title"),
            department: fd.get("department"),
            location: fd.get("location"),
            type: fd.get("type"),
            description: fd.get("description"),
            requirements: (fd.get("requirements") as string).split(/[\n,]/).map(s => s.trim()).filter(Boolean),
            responsibilities: (fd.get("responsibilities") as string).split(/[\n,]/).map(s => s.trim()).filter(Boolean),
            benefits: (fd.get("benefits") as string).split(/[\n,]/).map(s => s.trim()).filter(Boolean),
        };
        try {
            const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : "/api/admin/jobs";
            const res = await fetch(url, {
                method: editingJob ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.ok) { closeModal(); fetchJobs(); }
        } catch (e) { console.error(e); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
            if (res.ok) { setDeleteConfirm(null); fetchJobs(); }
        } catch (e) { console.error(e); }
    };

    const totalApplicants = jobs.reduce((s, j) => s + (j._count?.applications ?? 0), 0);
    const activeJobs = jobs.filter(j => j.isActive).length;

    // ── Skeleton ──
    if (loading) {
        return (
            <div className="p-8 max-w-7xl mx-auto animate-pulse space-y-4">
                <div className="h-8 w-56 bg-slate-200 rounded-lg" />
                <div className="grid grid-cols-3 gap-4">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-slate-200 rounded-xl" />)}
                </div>
                <div className="h-64 bg-slate-200 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">

            {/* ── Page Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Management</h1>
                    <p className="text-slate-500 mt-0.5 text-sm">Create, edit and track all open positions</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 px-5 py-2.5 bg-burgundy text-white text-sm font-semibold rounded-xl hover:bg-burgundy-800 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus size={18} />
                    Post New Job
                </button>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Active Jobs", value: activeJobs, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Total Applicants", value: totalApplicants, icon: Users, color: "text-burgundy", bg: "bg-burgundy-50" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center gap-4 shadow-sm">
                        <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
                            <Icon size={22} className={color} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-slate-900">{value}</p>
                            <p className="text-xs text-slate-500 font-medium">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Search Bar ── */}
            <div className="relative mb-4">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by title, department or location…"
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy transition-all"
                />
            </div>

            {/* ── Jobs Table ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/70">
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Position</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Department</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Location</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Type</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Status</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600">Applicants</th>
                            <th className="px-6 py-3.5 font-semibold text-slate-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map(job => (
                            <tr key={job.id} className="hover:bg-slate-50/60 transition-colors group">
                                <td className="px-6 py-4 font-semibold text-slate-800">{job.title}</td>
                                <td className="px-6 py-4 text-slate-500">{job.department}</td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-1 text-slate-500">
                                        <MapPin size={13} className="text-slate-400" />
                                        {job.location}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[job.type] ?? "bg-gray-100 text-gray-600"}`}>
                                        <Clock size={11} />
                                        {job.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleToggleActive(job)}
                                        title={job.isActive ? "Click to deactivate" : "Click to activate"}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${job.isActive
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                                            }`}
                                    >
                                        {job.isActive
                                            ? <><ToggleRight size={16} className="text-emerald-500" /> Active</>
                                            : <><ToggleLeft size={16} className="text-slate-400" /> Inactive</>
                                        }
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <a
                                        href={`/admin/jobs/${job.id}/applications`}
                                        className="inline-flex items-center gap-1.5 font-semibold text-burgundy hover:text-burgundy-700 group/link"
                                    >
                                        <Users size={14} />
                                        {job._count?.applications ?? 0}
                                        <ChevronRight size={13} className="opacity-0 -ml-1 group-hover/link:opacity-100 transition-opacity" />
                                    </a>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-1.5">
                                        <button
                                            onClick={() => openEdit(job)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Edit Job"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(job.id)}
                                            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                            title="Delete Job"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                            <Briefcase size={28} className="text-slate-400" />
                        </div>
                        <p className="text-slate-700 font-semibold">No jobs found</p>
                        <p className="text-slate-400 text-sm mt-1">
                            {search ? "Try adjusting your search" : "Create your first job posting to get started"}
                        </p>
                    </div>
                )}
            </div>

            {/* ── Add / Edit Modal ── */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    {editingJob ? "Edit Job Posting" : "Post New Job"}
                                </h2>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {editingJob ? "Update the job details below" : "Fill in the details to create a new listing"}
                                </p>
                            </div>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                <X size={20} className="text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
                                <input
                                    name="title"
                                    defaultValue={editingJob?.title}
                                    required
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>

                            {/* Dept + Location */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                                    <select name="department" defaultValue={editingJob?.department} required
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all bg-white">
                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Location</label>
                                    <select name="location" defaultValue={editingJob?.location} required
                                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all bg-white">
                                        {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Employment Type</label>
                                <select name="type" defaultValue={editingJob?.type} required
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all bg-white">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                                <textarea name="description" defaultValue={editingJob?.description} required rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all resize-none"
                                    placeholder="Briefly describe the role…" />
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Requirements <span className="text-slate-400 font-normal">(one per line or comma separated)</span>
                                </label>
                                <textarea name="requirements" defaultValue={(editingJob as any)?.requirements?.join("\n")} required rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all resize-none"
                                    placeholder="3+ years experience&#10;Proficiency in React&#10;Strong communication skills" />
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    Key Responsibilities <span className="text-slate-400 font-normal">(one per line or comma separated)</span>
                                </label>
                                <textarea name="responsibilities" defaultValue={(editingJob as any)?.responsibilities?.join("\n")} required rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all resize-none"
                                    placeholder="Lead the frontend team&#10;Architect scalable solutions" />
                            </div>

                            {/* Benefits */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                    What We Offer <span className="text-slate-400 font-normal">(one per line or comma separated)</span>
                                </label>
                                <textarea name="benefits" defaultValue={(editingJob as any)?.benefits?.join("\n")} required rows={3}
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/25 focus:border-burgundy transition-all resize-none"
                                    placeholder="Competitive salary&#10;Flexible working hours" />
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
                                <button type="button" onClick={closeModal}
                                    className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={saving}
                                    className="px-5 py-2.5 text-sm font-semibold bg-burgundy text-white rounded-xl hover:bg-burgundy-800 transition-all shadow-md disabled:opacity-60">
                                    {saving ? "Saving…" : editingJob ? "Update Job" : "Create Job"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Delete Confirmation ── */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <Trash2 size={20} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Delete Job?</h3>
                                <p className="text-sm text-slate-500 mt-1">This will permanently delete the job and all its applications. This cannot be undone.</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors font-medium">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)}
                                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                                Delete Job
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
