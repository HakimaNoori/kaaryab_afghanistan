"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle } from "lucide-react";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        // In a real app, you would send this to an API
        console.log("Contact form submitted:", data);
        setSubmitted(true);
        reset();

        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Have a question, suggestion, or want to share an opportunity? Send us a message.
                </p>
            </div>

            {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    Thank you! Your message has been received.
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold">Send a Message</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Name *</label>
                            <input
                                {...register("name")}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5">Email *</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Subject *</label>
                        <input
                            {...register("subject")}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="What is this about?"
                        />
                        {errors.subject && (
                            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Message *</label>
                        <textarea
                            {...register("message")}
                            rows={5}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your message here..."
                        />
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium transition"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}