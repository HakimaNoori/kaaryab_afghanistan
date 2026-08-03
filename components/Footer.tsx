"use client";

import Link from "next/link";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400 mb-3">
                            <Briefcase className="w-5 h-5" />
                            KaarYab Afghanistan
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t.footer.description}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {t.footer.quickLinks}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/opportunities" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    {t.nav.opportunities}
                                </Link>
                            </li>
                            <li>
                                <Link href="/saved" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    {t.nav.saved}
                                </Link>
                            </li>
                            <li>
                                <Link href="/add-opportunity" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    {t.nav.addOpportunity}
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                                    {t.nav.about}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            {t.footer.note}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t.footer.demoNote}
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} KaarYab Afghanistan. {t.footer.copyright}
                </div>
            </div>
        </footer>
    );
}