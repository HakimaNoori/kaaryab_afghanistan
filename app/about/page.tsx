import { Target, Users, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">About KaarYab Afghanistan</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A platform built to help Afghan youth find meaningful opportunities and build a better future.
                </p>
            </div>

            {/* Mission */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Many young people in Afghanistan struggle to find reliable information about jobs, internships, scholarships, remote work, and training programs. Information is scattered across different websites, social media pages, and groups. KaarYab Afghanistan solves this problem by bringing all these opportunities together in one clean and easy-to-use platform.
                </p>
            </div>

            {/* Who is it for */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-xl font-semibold">Who Is It For?</h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2">• Students</li>
                    <li className="flex items-center gap-2">• Fresh graduates</li>
                    <li className="flex items-center gap-2">• Job seekers</li>
                    <li className="flex items-center gap-2">• Women looking for remote work</li>
                    <li className="flex items-center gap-2">• People searching for scholarships</li>
                    <li className="flex items-center gap-2">• People looking for internships</li>
                    <li className="flex items-center gap-2">• Organizations sharing opportunities</li>
                </ul>
            </div>

            {/* What you can do */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-xl font-semibold">What You Can Do</h2>
                </div>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Browse and search opportunities by category, location, and type</li>
                    <li>• View full details of each opportunity</li>
                    <li>• Save opportunities for later</li>
                    <li>• Submit new opportunities</li>
                    <li>• Track statistics on the dashboard</li>
                </ul>
            </div>

            {/* Note */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h2 className="font-semibold text-amber-800 dark:text-amber-300">Important Note</h2>
                </div>
                <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                    This is a <strong>demo project</strong> built for educational purposes as a final capstone project. The opportunities shown are sample data and may not represent real current openings. Always verify information before applying.
                </p>
            </div>
        </div>
    );
}