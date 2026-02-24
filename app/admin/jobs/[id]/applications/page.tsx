"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, FileText, Calendar, Download, Users } from "lucide-react";

interface Application {
    id: string;
    name: string;
    email: string;
    resumeUrl: string;
    coverLetter: string | null;
    status: string;
    createdAt: string;
}

export default function JobApplicationsPage() {
    const params = useParams();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (params.id) {
            fetchApplications(params.id as string);
        }
    }, [params.id]);

    const fetchApplications = async (jobId: string) => {
        try {
            const response = await fetch(`/api/admin/jobs/${jobId}/applications`);
            const data = await response.json();
            if (data.success) {
                setApplications(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-burgundy mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Jobs
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Applications</h1>

                {loading ? (
                    <div className="text-center py-20">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="text-gray-400 w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No applications yet</h3>
                        <p className="text-gray-500 mt-2">Wait for candidates to apply.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                                            <Mail size={14} />
                                            <a href={`mailto:${app.email}`} className="hover:text-burgundy transition-colors">{app.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                            <Calendar size={14} />
                                            {new Date(app.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href={app.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                                        >
                                            <FileText size={16} />
                                            View Resume
                                        </a>
                                    </div>
                                </div>

                                {app.coverLetter && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Cover Letter</h4>
                                        <p className="text-gray-600 text-sm whitespace-pre-wrap">{app.coverLetter}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


