"use client";

import { useOpportunities } from "@/context/OpportunitiesContext";
import { Briefcase, GraduationCap, Laptop, Clock, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { isExpiringSoon, formatDate } from "@/lib/utils";

export default function DashboardPage() {
    const { opportunities } = useOpportunities();

    const total = opportunities.length;
    const jobs = opportunities.filter((o) => o.category === "Job").length;
    const scholarships = opportunities.filter((o) => o.category === "Scholarship").length;
    const internships = opportunities.filter((o) => o.category === "Internship").length;
    const remote = opportunities.filter((o) => o.type === "Remote").length;
    const expiringSoon = opportunities.filter((o) => isExpiringSoon(o.deadline)).length;

    const recent = [...opportunities]
        .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
        .slice(0, 5);

    const stats = [
        { label: "Total Opportunities", value: total, icon: Briefcase, color: "bg-blue-500" },
        { label: "Jobs", value: jobs, icon: Briefcase, color: "bg-indigo-500" },
        { label: "Internships", value: internships, icon: Laptop, color: "bg-purple-500" },
        { label: "Scholarships", value: scholarships, icon: GraduationCap, color: "bg-green-500" },
        { label: "Remote", value: remote, icon: MapPin, color: "bg-teal-500" },
        { label: "Expiring Soon", value: expiringSoon, icon: Clock, color: "bg-orange-500" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Overview of all opportunities</p>
                </div>
                <Link
                    href="/add-opportunity"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                >
                    <Plus className="w-4 h-4" />
                    Add Opportunity
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
                    >
                        <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                            <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Opportunities */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="font-semibold text-lg">Recent Opportunities</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">Title</th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">Category</th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">Location</th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">Deadline</th>
                                <th className="text-left px-6 py-3 font-medium text-gray-500">Type</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {recent.map((op) => (
                                <tr key={op.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                    <td className="px-6 py-3">
                                        <Link
                                            href={`/opportunities/${op.id}`}
                                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                        >
                                            {op.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3">{op.category}</td>
                                    <td className="px-6 py-3">{op.location}</td>
                                    <td className="px-6 py-3">{formatDate(op.deadline)}</td>
                                    <td className="px-6 py-3">{op.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}