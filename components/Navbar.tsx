"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Briefcase } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "/opportunities", label: "Opportunities" },
    { href: "/saved", label: "Saved" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/add-opportunity", label: "Add Opportunity" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
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
                        <div className="ml-2">
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
                    </div>
                </div>
            )}
        </nav>
    );
}