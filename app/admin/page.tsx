"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface Job {
    id: string;
    isActive: boolean;
    _count?: {
        applications: number;
    };
}

/**
 * AdminDashboard - Cinematic Professional Interface
 */
export default function AdminDashboard() {
    const [stats, setStats] = useState({ activeJobs: 0, totalApplicants: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("/api/admin/jobs");
                const data = await res.json();
                if (data.success) {
                    const jobs: Job[] = data.data;
                    const active = jobs.filter(j => j.isActive).length;
                    const applicants = jobs.reduce((acc, job) => acc + (job._count?.applications || 0), 0);
                    setStats({ activeJobs: active, totalApplicants: applicants });
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="p-10 max-w-7xl mx-auto space-y-12">
            
            {/* ── Welcome & Status Header ── */}
            <header className="relative py-12 px-10 rounded-[40px] overflow-hidden border border-white/5 bg-[#333333]/40 backdrop-blur-md">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#841818]/10 to-transparent pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-[#E0BB20]"
                        >
                            <Sparkles size={16} className="animate-pulse" />
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">System Status Online</span>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Admin</span>
                            </h1>
                            <p className="text-white/40 mt-3 text-lg font-medium max-w-2xl leading-relaxed">
                                Welcome to the Global Cooperation administration portal. Manage your system from this central dashboard.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Security Status</span>
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold ring-4 ring-emerald-500/5">
                                <ShieldCheck size={12} />
                                Encrypted Session
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* ── Quick Stats Navigation ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: "Active Jobs", value: loading ? "..." : stats.activeJobs.toString(), icon: Zap, color: "#E0BB20" },
                    { label: "New Applicants", value: loading ? "..." : stats.totalApplicants.toString(), icon: Activity, color: "#841818" }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="p-8 rounded-3xl border border-white/5 bg-[#2D2D2D]/60 backdrop-blur-sm group hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-4">
                                <p className="text-xs font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
                                <h3 className="text-3xl font-extrabold text-white">{stat.value}</h3>
                            </div>
                            <div className="p-3 rounded-2xl bg-white/5 text-white/20 group-hover:text-white transition-colors">
                                <stat.icon size={20} style={{ color: stat.color }} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── Main Operations ── */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white tracking-tight">Management Modules</h2>
                    <div className="h-[1px] flex-1 bg-white/5 mx-6" />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            href="/admin/jobs"
                            className="group relative block overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-[#2D2D2D] to-[#1E1E1E] p-1 shadow-2xl transition-all duration-500 hover:scale-[1.01] hover:border-[#841818]/30"
                        >
                            <div className="relative z-10 p-8 flex items-center gap-8">
                                <div className="w-20 h-20 rounded-[24px] bg-[#333333] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#841818] group-hover:shadow-[0_0_40px_rgba(132,24,24,0.3)] transition-all duration-500">
                                    <Briefcase size={32} className="text-white group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <h2 className="text-2xl font-black text-white group-hover:text-[#E0BB20] transition-colors">Job Management</h2>
                                    <p className="text-white/40 leading-relaxed text-sm">
                                        Manage your organization&apos;s job postings and career opportunities.
                                    </p>
                                    <div className="flex items-center gap-2 pt-2 text-[#841818] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                                        Manage Jobs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Zap size={80} />
                            </div>
                        </Link>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
