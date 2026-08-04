"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Opportunity, OpportunityCategory, OpportunityType } from "@/lib/types";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useLanguage } from "@/context/LanguageContext";

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

export default function AddOpportunityPage() {
    const router = useRouter();
    const { addOpportunity } = useOpportunities();
    const { language } = useLanguage();
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const labels = {
        en: {
            title: "Add New Opportunity",
            subtitle: "Share a job, internship, scholarship or other opportunity",
            success: "Opportunity added successfully! Redirecting...",
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
            selectCategory: "Select category",
            selectType: "Select type",
            submit: "Add Opportunity",
            submitting: "Submitting...",
            placeholders: {
                title: "e.g. Frontend Developer Intern",
                org: "e.g. Kabul Tech Community",
                location: "e.g. Kabul or Online",
                description: "Describe the opportunity...",
                requirements: "e.g. Basic React, HTML/CSS, GitHub",
                applyLink: "https://example.com/apply",
                tags: "e.g. React, Next.js, Internship",
            },
        },
        fa: {
            title: "افزودن فرصت جدید",
            subtitle: "یک شغل، کارآموزی، بورسیه یا فرصت دیگر را به اشتراک بگذارید",
            success: "فرصت با موفقیت اضافه شد! در حال انتقال...",
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
            selectCategory: "انتخاب دسته‌بندی",
            selectType: "انتخاب نوع",
            submit: "افزودن فرصت",
            submitting: "در حال ارسال...",
            placeholders: {
                title: "مثال: کارآموزی فرانت‌اند",
                org: "مثال: جامعه فناوری کابل",
                location: "مثال: کابل یا آنلاین",
                description: "فرصت را توضیح دهید...",
                requirements: "مثال: React پایه، HTML/CSS، GitHub",
                applyLink: "https://example.com/apply",
                tags: "مثال: React، Next.js، کارآموزی",
            },
        },
        ps: {
            title: "نوی فرصت اضافه کړئ",
            subtitle: "دنده، انټرنشپ، سکالرشیپ یا بل فرصت شریک کړئ",
            success: "فرصت په بریالیتوب سره اضافه شو! لیږدول کېږي...",
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
            selectCategory: "کټګوري وټاکئ",
            selectType: "ډول وټاکئ",
            submit: "فرصت اضافه کړئ",
            submitting: "استول کېږي...",
            placeholders: {
                title: "مثال: فرانت‌اینډ انټرن",
                org: "مثال: کابل ټیک ټولنه",
                location: "مثال: کابل یا آنلاین",
                description: "فرصت توضیح کړئ...",
                requirements: "مثال: Basic React، HTML/CSS، GitHub",
                applyLink: "https://example.com/apply",
                tags: "مثال: React، Next.js، انټرنشپ",
            },
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

    const onSubmit = (data: FormData) => {
        const newOpportunity: Opportunity = {
            id: Date.now().toString(),
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
            createdAt: new Date().toISOString().split("T")[0],
        };

        addOpportunity(newOpportunity);
        setSuccess(true);
        reset();

        setTimeout(() => {
            router.push("/opportunities");
        }, 1200);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{l.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{l.subtitle}</p>
            </div>

            {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
                    {l.success}
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
            >
                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldTitle} *</label>
                    <input
                        {...register("title")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={l.placeholders.title}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldOrg} *</label>
                    <input
                        {...register("organization")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={l.placeholders.org}
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
                            <option value="">{l.selectCategory}</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {categoryLabels[c]}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldType} *</label>
                        <select
                            {...register("type")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">{l.selectType}</option>
                            {types.map((item) => (
                                <option key={item} value={item}>
                                    {typeLabels[item]}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldLocation} *</label>
                        <input
                            {...register("location")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={l.placeholders.location}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">{l.fieldDeadline} *</label>
                        <input
                            type="date"
                            {...register("deadline")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.deadline && (
                            <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldDescription} *</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={l.placeholders.description}
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
                        placeholder={l.placeholders.requirements}
                    />
                    {errors.requirements && (
                        <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">{l.fieldApplyLink} *</label>
                    <input
                        {...register("applyLink")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={l.placeholders.applyLink}
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
                        placeholder={l.placeholders.tags}
                    />
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition"
                >
                    {isSubmitting ? l.submitting : l.submit}
                </button>
            </form>
        </div>
    );
}