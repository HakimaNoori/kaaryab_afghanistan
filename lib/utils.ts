import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Opportunity } from "./types";
import { Language } from "./translations";

export function getLocalizedText(
    opportunity: Opportunity,
    field: "title" | "organization" | "location" | "description",
    language: Language
): string {
    if (language === "fa") {
        const faKey = `${field}Fa` as keyof Opportunity;
        const value = opportunity[faKey];
        if (typeof value === "string" && value) return value;
    }
    if (language === "ps") {
        const psKey = `${field}Ps` as keyof Opportunity;
        const value = opportunity[psKey];
        if (typeof value === "string" && value) return value;
    }
    return opportunity[field] as string;
}

export function getLocalizedRequirements(
    opportunity: Opportunity,
    language: Language
): string[] {
    if (language === "fa" && opportunity.requirementsFa?.length) {
        return opportunity.requirementsFa;
    }
    if (language === "ps" && opportunity.requirementsPs?.length) {
        return opportunity.requirementsPs;
    }
    return opportunity.requirements;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function isExpired(deadline: string) {
    return new Date(deadline) < new Date();
}

export function isExpiringSoon(deadline: string) {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
}