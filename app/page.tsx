"use client";

import Link from "next/link";
import { ArrowRight, Search, PlusCircle } from "lucide-react";
import OpportunityCard from "@/components/OpportunityCard";
import { useOpportunities } from "@/context/OpportunitiesContext";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { opportunities } = useOpportunities();
  const { t } = useLanguage();

  const featured = opportunities.slice(0, 3);

  const categories = [
    { name: "Job", count: opportunities.filter((o) => o.category === "Job").length },
    { name: "Internship", count: opportunities.filter((o) => o.category === "Internship").length },
    { name: "Scholarship", count: opportunities.filter((o) => o.category === "Scholarship").length },
    { name: "Remote Work", count: opportunities.filter((o) => o.category === "Remote Work").length },
    { name: "Online Course", count: opportunities.filter((o) => o.category === "Online Course").length },
    { name: "Training Program", count: opportunities.filter((o) => o.category === "Training Program").length },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              {t.home.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {t.home.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/opportunities"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition"
              >
                <Search className="w-5 h-5" />
                {t.home.browse}
              </Link>
              <Link
                href="/add-opportunity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/30 text-white font-semibold hover:bg-blue-500/40 transition border border-white/30"
              >
                <PlusCircle className="w-5 h-5" />
                {t.home.add}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: t.home.total, value: opportunities.length },
            { label: t.home.jobs, value: opportunities.filter((o) => o.category === "Job").length },
            { label: t.home.scholarships, value: opportunities.filter((o) => o.category === "Scholarship").length },
            { label: t.home.remote, value: opportunities.filter((o) => o.type === "Remote").length },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 text-center shadow-sm"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">{t.home.browseByCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/opportunities?category=${encodeURIComponent(cat.name)}`}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-blue-400 dark:hover:border-blue-500 transition"
            >
              <div className="font-medium text-sm">{cat.name}</div>
              <div className="text-xs text-gray-500 mt-1">
                {cat.count} {t.home.available}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.home.featured}</h2>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            {t.home.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((op) => (
            <OpportunityCard key={op.id} opportunity={op} />
          ))}
        </div>
      </section>
    </div>
  );
}