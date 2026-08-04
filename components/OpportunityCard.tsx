"use client";

import Link from "next/link";
import { MapPin, Calendar, Building2, Bookmark, BookmarkCheck } from "lucide-react";
import { Opportunity } from "@/lib/types";
import { formatDate, isExpired, isExpiringSoon, cn } from "@/lib/utils";
import { useSaved } from "@/context/SavedContext";
import { useLanguage } from "@/context/LanguageContext";

interface OpportunityCardProps {
    opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
    const { isSaved, toggleSave } = useSaved();
    const { language } = useLanguage();
    const saved = isSaved(opportunity.id);
    const expired = isExpired(opportunity.deadline);
    const expiringSoon = isExpiringSoon(opportunity.deadline);

    const typeLabel =
        opportunity.type === "Remote"
            ? language === "fa"
                ? "ریموت"
                : language === "ps"
                    ? "ریموټ"
                    : "Remote"
            : opportunity.type === "Hybrid"
                ? language === "fa"
                    ? "ترکیبی"
                    : language === "ps"
                        ? "ګډ"
                        : "Hybrid"
                : language === "fa"
                    ? "حضوری"
                    : language === "ps"
                        ? "په ځای"
                        : "On-site";

    const categoryLabels: Record<string, string> = {
        Job: language === "fa" ? "شغل" : language === "ps" ? "دنده" : "Job",
        Internship: language === "fa" ? "کارآموزی" : language === "ps" ? "انټرنشپ" : "Internship",
        Scholarship: language === "fa" ? "بورسیه" : language === "ps" ? "سکالرشیپ" : "Scholarship",
        "Online Course": language === "fa" ? "دوره آنلاین" : language === "ps" ? "آنلاین کورس" : "Online Course",
        "Remote Work": language === "fa" ? "کار ریموت" : language === "ps" ? "ریموټ کار" : "Remote Work",
        "Training Program": language === "fa" ? "برنامه آموزشی" : language === "ps" ? "روزنیز پروګرام" : "Training Program",
        "Volunteer Work": language === "fa" ? "کار داوطلبانه" : language === "ps" ? "رضاکارانه کار" : "Volunteer Work",
    };

    const categoryLabel = categoryLabels[opportunity.category] || opportunity.category;

    const deadlineLabel =
        language === "fa" ? "مهلت" : language === "ps" ? "موده" : "Deadline";

    const expiringLabel =
        language === "fa" ? "به زودی منقضی" : language === "ps" ? "نږدې پای ته رسېږي" : "Expiring Soon";

    const expiredLabel =
        language === "fa" ? "منقضی شده" : language === "ps" ? "پای ته رسېدلی" : "Expired";

    const viewDetailsLabel =
        language === "fa" ? "مشاهده جزئیات" : language === "ps" ? "تفصیلات وګورئ" : "View Details";

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {categoryLabel}
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
                            {typeLabel}
                        </span>
                        {expiringSoon && !expired && (
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                                {expiringLabel}
                            </span>
                        )}
                        {expired && (
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                {expiredLabel}
                            </span>
                        )}
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-snug">
                        {opportunity.title}
                    </h3>
                </div>

                <button
                    onClick={() => toggleSave(opportunity.id)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition shrink-0"
                    aria-label={saved ? "Remove from saved" : "Save opportunity"}
                >
                    {saved ? (
                        <BookmarkCheck className="w-5 h-5 text-blue-600" />
                    ) : (
                        <Bookmark className="w-5 h-5 text-gray-400" />
                    )}
                </button>
            </div>

            <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span>{opportunity.organization}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>
                        {deadlineLabel}: {formatDate(opportunity.deadline)}
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                {opportunity.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
                {opportunity.tags.slice(0, 3).map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <Link
                href={`/opportunities/${opportunity.id}`}
                className="mt-auto inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
            >
                {viewDetailsLabel}
            </Link>
        </div>
    );
}