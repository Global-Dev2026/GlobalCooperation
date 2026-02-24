
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/admin/jobs" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                    <h2 className="text-xl font-semibold mb-2">Manage Jobs</h2>
                    <p className="text-gray-600">Create, edit, and delete job postings.</p>
                </Link>
                {/* Future modules can be added here */}
            </div>
        </div>
    );
}
