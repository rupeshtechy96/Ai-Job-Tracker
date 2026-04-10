// client/src/pages/DashboardPage.tsx

import { useMemo, useState } from "react";
import AppShell from "../components/layout/AppShell";
import StatsCards from "../components/dashboard/StatsCards";
import KanbanBoard from "../components/dashboard/KanbanBoard";
import AddApplicationModal from "../components/dashboard/AddApplicationModal";
import ApplicationDetailModal from "../components/dashboard/ApplicationDetailModal";
import ResumeSuggestions from "../components/dashboard/ResumeSuggestions";
import Loader from "../components/common/Loader";
import { useJobs } from "../hooks/useJobs";
import type { JobApplication } from "../types";

export default function DashboardPage() {
  const {
    jobs,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    updateJobStatus,
    parseJobDescription,
  } = useJobs();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  const latestSuggestions = useMemo(() => {
    if (selectedJob?.resumeSuggestions?.length) return selectedJob.resumeSuggestions;
    const latestJobWithSuggestions = [...jobs].reverse().find((job) => job.resumeSuggestions?.length);
    return latestJobWithSuggestions?.resumeSuggestions ?? [];
  }, [jobs, selectedJob]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <StatsCards jobs={jobs} />

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="grid gap-6 2xl:grid-cols-[1.45fr_0.7fr]">
          <KanbanBoard
            jobs={jobs}
            onStatusChange={updateJobStatus}
            onCardClick={(job) => setSelectedJob(job)}
            onEdit={(job) => {
              setEditingJob(job);
              setIsAddModalOpen(true);
            }}
            onDelete={async (job) => {
              await deleteJob(job.id);
              if (selectedJob?.id === job.id) setSelectedJob(null);
              if (editingJob?.id === job.id) setEditingJob(null);
            }}
            onAddApplication={() => {
              setEditingJob(null);
              setIsAddModalOpen(true);
            }}
          />

          <ResumeSuggestions suggestions={latestSuggestions} />
        </div>
      </div>

      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingJob(null);
        }}
        editingJob={editingJob}
        onParseJobDescription={parseJobDescription}
        onSubmit={async (data) => {
          if (editingJob) {
            await updateJob(editingJob.id, data);
          } else {
            await createJob(data);
          }
          setIsAddModalOpen(false);
          setEditingJob(null);
        }}
      />

      <ApplicationDetailModal
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        onEdit={(job) => {
          setSelectedJob(null);
          setEditingJob(job);
          setIsAddModalOpen(true);
        }}
        onDelete={async (job) => {
          await deleteJob(job.id);
          setSelectedJob(null);
        }}
      />
    </AppShell>
  );
}