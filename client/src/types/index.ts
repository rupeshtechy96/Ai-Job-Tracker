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
}

export interface AuthData {
  token: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}

export interface AuthMeResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
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
  salaryRange: string;
  jdLink: string;
  notes: string;
  resumeSuggestions: string[];
}

export interface JobApplication {
  id: string;
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
  createdAt?: string;
  updatedAt?: string;
}

export interface ParseJDResponse {
  success: boolean;
  message: string;
  data: ParsedJobData;
}

export interface JobsResponse {
  success: boolean;
  data: JobApplication[];
  message?: string;
}

export interface JobResponse {
  success: boolean;
  message: string;
  data: JobApplication;
}

export interface CreateJobPayload {
  company: string;
  role: string;
  jdText?: string;
  jdLink?: string;
  notes?: string;
  dateApplied: string;
  status: JobStatus;
  salaryRange?: string;
  requiredSkills?: string[];
  niceToHaveSkills?: string[];
  seniority?: string;
  location?: string;
  resumeSuggestions?: string[];
}

export interface UpdateJobPayload extends Partial<CreateJobPayload> {
  id: string;
}

export interface ApplicationFormData {
  company: string;
  role: string;
  jdText: string;
  jdLink: string;
  notes: string;
  dateApplied: string;
  status: JobStatus;
  salaryRange: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  seniority: string;
  location: string;
  resumeSuggestions: string[];
}