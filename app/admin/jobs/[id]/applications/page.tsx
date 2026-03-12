"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Mail, FileText, Calendar, Users,
    Trash2, AlertTriangle, X, Clock,
    ExternalLink, MessageSquareText, ChevronDown, ChevronUp, Sparkles, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Application {
    id: string;
    name: string;
    email: string;
    resumeUrl: string;
    coverLetter: string | null;
    status: string;
    createdAt: string;
}

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map(w => w[0])
        .join("")
        .toUpperCase();
}

const AVATAR_PALETTES = [
    "from-[#841818] to-[#4a0d0d]",
    "from-[#E0BB20] to-[#b0931a]",
    "from-zinc-700 to-zinc-900",
];

function avatarGradient(name: string) {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % AVATAR_PALETTES.length;
    return AVATAR_PALETTES[h];
}

function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const d = Math.floor(diff / 86400000);
    if (d === 0) return "Today";
    if (d === 1) return "Yesterday";
    if (d < 30) return `${d} days ago`;
    const m = Math.floor(d / 30);
    if (m < 12) return `${m} month${m > 1 ? "s" : ""} ago`;
    return `${Math.floor(m / 12)} year${Math.floor(m / 12) > 1 ? "s" : ""} ago`;
}

export default function JobApplicationsPage() {
    const params = useParams();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<Application | null>(null);
    const [expandedCover, setExpandedCover] = useState<string | null>(null);

    useEffect(() => {
        if (params.id) fetchApplications(params.id as string);
    }, [params.id]);

    const fetchApplications = async (jobId: string) => {
        try {
            const res = await fetch(`/api/admin/jobs/${jobId}/applications`);
            const data = await res.json();
            if (data.success) setApplications(data.data);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!confirmDelete) return;
        setDeletingId(confirmDelete.id);
        try {
            const res = await fetch(
                `/api/admin/jobs/${params.id}/applications/${confirmDelete.id}`,
                { method: "DELETE" }
            );
            if (res.ok) setApplications(prev => prev.filter(a => a.id !== confirmDelete.id));
        } catch (e) { console.error(e); }
        finally { setDeletingId(null); setConfirmDelete(null); }
    };

    if (loading) {
        return (
            <div className="p-10 max-w-5xl mx-auto space-y-8 animate-pulse">
                <div className="h-6 w-32 bg-white/5 rounded-full" />
                <div className="h-12 w-64 bg-white/5 rounded-2xl" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-44 bg-white/5 rounded-[32px] border border-white/5" />
                ))}
            </div>
        );
    }

    return (
        <div className="p-10 max-w-5xl mx-auto space-y-10">
            {/* ── Back Navigation ── */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30 hover:text-[#E0BB20] transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Fleet Management
            </motion.button>

            {/* ── Header ── */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#E0BB20]">
                        <Sparkles size={16} className="animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Talent Acquisition Data</span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        Candidate <span className="text-white/40">Inflow</span>
                    </h1>
                    <p className="text-white/30 text-sm font-medium flex items-center gap-2">
                        <Users size={14} className="text-[#841818]" />
                        Total indexed entries: <span className="text-white">{applications.length}</span>
                    </p>
                </div>
            </header>

            {/* ── Applications Feed ── */}
            {applications.length === 0 ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-[40px] border border-dashed border-white/10 p-20 text-center bg-white/[0.02]"
                >
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                        <UserCheck size={32} className="text-white/10" />
                    </div>
                    <h3 className="text-xl font-bold text-white">No candidates indexed</h3>
                    <p className="text-white/30 text-sm mt-2 max-w-xs mx-auto">
                        This deployment has not received any external data streams yet. Check system availability.
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-6">
                    {applications.map((app, idx) => {
                        const coverExpanded = expandedCover === app.id;

                        return (
                            <motion.div
                                key={app.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-[32px] border border-white/5 bg-[#161616]/60 backdrop-blur-md transition-all duration-500 hover:border-white/10 hover:bg-[#1a1a1a]"
                            >
                                <div className="p-8">
                                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">

                                        {/* Profile Identity */}
                                        <div className="flex items-center gap-6 flex-1">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarGradient(app.name)} flex items-center justify-center text-white text-xl font-black shrink-0 shadow-2xl relative overflow-hidden`}>
                                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {getInitials(app.name)}
                                            </div>

                                            <div className="space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-bold text-white truncate">{app.name}</h3>
                                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-white/40 font-black uppercase tracking-tighter">
                                                        ID_{app.id.slice(-4)}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                                    <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-[#E0BB20] transition-colors">
                                                        <Mail size={14} />
                                                        {app.email}
                                                    </a>
                                                    <div className="flex items-center gap-2 text-xs text-white/20">
                                                        <Calendar size={14} />
                                                        {new Date(app.createdAt).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-[#841818] font-bold uppercase tracking-widest">
                                                        <Clock size={12} />
                                                        {timeAgo(app.createdAt)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Matrix */}
                                        <div className="flex items-center gap-4 shrink-0">
                                            <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2.5 px-6 py-3 bg-white/5 text-white/60 rounded-xl hover:bg-white/10 hover:text-white transition-all text-xs font-bold uppercase tracking-widest border border-white/5"
                                            >
                                                <FileText size={16} />
                                                Review CV
                                                <ExternalLink size={12} className="opacity-30" />
                                            </a>
                                            <button
                                                onClick={() => setConfirmDelete(app)}
                                                disabled={deletingId === app.id}
                                                className="p-3 bg-white/5 text-white/20 rounded-xl hover:bg-[#841818]/20 hover:text-[#841818] transition-all border border-white/5 disabled:opacity-30"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* ── Transmission Data (Cover Letter) ── */}
                                    <div className="mt-8 pt-6 border-t border-white/5">
                                        {app.coverLetter ? (
                                            <div className="space-y-4">
                                                <button
                                                    onClick={() => setExpandedCover(coverExpanded ? null : app.id)}
                                                    className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#E0BB20] hover:scale-105 origin-left transition-transform"
                                                >
                                                    <MessageSquareText size={14} />
                                                    Personal Statement
                                                    {coverExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                </button>

                                                <AnimatePresence>
                                                    {coverExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 text-sm text-white/50 leading-relaxed whitespace-pre-wrap italic font-medium">
                                                                &quot;{app.coverLetter}&quot;
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <p className="text-[10px] text-white/10 uppercase font-bold tracking-[0.3em] flex items-center gap-2">
                                                <MessageSquareText size={14} />
                                                No additional data streams transmitted
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* ── Cinematic Delete Protocol ── */}
            <AnimatePresence>
                {confirmDelete && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirmDelete(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md overflow-hidden rounded-[40px] border border-white/10 bg-[#161616] p-10 shadow-3xl"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#841818] to-transparent" />
                            
                            <div className="text-center space-y-6">
                                <div className="mx-auto w-20 h-20 rounded-[28px] bg-[#841818]/10 border border-[#841818]/20 flex items-center justify-center">
                                    <AlertTriangle size={32} className="text-[#841818] animate-pulse" />
                                </div>
                                
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-white">Pruning Protocol</h2>
                                    <p className="text-white/40 text-sm leading-relaxed">
                                        You are about to permanently erase the records for <span className="text-white font-bold">{confirmDelete.name}</span>. This action is final.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 pt-4">
                                    <button
                                        onClick={handleDelete}
                                        disabled={!!deletingId}
                                        className="w-full py-4 rounded-2xl bg-[#841818] text-white text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#841818]/20 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
                                    >
                                        {deletingId ? "Executing..." : "Confirm Deletion"}
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                                    >
                                        Abort
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
