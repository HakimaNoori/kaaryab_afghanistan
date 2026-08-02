"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useSaved } from "@/context/SavedContext";
import OpportunityCard from "@/components/OpportunityCard";
import { useEffect } from "react";
import { opportunities } from "@/data/opportunities";

export default function SavedPage() {
    const { savedOpportunities, setAllOpportunities, savedIds } = useSaved();

    useEffect(() => {
        setAllOpportunities(opportunities);
    }, [setAllOpportunities]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Saved Opportunities</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Opportunities you have bookmarked for later
                </p>
            </div>

            {savedIds.length === 0 ? (
                <div className="text-center py-20">
                    <Bookmark className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No saved opportunities yet</h2>
                    <p className="text-gray-500 mb-6">
                        Browse opportunities and click the bookmark icon to save them here.
                    </p>
                    <Link
                        href="/opportunities"
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    >
                        Browse Opportunities
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {savedOpportunities.length} saved opportunity
                        {savedOpportunities.length !== 1 ? "ies" : ""}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedOpportunities.map((op) => (
                            <OpportunityCard key={op.id} opportunity={op} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}