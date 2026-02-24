"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Users, Briefcase, X } from "lucide-react";

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
    _count?: {
        applications: number;
    };
}

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await fetch("/api/admin/jobs");
            const data = await response.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdateJob = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const jobData = {
            title: formData.get('title'),
            department: formData.get('department'),
            location: formData.get('location'),
            type: formData.get('type'),
            description: formData.get('description'),
            requirements: (formData.get('requirements') as string).split(',').map(s => s.trim()),
            responsibilities: (formData.get('responsibilities') as string).split(/[\n,]/).map(s => s.trim()).filter(Boolean),
            benefits: (formData.get('benefits') as string).split(/[\n,]/).map(s => s.trim()).filter(Boolean),
        };

        try {
            const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs';
            const method = editingJob ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jobData)
            });

            if (res.ok) {
                setShowAddModal(false);
                setEditingJob(null);
                fetchJobs();
            } else {
                console.error("Failed to save job");
            }
        } catch (error) {
            console.error("Failed to save job", error);
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return;

        try {
            const res = await fetch(`/api/admin/jobs/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchJobs();
            } else {
                console.error("Failed to delete job");
            }
        } catch (error) {
            console.error("Failed to delete job", error);
        }
    };

    const openEditModal = (job: Job) => {
        setEditingJob(job);
        setShowAddModal(true);
    };

    const openAddModal = () => {
        setEditingJob(null);
        setShowAddModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
                        <p className="text-gray-500 mt-1">Manage open positions and view applications.</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy-dark transition-colors"
                    >
                        <Plus size={20} />
                        Post New Job
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Job Title</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Department</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Location</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Applicants</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">{job.title}</td>
                                        <td className="px-6 py-4 text-gray-600">{job.department}</td>
                                        <td className="px-6 py-4 text-gray-600">{job.location}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {job.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/admin/jobs/${job.id}/applications`} className="flex items-center gap-1.5 text-burgundy hover:underline">
                                                <Users size={16} />
                                                {job._count?.applications || 0}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(job)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit Job"
                                                >
                                                    <Briefcase size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJob(job.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Job"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {jobs.length === 0 && (
                            <div className="text-center py-20 text-gray-500">
                                <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                                No jobs found. Create your first job posting!
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Job Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editingJob ? 'Edit Job' : 'Post New Job'}</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateOrUpdateJob} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    name="title"
                                    defaultValue={editingJob?.title}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        name="department"
                                        defaultValue={editingJob?.department}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    >
                                        <option value="Engineering">Engineering</option>
                                        <option value="Design">Design</option>
                                        <option value="Product">Product</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <select
                                        name="location"
                                        defaultValue={editingJob?.location}
                                        required
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    >
                                        <option value="Remote">Remote</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    name="type"
                                    defaultValue={editingJob?.type}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={editingJob?.description} // Note: simplified. In real app might be Job model field if it exists. 
                                    // Wait, Job model schema in step 348 had description.
                                    // Wait, page.tsx step 347 interface Job didn't have description?
                                    // I should check interface Job in step 347.
                                    // It: id, title, department, location, type, isActive, _count. NO description.
                                    // But the API HAS description.
                                    // So the frontend fetchJobs might not satisfy the full job details if I just fetch generic list.
                                    // The list endpoint returns whatever findMany returns.
                                    // If findMany selects all fields, then the object HAS description even if TS interface says no.
                                    // I will update the interface Job to include description and requirements to avoid TS errors.
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    placeholder="Job description..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                                <textarea
                                    name="requirements"
                                    defaultValue={(editingJob as any)?.requirements?.join(', ')}
                                    required
                                    rows={2}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    placeholder="React, TypeScript, Node.js..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Key Responsibilities (one per line or comma separated)</label>
                                <textarea
                                    name="responsibilities"
                                    defaultValue={(editingJob as any)?.responsibilities?.join('\n')}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    placeholder="Lead the frontend team...&#10;Architect scalable solutions..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">What We Offer (one per line or comma separated)</label>
                                <textarea
                                    name="benefits"
                                    defaultValue={(editingJob as any)?.benefits?.join('\n')}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy outline-none"
                                    placeholder="Competitive salary...&#10;Remote work..."
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy-dark shadow-md hover:shadow-lg transition-all">
                                    {editingJob ? 'Update Job' : 'Create Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
