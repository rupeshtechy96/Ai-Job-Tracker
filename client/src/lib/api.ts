import type {
  AuthMeResponse,
  AuthResponse,
  CreateJobPayload,
  JobResponse,
  JobsResponse,
  LoginPayload,
  ParseJDResponse,
  RegisterPayload,
  UpdateJobPayload
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const rawText = await response.text();
  const data = rawText ? JSON.parse(rawText) : {};

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: payload
    }),

  login: (payload: LoginPayload) =>
    apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload
    }),

  me: (token: string) =>
    apiRequest<AuthMeResponse>("/auth/me", {
      token
    })
};

export const jobsApi = {
  getAll: (token: string) =>
    apiRequest<JobsResponse>("/jobs", {
      token
    }),

  create: (payload: CreateJobPayload, token: string) =>
    apiRequest<JobResponse>("/jobs", {
      method: "POST",
      body: payload,
      token
    }),

  update: (payload: UpdateJobPayload, token: string) =>
    apiRequest<JobResponse>(`/jobs/${payload.id}`, {
      method: "PUT",
      body: payload,
      token
    }),

  updateStatus: (id: string, status: string, token: string) =>
    apiRequest<JobResponse>(`/jobs/${id}/status`, {
      method: "PATCH",
      body: { status },
      token
    }),

  delete: (id: string, token: string) =>
    apiRequest<{ success: boolean; message: string }>(`/jobs/${id}`, {
      method: "DELETE",
      token
    }),

  parseJD: (jdText: string, token: string) =>
    apiRequest<ParseJDResponse>("/jobs/parse-jd", {
      method: "POST",
      body: { jdText },
      token
    })
};