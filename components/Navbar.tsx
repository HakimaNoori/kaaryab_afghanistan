"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Briefcase, Globe } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const links = [
        { href: "/", label: t.nav.home },
        { href: "/opportunities", label: t.nav.opportunities },
        { href: "/saved", label: t.nav.saved },
        { href: "/dashboard", label: t.nav.dashboard },
        { href: "/add-opportunity", label: t.nav.addOpportunity },
        { href: "/about", label: t.nav.about },
        { href: "/contact", label: t.nav.contact },
    ];

    const languages: { code: Language; label: string }[] = [
        { code: "en", label: "English" },
        { code: "fa", label: "دری" },
        { code: "ps", label: "پښتو" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400"
                    >
                        <Briefcase className="w-6 h-6" />
                        KaarYab
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm font-medium transition",
                                    pathname === link.href
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Switcher */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                <Globe className="w-4 h-4" />
                                {languages.find((l) => l.code === language)?.label}
                            </button>

                            {langOpen && (
                                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setLangOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                                                language === lang.code
                                                    ? "text-blue-600 dark:text-blue-400 font-medium"
                                                    : "text-gray-700 dark:text-gray-300"
                                            )}
                                        >
                                            {lang.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="ml-1">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-2 rounded-md text-gray-700 dark:text-gray-300"
                        >
                            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="px-4 py-3 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "block px-3 py-2 rounded-md text-base font-medium",
                                    pathname === link.href
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Mobile Language Switcher */}
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-800 mt-2">
                            <p className="px-3 py-1 text-xs text-gray-500">Language</p>
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "block w-full text-left px-3 py-2 rounded-md text-base font-medium",
                                        language === lang.code
                                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    )}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}