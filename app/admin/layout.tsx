import Link from 'next/link';
import { signOut } from '@/auth';
import { LogOut, LayoutDashboard, Building2 } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

            {/* ── Sidebar ── */}
            <aside className="w-64 flex-none flex flex-col bg-[#0f1623] text-white shadow-2xl">

                {/* Brand */}
                <div className="px-6 py-7 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-burgundy flex items-center justify-center shadow-lg">
                            <Building2 size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-widest text-burgundy-400 uppercase">Admin Panel</p>
                            <h2 className="text-sm font-bold text-white leading-tight">Global Cooperation</h2>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
                    <p className="px-3 mb-3 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Menu</p>

                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-all duration-150 text-sm font-medium group"
                    >
                        <LayoutDashboard size={17} className="group-hover:text-burgundy-400 transition-colors" />
                        Dashboard
                    </Link>


                </nav>

                {/* Sign Out */}
                <div className="px-3 pb-6 border-t border-white/10 pt-4">
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-red-500/15 transition-all duration-150 text-sm font-medium group"
                        >
                            <LogOut size={17} className="group-hover:text-red-400 transition-colors" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
