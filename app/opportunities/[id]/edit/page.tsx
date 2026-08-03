"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useOpportunities } from "@/context/OpportunitiesContext";
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

    if (!opportunity) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Opportunity Not Found</h1>
                <Link href="/opportunities" className="text-blue-600 hover:underline">
                    Back to Opportunities
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
                Back to Details
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Edit Opportunity</h1>
                <p className="text-gray-600 dark:text-gray-400">Update the opportunity information</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 space-y-5"
            >
                <div>
                    <label className="block text-sm font-medium mb-1.5">Title *</label>
                    <input
                        {...register("title")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Organization *</label>
                    <input
                        {...register("organization")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Type *</label>
                        <select
                            {...register("type")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {types.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Location *</label>
                        <input
                            {...register("location")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Deadline *</label>
                        <input
                            type="date"
                            {...register("deadline")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Description *</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1.5">Apply Link *</label>
                    <input
                        {...register("applyLink")}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                    <Link
                        href={`/opportunities/${id}`}
                        className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition text-center"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}