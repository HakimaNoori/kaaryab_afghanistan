"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Opportunity, OpportunityCategory, OpportunityType } from "@/lib/types";
import { useOpportunities } from "@/context/OpportunitiesContext";

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
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

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
                <h1 className="text-3xl font-bold mb-2">Add New Opportunity</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Share a job, internship, scholarship or other opportunity
                </p>
            </div>

            {success && (
                <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800">
                    Opportunity added successfully! Redirecting...
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
            >
                <div>
                    <label className="block text-sm font-medium mb-1.5">Title *</label>
                    <input
                        {...register("title")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Frontend Developer Intern"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Organization *</label>
                    <input
                        {...register("organization")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Kabul Tech Community"
                    />
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Category *</label>
                        <select
                            {...register("category")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Type *</label>
                        <select
                            {...register("type")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select type</option>
                            {types.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Location *</label>
                        <input
                            {...register("location")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g. Kabul or Online"
                        />
                        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Deadline *</label>
                        <input
                            type="date"
                            {...register("deadline")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Description *</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe the opportunity..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">
                        Requirements * <span className="text-gray-400 font-normal">(comma separated)</span>
                    </label>
                    <input
                        {...register("requirements")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Basic React, HTML/CSS, GitHub"
                    />
                    {errors.requirements && <p className="text-red-500 text-sm mt-1">{errors.requirements.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Apply Link *</label>
                    <input
                        {...register("applyLink")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/apply"
                    />
                    {errors.applyLink && <p className="text-red-500 text-sm mt-1">{errors.applyLink.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">
                        Tags * <span className="text-gray-400 font-normal">(comma separated)</span>
                    </label>
                    <input
                        {...register("tags")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. React, Next.js, Internship"
                    />
                    {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition"
                >
                    {isSubmitting ? "Submitting..." : "Add Opportunity"}
                </button>
            </form>
        </div>
    );
}