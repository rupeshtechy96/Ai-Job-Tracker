export type JobStatus =
  | "Applied"
  | "Phone Screen"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  company: string;
  role: string;
  jdText: string;
  jdLink: string;
  notes: string;
  dateApplied: string;
  status: JobStatus;
  salaryRange?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
  resumeSuggestions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface ParsedJobData {
  company: string;
  role: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
  resumeSuggestions: string[];
}

export interface AuthenticatedUserPayload {
  userId: string;
  email: string;
}