"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Building2,
    ExternalLink,
    Bookmark,
    BookmarkCheck,
    CheckCircle2,
    Trash2,
} from "lucide-react";
import { formatDate, isExpired, isExpiringSoon, cn } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useState } from "react";

export default function OpportunityDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { opportunities, deleteOpportunity } = useOpportunities();
    const { isSaved, toggleSave } = useSaved();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const opportunity = opportunities.find((op) => op.id === id);

    if (!opportunity) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Opportunity Not Found</h1>
                <p className="text-gray-500 mb-6">This opportunity does not exist or has been removed.</p>
                <Link href="/opportunities" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Opportunities
                </Link>
            </div>
        );
    }

    const saved = isSaved(opportunity.id);
    const expired = isExpired(opportunity.deadline);
    const expiringSoon = isExpiringSoon(opportunity.deadline);

    const handleDelete = () => {
        deleteOpportunity(opportunity.id);
        router.push("/opportunities");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Opportunities
            </Link>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {opportunity.category}
                    </span>
                    <span
                        className={cn(
                            "text-xs font-medium px-2.5 py-1 rounded-full",
                            opportunity.type === "Remote"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                : opportunity.type === "Hybrid"
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        )}
                    >
                        {opportunity.type}
                    </span>
                    {expiringSoon && !expired && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                            Expiring Soon
                        </span>
                    )}
                    {expired && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                            Expired
                        </span>
                    )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {opportunity.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {opportunity.organization}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {opportunity.location}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Deadline: {formatDate(opportunity.deadline)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={opportunity.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                        onClick={() => toggleSave(opportunity.id)}
                        className={cn(
                            "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition border",
                            saved
                                ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300"
                                : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                        )}
                    >
                        {saved ? (
                            <>
                                <BookmarkCheck className="w-4 h-4" />
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark className="w-4 h-4" />
                                Save
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>

                    <Link
                        href={`/opportunities/${opportunity.id}/edit`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Edit
                    </Link>

                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-semibold mb-2">Delete Opportunity?</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            Are you sure you want to delete &quot;{opportunity.title}&quot;? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {opportunity.description}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                <ul className="space-y-2">
                    {opportunity.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            {req}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8">
                <h2 className="text-lg font-semibold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                    {opportunity.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}