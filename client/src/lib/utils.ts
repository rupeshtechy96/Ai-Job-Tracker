import type { JobApplication, JobStatus } from "../types";

export const JOB_STATUSES: JobStatus[] = [
  "Applied",
  "Phone Screen",
  "Interview",
  "Offer",
  "Rejected"
];

export function cn(
  ...classes: Array<string | false | null | undefined | 0>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDisplayDate(dateString: string): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function getStatusBadgeClasses(status: JobStatus): string {
  switch (status) {
    case "Applied":
      return "border border-sky-400/20 bg-sky-500/15 text-sky-200";
    case "Phone Screen":
      return "border border-amber-400/20 bg-amber-500/15 text-amber-200";
    case "Interview":
      return "border border-violet-400/20 bg-violet-500/15 text-violet-200";
    case "Offer":
      return "border border-emerald-400/20 bg-emerald-500/15 text-emerald-200";
    case "Rejected":
      return "border border-rose-400/20 bg-rose-500/15 text-rose-200";
    default:
      return "border border-slate-400/20 bg-slate-500/15 text-slate-200";
  }
}

export function groupJobsByStatus(
  jobs: JobApplication[]
): Record<JobStatus, JobApplication[]> {
  return {
    Applied: jobs.filter((job) => job.status === "Applied"),
    "Phone Screen": jobs.filter((job) => job.status === "Phone Screen"),
    Interview: jobs.filter((job) => job.status === "Interview"),
    Offer: jobs.filter((job) => job.status === "Offer"),
    Rejected: jobs.filter((job) => job.status === "Rejected")
  };
}

export function getApplicationStats(jobs: JobApplication[]) {
  return {
    total: jobs.length,
    applied: jobs.filter((job) => job.status === "Applied").length,
    phoneScreen: jobs.filter((job) => job.status === "Phone Screen").length,
    interview: jobs.filter((job) => job.status === "Interview").length,
    offer: jobs.filter((job) => job.status === "Offer").length,
    rejected: jobs.filter((job) => job.status === "Rejected").length
  };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}