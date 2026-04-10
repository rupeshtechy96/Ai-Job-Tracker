import { z } from "zod";

const jobStatuses = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export const createJobSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  jdText: z.string().trim().default(""),
  jdLink: z.string().trim().default(""),
  notes: z.string().trim().default(""),
  dateApplied: z.string().min(1, "Date applied is required"),
  status: z.enum(jobStatuses).default("Applied"),
  salaryRange: z.string().trim().optional().default(""),
  requiredSkills: z.array(z.string()).optional().default([]),
  niceToHaveSkills: z.array(z.string()).optional().default([]),
  seniority: z.string().trim().optional().default(""),
  location: z.string().trim().optional().default(""),
  resumeSuggestions: z.array(z.string()).optional().default([]),
});

export const updateJobSchema = createJobSchema.partial();

export const updateJobStatusSchema = z.object({
  status: z.enum(jobStatuses),
});

export const parseJdSchema = z.object({
  jdText: z.string().trim().min(20, "Job description should be at least 20 characters"),
});