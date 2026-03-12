"use client";

import { useState, useEffect } from "react";
import {
    Plus, Trash2, Users, Briefcase, X, Search,
    MapPin, Clock, CheckCircle2, Pencil, ChevronRight, ToggleLeft, ToggleRight, Sparkles, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const TYPE_STYLES: Record<string, string> = {
    "Full-time": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Part-time": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Contract": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Internship": "bg-teal-500/10 text-teal-400 border-teal-500/20",
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
        setJobs(prev => prev.map(j => j.id === job.id ? { ...j, isActive: newStatus } : j));
        try {
            const res = await fetch(`/api/admin/jobs/${job.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: newStatus }),
            });
            if (!res.ok) setJobs(prev => prev.map(j => j.id === job.id ? { ...j, isActive: job.isActive } : j));
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

    if (loading) {
        return (
            <div className="p-10 max-w-7xl mx-auto space-y-8 animate-pulse">
                <div className="h-10 w-64 bg-white/5 rounded-2xl" />
                <div className="grid grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-white/5 rounded-3xl" />)}
                </div>
                <div className="h-96 bg-white/5 rounded-[40px]" />
            </div>
        );
    }

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-10">

            {/* ── Page Header ── */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[#E0BB20]">
                        <Briefcase size={16} />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Talent Acquisition</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Job Management</h1>
                    <p className="text-white/40 text-sm font-medium">Create, publish, and architect your organization&apos;s workforce.</p>
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openAdd}
                    className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#841818] to-[#631212] text-white text-sm font-bold rounded-2xl shadow-xl shadow-[#841818]/20 transition-all hover:shadow-[#841818]/40"
                >
                    <Plus size={20} />
                    Deploy New Position
                </motion.button>
            </header>

            {/* ── Metrics Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Capacity", value: jobs.length, icon: Briefcase, color: "#E0BB20" },
                    { label: "Active Nodes", value: activeJobs, icon: CheckCircle2, color: "#10b981" },
                    { label: "Total Candidates", value: totalApplicants, icon: Users, color: "#841818" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[2rem] border border-white/5 bg-[#111111]/60 backdrop-blur-md flex items-center gap-5"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                            <stat.icon size={24} style={{ color: stat.color }} />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white">{stat.value}</p>
                            <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Search & Filter ── */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/20 group-focus-within:text-[#E0BB20] transition-colors">
                    <Search size={18} />
                </div>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search parameters: Title, Department, or Location…"
                    className="w-full pl-14 pr-10 py-5 bg-[#111111]/40 border border-white/5 rounded-[2rem] text-sm text-white placeholder-white/20 outline-none focus:border-[#841818]/40 focus:bg-[#111111]/60 transition-all [color-scheme:dark]"
                />
            </div>

            {/* ── Dynamic Job Grid/Table ── */}
            <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-[#111111]/20 backdrop-blur-xl shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/2">
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Node / Position</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Department</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Location</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Status</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Metrics</th>
                                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filtered.map((job, i) => (
                                <motion.tr 
                                    key={job.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-8 py-6 font-bold text-white tracking-tight">{job.title}</td>
                                    <td className="px-8 py-6 text-white/50 text-sm">{job.department}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-white/40 text-xs">
                                            <MapPin size={12} className="text-[#841818]" />
                                            {job.location}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button
                                            onClick={() => handleToggleActive(job)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${job.isActive
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-white/5 text-white/30 border-white/5"
                                            }`}
                                        >
                                            {job.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                            {job.isActive ? "Online" : "Offline"}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6">
                                        <a href={`/admin/jobs/${job.id}/applications`} className="flex items-center gap-3 text-sm font-bold text-white group/link">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-[#841818]/20 transition-colors">
                                                <Users size={14} className="group-hover/link:text-[#841818]" />
                                            </div>
                                            {job._count?.applications ?? 0}
                                            <ChevronRight size={12} className="text-white/20 group-hover/link:translate-x-1 transition-all" />
                                        </a>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => openEdit(job)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                                                <Pencil size={18} />
                                            </button>
                                            <button onClick={() => setDeleteConfirm(job.id)} className="p-3 rounded-xl bg-white/5 hover:bg-[#841818]/20 text-white/40 hover:text-[#841818] transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-6">
                            <Search size={32} className="text-white/10" />
                        </div>
                        <h3 className="text-xl font-bold text-white">No nodes detected</h3>
                        <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">
                            The current search parameters returned no results. Adjust your query or deploy a new node.
                        </p>
                    </div>
                )}
            </div>

            {/* ── Modals & Overlays ── */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md" 
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-[#111111] border border-white/5 rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
                        >
                            <header className="flex-none p-10 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-3 text-[#E0BB20] mb-2">
                                        <Sparkles size={16} />
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">Configuration Portal</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-white">
                                        {editingJob ? "Modify Node Parameters" : "Deploy New Position"}
                                    </h2>
                                </div>
                                <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <X size={20} />
                                </button>
                            </header>

                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Node Title</label>
                                        <input name="title" defaultValue={editingJob?.title} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all [color-scheme:dark]" placeholder="e.g. System Architect" />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Operational Department</label>
                                        <select name="department" defaultValue={editingJob?.department} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all [color-scheme:dark] appearance-none">
                                            {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#111111]">{d}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Physical Location</label>
                                        <select name="location" defaultValue={editingJob?.location} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all [color-scheme:dark] appearance-none">
                                            {LOCATIONS.map(l => <option key={l} value={l} className="bg-[#111111]">{l}</option>)}
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Contract Model</label>
                                        <select name="type" defaultValue={editingJob?.type} required className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all [color-scheme:dark] appearance-none">
                                            <option value="Full-time" className="bg-[#111111]">Full-time</option>
                                            <option value="Part-time" className="bg-[#111111]">Part-time</option>
                                            <option value="Contract" className="bg-[#111111]">Contract</option>
                                            <option value="Internship" className="bg-[#111111]">Internship</option>
                                        </select>
                                    </div>
                                </section>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Mission Description</label>
                                    <textarea name="description" defaultValue={editingJob?.description} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all resize-none [color-scheme:dark]" placeholder="Describe the core mission of this role…" />
                                </div>

                                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Requirements</label>
                                        <textarea name="requirements" defaultValue={(editingJob as any)?.requirements?.join("\n")} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-xs outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all resize-none [color-scheme:dark]" placeholder="Enter one per line…" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Core Responsibilities</label>
                                        <textarea name="responsibilities" defaultValue={(editingJob as any)?.responsibilities?.join("\n")} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-xs outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all resize-none [color-scheme:dark]" placeholder="Enter one per line…" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">Offer / Benefits</label>
                                        <textarea name="benefits" defaultValue={(editingJob as any)?.benefits?.join("\n")} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-white text-xs outline-none focus:border-[#841818]/40 focus:bg-white/10 transition-all resize-none [color-scheme:dark]" placeholder="Enter one per line…" />
                                    </div>
                                </section>

                                <footer className="pt-8 flex justify-end gap-5">
                                    <button type="button" onClick={closeModal} className="px-8 py-4 text-sm font-bold text-white/40 hover:text-white transition-colors">Cancel</button>
                                    <button type="submit" disabled={saving} className="px-10 py-4 bg-white text-black text-sm font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                        {saving ? "Authorizing..." : editingJob ? "Apply Changes" : "Finalize Deployment"}
                                    </button>
                                </footer>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirmation Overlay ── */}
            <AnimatePresence>
                {deleteConfirm && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md bg-[#111111] border border-[#841818]/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-[0_0_80px_rgba(132,24,24,0.15)]">
                            <div className="w-20 h-20 rounded-[2rem] bg-[#841818]/10 flex items-center justify-center mb-8">
                                <Trash2 size={32} className="text-[#841818]" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3">Terminate Node?</h3>
                            <p className="text-white/40 text-sm leading-relaxed mb-10">
                                This action will permanently decommission the node and erase all associated applicant data. This procedure is irreversible.
                            </p>
                            <div className="flex w-full gap-4">
                                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 text-sm font-bold text-white/30 hover:text-white transition-colors">Abort</button>
                                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-4 bg-[#841818] text-white text-sm font-black rounded-2xl hover:bg-[#a31e1e] transition-all">Confirm Termination</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
