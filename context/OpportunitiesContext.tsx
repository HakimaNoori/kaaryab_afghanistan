"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Opportunity } from "@/lib/types";
import { opportunities as initialOpportunities } from "@/data/opportunities";

interface OpportunitiesContextType {
    opportunities: Opportunity[];
    addOpportunity: (op: Opportunity) => void;
    updateOpportunity: (op: Opportunity) => void;
    deleteOpportunity: (id: string) => void;
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

export function OpportunitiesProvider({ children }: { children: React.ReactNode }) {
    const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);

    useEffect(() => {
        const custom = localStorage.getItem("customOpportunities");
        if (custom) {
            try {
                const customOps: Opportunity[] = JSON.parse(custom);
                setOpportunities([...initialOpportunities, ...customOps]);
            } catch {
                setOpportunities(initialOpportunities);
            }
        }
    }, []);

    const saveCustom = (allOps: Opportunity[]) => {
        const customOnly = allOps.filter(
            (op) => !initialOpportunities.some((init) => init.id === op.id)
        );
        localStorage.setItem("customOpportunities", JSON.stringify(customOnly));
    };

    const addOpportunity = (op: Opportunity) => {
        setOpportunities((prev) => {
            const updated = [...prev, op];
            saveCustom(updated);
            return updated;
        });
    };

    const updateOpportunity = (updatedOp: Opportunity) => {
        setOpportunities((prev) => {
            const updated = prev.map((op) => (op.id === updatedOp.id ? updatedOp : op));
            saveCustom(updated);
            return updated;
        });
    };

    const deleteOpportunity = (id: string) => {
        setOpportunities((prev) => {
            const updated = prev.filter((op) => op.id !== id);
            saveCustom(updated);
            return updated;
        });
    };

    return (
        <OpportunitiesContext.Provider
            value={{ opportunities, addOpportunity, updateOpportunity, deleteOpportunity }}
        >
            {children}
        </OpportunitiesContext.Provider>
    );
}

export function useOpportunities() {
    const context = useContext(OpportunitiesContext);
    if (!context) {
        throw new Error("useOpportunities must be used within OpportunitiesProvider");
    }
    return context;
}