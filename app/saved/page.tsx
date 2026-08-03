"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useSaved } from "@/context/SavedContext";
import OpportunityCard from "@/components/OpportunityCard";
import { useEffect } from "react";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SavedPage() {
    const { savedOpportunities, setAllOpportunities, savedIds } = useSaved();
    const { opportunities } = useOpportunities();
    const { t } = useLanguage();

    useEffect(() => {
        setAllOpportunities(opportunities);
    }, [opportunities, setAllOpportunities]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t.saved.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t.saved.subtitle}</p>
            </div>

            {savedIds.length === 0 ? (
                <div className="text-center py-20">
                    <Bookmark className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{t.saved.emptyTitle}</h2>
                    <p className="text-gray-500 mb-6">{t.saved.emptyText}</p>
                    <Link
                        href="/opportunities"
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    >
                        {t.saved.browse}
                    </Link>
                </div>
            ) : (
                <>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        {savedOpportunities.length} {t.opportunities.opportunities}
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