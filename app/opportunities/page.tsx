"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import OpportunityCard from "@/components/OpportunityCard";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useSaved } from "@/context/SavedContext";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Filter } from "lucide-react";

const categories = [
    "All",
    "Job",
    "Internship",
    "Scholarship",
    "Online Course",
    "Remote Work",
    "Training Program",
    "Volunteer Work",
];

const types = ["All", "Remote", "On-site", "Hybrid"];

export default function OpportunitiesPage() {
    const searchParams = useSearchParams();
    const { opportunities } = useOpportunities();
    const { setAllOpportunities } = useSaved();
    const { t } = useLanguage();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [type, setType] = useState("All");
    const [location, setLocation] = useState("");

    useEffect(() => {
        setAllOpportunities(opportunities);
    }, [opportunities, setAllOpportunities]);

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) setCategory(cat);
    }, [searchParams]);

    const filtered = useMemo(() => {
        return opportunities.filter((op) => {
            const matchSearch =
                op.title.toLowerCase().includes(search.toLowerCase()) ||
                op.organization.toLowerCase().includes(search.toLowerCase()) ||
                op.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

            const matchCategory = category === "All" || op.category === category;
            const matchType = type === "All" || op.type === type;
            const matchLocation =
                !location || op.location.toLowerCase().includes(location.toLowerCase());

            return matchSearch && matchCategory && matchType && matchLocation;
        });
    }, [opportunities, search, category, type, location]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{t.opportunities.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t.opportunities.subtitle}</p>
            </div>

            {/* Search & Filters */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 mb-8 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={t.opportunities.searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{t.opportunities.filters}</span>
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {types.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {t.opportunities.showing} {filtered.length}{" "}
                {filtered.length === 1 ? t.opportunities.opportunity : t.opportunities.opportunities}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">{t.opportunities.noResults}</p>
                    <p className="text-gray-400 text-sm mt-2">{t.opportunities.tryFilters}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((op) => (
                        <OpportunityCard key={op.id} opportunity={op} />
                    ))}
                </div>
            )}
        </div>
    );
}