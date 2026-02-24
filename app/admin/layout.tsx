import Link from 'next/link';
import { signOut } from '@/auth';
import { Power } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64 bg-gray-900 text-white p-6">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
                    <p className="text-gray-400 text-sm">Global Soft Solution</p>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin/jobs" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-800 hover:text-white">
                        Job Management
                    </Link>
                    {/* Add more links here */}
                </nav>
                <div className="absolute bottom-10">
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 text-black">
                            <Power className="w-6" />
                            <div className="hidden md:block">Sign Out</div>
                        </button>
                    </form>
                </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-50">{children}</div>
        </div>
    );
}
