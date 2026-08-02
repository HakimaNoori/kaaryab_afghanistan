"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Opportunity } from "@/lib/types";

interface SavedContextType {
    savedIds: string[];
    toggleSave: (id: string) => void;
    isSaved: (id: string) => boolean;
    savedOpportunities: Opportunity[];
    setAllOpportunities: (ops: Opportunity[]) => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("savedOpportunities");
        if (saved) {
            setSavedIds(JSON.parse(saved));
        }
    }, []);

    const toggleSave = (id: string) => {
        setSavedIds((prev) => {
            const newIds = prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];
            localStorage.setItem("savedOpportunities", JSON.stringify(newIds));
            return newIds;
        });
    };

    const isSaved = (id: string) => savedIds.includes(id);

    const savedOpportunities = allOpportunities.filter((op) =>
        savedIds.includes(op.id)
    );

    return (
        <SavedContext.Provider
            value={{
                savedIds,
                toggleSave,
                isSaved,
                savedOpportunities,
                setAllOpportunities,
            }}
        >
            {children}
        </SavedContext.Provider>
    );
}

export function useSaved() {
    const context = useContext(SavedContext);
    if (!context) {
        throw new Error("useSaved must be used within SavedProvider");
    }
    return context;
}