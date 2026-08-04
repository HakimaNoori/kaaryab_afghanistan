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
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function OpportunityDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const { opportunities, deleteOpportunity } = useOpportunities();
    const { isSaved, toggleSave } = useSaved();
    const { language } = useLanguage();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const opportunity = opportunities.find((op) => op.id === id);

    const texts = {
        en: {
            notFound: "Opportunity Not Found",
            notFoundDesc: "This opportunity does not exist or has been removed.",
            back: "Back to Opportunities",
            deadline: "Deadline",
            applyNow: "Apply Now",
            save: "Save",
            saved: "Saved",
            edit: "Edit",
            delete: "Delete",
            deleteTitle: "Delete Opportunity?",
            deleteDesc: "Are you sure you want to delete this opportunity? This action cannot be undone.",
            cancel: "Cancel",
            description: "Description",
            requirements: "Requirements",
            tags: "Tags",
            expiringSoon: "Expiring Soon",
            expired: "Expired",
        },
        fa: {
            notFound: "فرصت یافت نشد",
            notFoundDesc: "این فرصت وجود ندارد یا حذف شده است.",
            back: "بازگشت به فرصت‌ها",
            deadline: "مهلت",
            applyNow: "درخواست دهید",
            save: "ذخیره",
            saved: "ذخیره شد",
            edit: "ویرایش",
            delete: "حذف",
            deleteTitle: "حذف فرصت؟",
            deleteDesc: "آیا مطمئن هستید که می‌خواهید این فرصت را حذف کنید؟ این عمل قابل بازگشت نیست.",
            cancel: "لغو",
            description: "توضیحات",
            requirements: "شرایط",
            tags: "برچسب‌ها",
            expiringSoon: "به زودی منقضی",
            expired: "منقضی شده",
        },
        ps: {
            notFound: "فرصت ونه موندل شو",
            notFoundDesc: "دا فرصت شتون نلري یا ړنګ شوی دی.",
            back: "بیرته فرصتونو ته",
            deadline: "موده",
            applyNow: "اوس غوښتنه وکړئ",
            save: "خوندي کړئ",
            saved: "خوندي شو",
            edit: "سمون",
            delete: "ړنګول",
            deleteTitle: "فرصت ړنګ کړئ؟",
            deleteDesc: "آیا ډاډه یاست چې دا فرصت ړنګ کړئ؟ دا عمل بیرته نه راګرځي.",
            cancel: "لغوه",
            description: "تفصیل",
            requirements: "شرایط",
            tags: "ټګونه",
            expiringSoon: "نږدې پای ته رسېږي",
            expired: "پای ته رسېدلی",
        },
    };

    const t = texts[language];

    const categoryLabels: Record<string, string> = {
        Job: language === "fa" ? "شغل" : language === "ps" ? "دنده" : "Job",
        Internship: language === "fa" ? "کارآموزی" : language === "ps" ? "انټرنشپ" : "Internship",
        Scholarship: language === "fa" ? "بورسیه" : language === "ps" ? "سکالرشیپ" : "Scholarship",
        "Online Course": language === "fa" ? "دوره آنلاین" : language === "ps" ? "آنلاین کورس" : "Online Course",
        "Remote Work": language === "fa" ? "کار ریموت" : language === "ps" ? "ریموټ کار" : "Remote Work",
        "Training Program": language === "fa" ? "برنامه آموزشی" : language === "ps" ? "روزنیز پروګرام" : "Training Program",
        "Volunteer Work": language === "fa" ? "کار داوطلبانه" : language === "ps" ? "رضاکارانه کار" : "Volunteer Work",
    };

    const typeLabels: Record<string, string> = {
        Remote: language === "fa" ? "ریموت" : language === "ps" ? "ریموټ" : "Remote",
        "On-site": language === "fa" ? "حضوری" : language === "ps" ? "په ځای" : "On-site",
        Hybrid: language === "fa" ? "ترکیبی" : language === "ps" ? "ګډ" : "Hybrid",
    };

    if (!opportunity) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{t.notFound}</h1>
                <p className="text-gray-500 mb-6">{t.notFoundDesc}</p>
                <Link
                    href="/opportunities"
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t.back}
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
                {t.back}
            </Link>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {categoryLabels[opportunity.category] || opportunity.category}
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
                        {typeLabels[opportunity.type] || opportunity.type}
                    </span>
                    {expiringSoon && !expired && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                            {t.expiringSoon}
                        </span>
                    )}
                    {expired && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">
                            {t.expired}
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
                        {t.deadline}: {formatDate(opportunity.deadline)}
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={opportunity.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                    >
                        {t.applyNow}
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
                                {t.saved}
                            </>
                        ) : (
                            <>
                                <Bookmark className="w-4 h-4" />
                                {t.save}
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t.delete}
                    </button>

                    <Link
                        href={`/opportunities/${opportunity.id}/edit`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        {t.edit}
                    </Link>
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-xl">
                        <h3 className="text-lg font-semibold mb-2">{t.deleteTitle}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                            {t.deleteDesc}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                {t.cancel}
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                            >
                                {t.delete}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold mb-3">{t.description}</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {opportunity.description}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-6">
                <h2 className="text-lg font-semibold mb-4">{t.requirements}</h2>
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
                <h2 className="text-lg font-semibold mb-3">{t.tags}</h2>
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