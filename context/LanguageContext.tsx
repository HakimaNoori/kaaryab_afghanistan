"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, TranslationKeys } from "@/lib/translations";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationKeys;
    dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en");

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language | null;
        if (saved && ["en", "fa", "ps"].includes(saved)) {
            setLanguageState(saved);
            document.documentElement.lang = saved === "en" ? "en" : saved === "fa" ? "fa" : "ps";
            document.documentElement.dir = saved === "en" ? "ltr" : "rtl";
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
        document.documentElement.lang = lang === "en" ? "en" : lang === "fa" ? "fa" : "ps";
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    };

    const t = translations[language];
    const dir = language === "en" ? "ltr" : "rtl";

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
}