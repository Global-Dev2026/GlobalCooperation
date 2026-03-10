import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="text-slate-500 mt-0.5 text-sm">Welcome back — here&apos;s an overview of your admin panel.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Link
                    href="/admin/jobs"
                    className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-burgundy/30 transition-all duration-200 p-6 flex items-start gap-5"
                >
                    <div className="w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center shrink-0 group-hover:bg-burgundy transition-colors duration-200">
                        <Briefcase size={22} className="text-burgundy group-hover:text-white transition-colors duration-200" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-base font-bold text-slate-900 mb-1">Job Management</h2>
                        <p className="text-sm text-slate-500 leading-relaxed">Create, edit, and delete job postings. View and manage applicants for each position.</p>
                    </div>
                    <ArrowRight size={18} className="text-slate-300 group-hover:text-burgundy group-hover:translate-x-1 transition-all duration-200 mt-0.5 shrink-0" />
                </Link>
            </div>
        </div>
    );
}
