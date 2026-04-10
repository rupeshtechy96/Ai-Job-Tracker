import { useCallback, useEffect, useState } from "react";
import { jobsApi } from "../lib/api";
import { useAuthStore } from "../store/authStore";
import type {
  ApplicationFormData,
  JobApplication,
  JobStatus,
  ParsedJobData,
  UpdateJobPayload
} from "../types";

export function useJobs() {
  const token = useAuthStore((state) => state.token);

  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = useCallback(async () => {
    if (!token) {
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await jobsApi.getAll(token);
      setJobs(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  const createJob = async (data: ApplicationFormData) => {
    if (!token) throw new Error("Unauthorized");
    const response = await jobsApi.create(data, token);
    setJobs((prev) => [response.data, ...prev]);
    return response.data;
  };

  const updateJob = async (id: string, data: Partial<ApplicationFormData>) => {
    if (!token) throw new Error("Unauthorized");

    const payload: UpdateJobPayload = {
      id,
      ...data
    };

    const response = await jobsApi.update(payload, token);
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? response.data : job))
    );
    return response.data;
  };

  const deleteJob = async (id: string) => {
    if (!token) throw new Error("Unauthorized");
    await jobsApi.delete(id, token);
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const updateJobStatus = async (id: string, status: JobStatus) => {
    if (!token) throw new Error("Unauthorized");
    const response = await jobsApi.updateStatus(id, status, token);
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? response.data : job))
    );
    return response.data;
  };

  const parseJobDescription = async (jdText: string): Promise<ParsedJobData> => {
    if (!token) throw new Error("Unauthorized");
    const response = await jobsApi.parseJD(jdText, token);
    return response.data;
  };

  return {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    updateJobStatus,
    parseJobDescription,
    refetchJobs: loadJobs
  };
}