"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useLanguage } from "@/context/LanguageContext";
import { OpportunityCategory, OpportunityType } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    organization: z.string().min(2, "Organization is required"),
    category: z.enum([
        "Job",
        "Internship",
        "Scholarship",
        "Online Course",
        "Remote Work",
        "Training Program",
        "Volunteer Work",
    ]),
    location: z.string().min(2, "Location is required"),
    type: z.enum(["Remote", "On-site", "Hybrid"]),
    deadline: z.string().min(1, "Deadline is required"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    requirements: z.string().min(5, "Please enter at least one requirement"),
    applyLink: z.string().url("Please enter a valid URL"),
    tags: z.string().min(2, "Enter at least one tag"),
});

type FormData = z.infer<typeof schema>;

const categories: OpportunityCategory[] = [
    "Job",
    "Internship",
    "Scholarship",
    "Online Course",
    "Remote Work",
    "Training Program",
    "Volunteer Work",
];

const types: OpportunityType[] = ["Remote", "On-site", "Hybrid"];

export default function EditOpportunityPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const { opportunities, updateOpportunity } = useOpportunities();
    const { language } = useLanguage();

    const opportunity = opportunities.find((op) => op.id === id);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (opportunity) {
            reset({
                title: opportunity.title,
                organization: opportunity.organization,
                category: opportunity.category,
                location: opportunity.location,
                type: opportunity.type,
                deadline: opportunity.deadline,
                description: opportunity.description,
                requirements: opportunity.requirements.join(", "),
                applyLink: opportunity.applyLink,
                tags: opportunity.tags.join(", "),
            });
        }
    }, [opportunity, reset]);

    const labels = {
        en: {
            notFound: "Opportunity Not Found",
            backToList: "Back to Opportunities",
            backToDetails: "Back to Details",
            title: "Edit Opportunity",
            subtitle: "Update the opportunity information",
            fieldTitle: "Title",
            fieldOrg: "Organization",
            fieldCategory: "Category",
            fieldType: "Type",
            fieldLocation: "Location",
            fieldDeadline: "Deadline",
            fieldDescription: "Description",
            fieldRequirements: "Requirements",
            fieldApplyLink: "Apply Link",
            fieldTags: "Tags",
            commaSeparated: "(comma separated)",
            save: "Save Changes",
            saving: "Saving...",
            cancel: "Cancel",
        },
        fa: {
            notFound: "فرصت یافت نشد",
            backToList: "بازگشت به فرصت‌ها",
            backToDetails: "بازگشت به جزئیات",
            title: "ویرایش فرصت",
            subtitle: "اطلاعات فرصت را به‌روزرسانی کنید",
            fieldTitle: "عنوان",
            fieldOrg: "سازمان",
            fieldCategory: "دسته‌بندی",
            fieldType: "نوع",
            fieldLocation: "مکان",
            fieldDeadline: "مهلت",
            fieldDescription: "توضیحات",
            fieldRequirements: "شرایط",
            fieldApplyLink: "لینک درخواست",
            fieldTags: "برچسب‌ها",
            commaSeparated: "(با کاما جدا کنید)",
            save: "ذخیره تغییرات",
            saving: "در حال ذخیره...",
            cancel: "لغو",
        },
        ps: {
            notFound: "فرصت ونه موندل شو",
            backToList: "بیرته فرصتونو ته",
            backToDetails: "بیرته تفصیلاتو ته",
            title: "فرصت سمول",
            subtitle: "د فرصت معلومات تازه کړئ",
            fieldTitle: "عنوان",
            fieldOrg: "سازمان",
            fieldCategory: "کټګوري",
            fieldType: "ډول",
            fieldLocation: "ځای",
            fieldDeadline: "موده",
            fieldDescription: "تفصیل",
            fieldRequirements: "شرایط",
            fieldApplyLink: "د غوښتنې لینک",
            fieldTags: "ټګونه",
            commaSeparated: "(په کاما جلا کړئ)",
            save: "بدلونونه خوندي کړئ",
            saving: "خوندي کېږي...",
            cancel: "لغوه",
        },
    };

    const l = labels[language];

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
                <h1 className="text-2xl font-bold mb-4">{l.notFound}</h1>
                <Link href="/opportunities" className="text-blue-600 hover:underline">
                    {l.backToList}
                </Link>
            </div>
        );
    }

    const onSubmit = (data: FormData) => {
        updateOpportunity({
            ...opportunity,
            title: data.title,
            organization: data.organization,
            category: data.category,
            location: data.location,
            type: data.type,
            deadline: data.deadline,
            description: data.description,
            requirements: data.requirements.split(",").map((r) => r.trim()).filter(Boolean),
            applyLink: data.applyLink,
            tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
        });
        router.push(`/opportunities/${id}`);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href={`/opportunities/${id}`}
                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                {l.backToDetails}
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{l.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{l.subtitle}</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
            >
                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldTitle} *</label>
                    <input
                        {...register("title")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldOrg} *</label>
                    <input
                        {...register("organization")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.organization && (
                        <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldCategory} *</label>
                        <select
                            {...register("category")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {categoryLabels[c]}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldType} *</label>
                        <select
                            {...register("type")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {types.map((item) => (
                                <option key={item} value={item}>
                                    {typeLabels[item]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldLocation} *</label>
                        <input
                            {...register("location")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldDeadline} *</label>
                        <input
                            type="date"
                            {...register("deadline")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldDescription} *</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">
                        {l.fieldRequirements} *{" "}
                        <span className="text-gray-400 font-normal">{l.commaSeparated}</span>
                    </label>
                    <input
                        {...register("requirements")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldApplyLink} *</label>
                    <input
                        {...register("applyLink")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.applyLink && (
                        <p className="text-red-500 text-sm mt-1">{errors.applyLink.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">
                        {l.fieldTags} *{" "}
                        <span className="text-gray-400 font-normal">{l.commaSeparated}</span>
                    </label>
                    <input
                        {...register("tags")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition"
                    >
                        {isSubmitting ? l.saving : l.save}
                    </button>
                    <Link
                        href={`/opportunities/${id}`}
                        className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
                    >
                        {l.cancel}
                    </Link>
                </div>
            </form>
        </div>
    );
}