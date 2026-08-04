export type OpportunityCategory =
    | "Job"
    | "Internship"
    | "Scholarship"
    | "Online Course"
    | "Remote Work"
    | "Training Program"
    | "Volunteer Work";

export type OpportunityType = "Remote" | "On-site" | "Hybrid";

export interface Opportunity {
    id: string;
    title: string;
    titleFa?: string;
    titlePs?: string;
    organization: string;
    organizationFa?: string;
    organizationPs?: string;
    category: OpportunityCategory;
    location: string;
    locationFa?: string;
    locationPs?: string;
    type: OpportunityType;
    deadline: string;
    description: string;
    descriptionFa?: string;
    descriptionPs?: string;
    requirements: string[];
    requirementsFa?: string[];
    requirementsPs?: string[];
    applyLink: string;
    tags: string[];
    createdAt?: string;
}