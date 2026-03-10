"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Mail, FileText, Calendar, Users,
    Trash2, AlertTriangle, X, Clock, BadgeCheck,
    ExternalLink, MessageSquareText, ChevronDown, ChevronUp
} from "lucide-react";

interface Application {
    id: string;
    name: string;
    email: string;
    resumeUrl: string;
    coverLetter: string | null;
    status: string;
    createdAt: string;
}

const STATUS_META: Record<string, { label: string; color: string }> = {
    pending: { label: "Pending", color: "bg-amber-50 text-amber-700 ring-amber-200" },
    reviewed: { label: "Reviewed", color: "bg-blue-50 text-blue-700 ring-blue-200" },
    rejected: { label: "Rejected", color: "bg-red-50 text-red-600 ring-red-200" },
    hired: { label: "Hired", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
};

function getInitials(name: string) {
    return name
        .split(" ")
        .slice(0, 2)
        .map(w => w[0])
        .join("")
        .toUpperCase();
}

// Stable avatar colour from name
const AVATAR_PALETTES = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-cyan-500 to-sky-600",
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

    // ── Loading skeleton ──
    if (loading) {
        return (
            <div className="p-8 max-w-4xl mx-auto space-y-4 animate-pulse">
                <div className="h-6 w-40 bg-slate-200 rounded-lg" />
                <div className="h-10 w-72 bg-slate-200 rounded-xl" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-36 bg-slate-200 rounded-2xl" />
                ))}
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">

            {/* ── Back ── */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-burgundy mb-7 transition-colors font-medium"
            >
                <ArrowLeft size={16} />
                Back to Jobs
            </button>

            {/* ── Header ── */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Applications</h1>
                    <p className="text-slate-500 mt-0.5 text-sm flex items-center gap-2">
                        <Users size={14} />
                        {applications.length} {applications.length === 1 ? "applicant" : "applicants"} total
                    </p>
                </div>

                {/* Status legend pills */}
                <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
                    {Object.values(STATUS_META).map(({ label, color }) => (
                        <span key={label} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${color}`}>{label}</span>
                    ))}
                </div>
            </div>

            {/* ── Empty ── */}
            {applications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <Users size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">No applications yet</h3>
                    <p className="text-slate-400 text-sm mt-1">Share the job posting to start receiving applicants.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {applications.map((app, idx) => {
                        const statusMeta = STATUS_META[app.status] ?? STATUS_META.pending;
                        const coverExpanded = expandedCover === app.id;

                        return (
                            <div
                                key={app.id}
                                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden"
                            >
                                {/* ── Card top ── */}
                                <div className="p-6">
                                    <div className="flex items-start gap-5">

                                        {/* Avatar */}
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarGradient(app.name)} flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-md`}>
                                            {getInitials(app.name)}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h3 className="text-base font-bold text-slate-900">{app.name}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ${statusMeta.color}`}>
                                                    {statusMeta.label}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <span>#{idx + 1}</span>
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                <a
                                                    href={`mailto:${app.email}`}
                                                    className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-burgundy transition-colors"
                                                >
                                                    <Mail size={13} />
                                                    {app.email}
                                                </a>
                                                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                                                    <Calendar size={13} />
                                                    {new Date(app.createdAt).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                                    <Clock size={11} />
                                                    {timeAgo(app.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-burgundy/8 text-burgundy rounded-xl hover:bg-burgundy hover:text-white transition-all text-sm font-semibold border border-burgundy/20"
                                            >
                                                <FileText size={15} />
                                                CV
                                                <ExternalLink size={12} className="opacity-60" />
                                            </a>
                                            <button
                                                onClick={() => setConfirmDelete(app)}
                                                disabled={deletingId === app.id}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all text-sm font-semibold border border-red-100 disabled:opacity-50"
                                                title="Delete Application"
                                            >
                                                <Trash2 size={15} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* ── Divider + Cover Letter toggle ── */}
                                    {app.coverLetter && (
                                        <div className="mt-5 pt-4 border-t border-slate-100">
                                            <button
                                                onClick={() => setExpandedCover(coverExpanded ? null : app.id)}
                                                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-burgundy transition-colors"
                                            >
                                                <MessageSquareText size={15} />
                                                Cover Letter
                                                {coverExpanded
                                                    ? <ChevronUp size={15} className="ml-auto" />
                                                    : <ChevronDown size={15} className="ml-auto" />}
                                            </button>

                                            {coverExpanded && (
                                                <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                                                    {app.coverLetter}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* No cover letter notice */}
                                    {!app.coverLetter && (
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-xs text-slate-400 italic flex items-center gap-1.5">
                                                <MessageSquareText size={12} />
                                                No cover letter provided
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Delete Confirm Modal ── */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-4 mb-5">
                            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0 ring-1 ring-red-100">
                                <AlertTriangle size={20} className="text-red-500" />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">Delete Application?</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    You&apos;re about to permanently remove the application from{" "}
                                    <span className="font-semibold text-slate-800">{confirmDelete.name}</span>.
                                    This cannot be undone.
                                </p>
                            </div>
                            <button onClick={() => setConfirmDelete(null)} className="p-1.5 hover:bg-slate-100 rounded-lg ml-auto">
                                <X size={16} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={!!deletingId}
                                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {deletingId ? "Deleting…" : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
