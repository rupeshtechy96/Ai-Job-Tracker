import { Response } from "express";
import { memoryDb } from "../repositories/memoryDb";
import { parseJobDescriptionWithAI } from "../services/aiService";
import {
  createJobSchema,
  parseJdSchema,
  updateJobSchema,
  updateJobStatusSchema
} from "../validators/jobValidators";
import { generateId, safeStringArray } from "../utils/helpers";
import type { AuthenticatedRequest } from "../middleware/authMiddleware";
import type { JobApplication } from "../types";

function getParamValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export async function getJobs(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const jobs = memoryDb.getJobsByUserId(req.userId);

  res.json({
    success: true,
    data: jobs
  });
}

export async function createJob(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const parsed = createJobSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid job data"
    });
    return;
  }

  const now = new Date().toISOString();

  const job: JobApplication = {
    id: generateId("job"),
    userId: req.userId,
    company: parsed.data.company,
    role: parsed.data.role,
    jdText: parsed.data.jdText ?? "",
    jdLink: parsed.data.jdLink ?? "",
    notes: parsed.data.notes ?? "",
    dateApplied: parsed.data.dateApplied,
    status: parsed.data.status,
    salaryRange: parsed.data.salaryRange ?? "",
    requiredSkills: safeStringArray(parsed.data.requiredSkills),
    niceToHaveSkills: safeStringArray(parsed.data.niceToHaveSkills),
    seniority: parsed.data.seniority ?? "",
    location: parsed.data.location ?? "",
    resumeSuggestions: safeStringArray(parsed.data.resumeSuggestions),
    createdAt: now,
    updatedAt: now
  };

  memoryDb.createJob(job);

  res.status(201).json({
    success: true,
    message: "Job application created successfully",
    data: job
  });
}

export async function updateJob(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const id = getParamValue(req.params.id);
  const existingJob = memoryDb.findJobById(id);

  if (!existingJob || existingJob.userId !== req.userId) {
    res.status(404).json({
      success: false,
      message: "Job application not found"
    });
    return;
  }

  const parsed = updateJobSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid job data"
    });
    return;
  }

  const updatedJob = memoryDb.updateJob(id, {
    ...parsed.data,
    requiredSkills: parsed.data.requiredSkills
      ? safeStringArray(parsed.data.requiredSkills)
      : existingJob.requiredSkills,
    niceToHaveSkills: parsed.data.niceToHaveSkills
      ? safeStringArray(parsed.data.niceToHaveSkills)
      : existingJob.niceToHaveSkills,
    resumeSuggestions: parsed.data.resumeSuggestions
      ? safeStringArray(parsed.data.resumeSuggestions)
      : existingJob.resumeSuggestions,
    updatedAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: "Job application updated successfully",
    data: updatedJob
  });
}

export async function updateJobStatus(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const id = getParamValue(req.params.id);
  const existingJob = memoryDb.findJobById(id);

  if (!existingJob || existingJob.userId !== req.userId) {
    res.status(404).json({
      success: false,
      message: "Job application not found"
    });
    return;
  }

  const parsed = updateJobStatusSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid status"
    });
    return;
  }

  const updatedJob = memoryDb.updateJob(id, {
    status: parsed.data.status,
    updatedAt: new Date().toISOString()
  });

  res.json({
    success: true,
    message: "Job status updated successfully",
    data: updatedJob
  });
}

export async function deleteJob(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const id = getParamValue(req.params.id);
  const existingJob = memoryDb.findJobById(id);

  if (!existingJob || existingJob.userId !== req.userId) {
    res.status(404).json({
      success: false,
      message: "Job application not found"
    });
    return;
  }

  memoryDb.deleteJob(id);

  res.json({
    success: true,
    message: "Job application deleted successfully"
  });
}

export async function parseJobDescription(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
    return;
  }

  const parsed = parseJdSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid job description"
    });
    return;
  }

  try {
    const data = await parseJobDescriptionWithAI(parsed.data.jdText);

    res.json({
      success: true,
      message: "Job description parsed successfully",
      data
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to parse job description"
    });
  }
}