"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut, LayoutDashboard, Building2, Briefcase } from 'lucide-react';

/**
 * AdminLayout - Cinematic Enterprise Design
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';

    return (
        <div className="flex h-screen bg-[#0A0A0A] font-sans overflow-hidden text-white select-none">

            {/* ── Sidebar ── */}
            {!isLoginPage && (
                <aside className="w-72 flex-none flex flex-col bg-[#111111] border-r border-white/5 shadow-2xl z-20">

                    {/* Brand / Logo Section */}
                    <div className="px-8 py-10 border-b border-white/5 relative group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#841818] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#841818] to-[#631212] flex items-center justify-center shadow-lg shadow-[#841818]/20 group-hover:scale-105 transition-transform duration-300">
                                <Building2 size={20} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-[#E0BB20] uppercase opacity-70">Admin Core</span>
                                <h2 className="text-base font-extrabold text-white leading-tight tracking-tight">Global Cooperation</h2>
                            </div>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-2 custom-scrollbar">
                        <p className="px-4 mb-4 text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold">Main Console</p>

                        <Link
                            href="/admin"
                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-semibold group relative"
                        >
                            <div className="absolute left-0 w-1 h-4 bg-[#E0BB20] rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            <LayoutDashboard size={18} className="group-hover:text-[#E0BB20] transition-colors" />
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/jobs"
                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 text-sm font-semibold group relative"
                        >
                            <div className="absolute left-0 w-1 h-4 bg-[#E0BB20] rounded-full opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            <Briefcase size={18} className="group-hover:text-[#E0BB20] transition-colors" />
                            Job Management
                        </Link>


                    </nav>

                    {/* User / Sign Out Section */}
                    <div className="px-4 pb-8 border-t border-white/5 pt-6">
                        <button
                            onClick={() => signOut()}
                            className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-[#841818]/10 transition-all duration-300 text-sm font-bold tracking-wide group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#841818]/20 transition-colors">
                                <LogOut size={18} className="group-hover:text-[#841818] transition-colors" />
                            </div>
                            Terminate Session
                        </button>
                    </div>
                </aside>
            )}

            {/* ── Main Workspace ── */}
            <main className="flex-1 relative overflow-hidden flex flex-col">
                
                {/* Global Top Bar */}
                {!isLoginPage && (
                    <header className="h-20 flex-none border-b border-white/5 bg-[#0D0D0D]/50 backdrop-blur-md px-10 flex items-center justify-between z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-[#E0BB20] animate-pulse" />
                            <span className="text-[11px] font-bold tracking-widest text-white/40 uppercase">System Active | 2026 Virtualization</span>
                        </div>
                    </header>
                )}

                {/* Dynamic Content Area with Cinematic Background */}
                <div className="flex-1 overflow-y-auto relative custom-scrollbar">
                    {/* Interior Background Decoration */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-[#841818]/5 blur-[120px]" />
                        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-[#E0BB20]/3 blur-[120px]" />
                    </div>
                    
                    {/* Content Wrapper */}
                    <div className="relative z-10 h-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
