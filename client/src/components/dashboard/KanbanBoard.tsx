// client/src/components/dashboard/KanbanBoard.tsx

import { useMemo } from "react";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import type { JobApplication, JobStatus } from "../../types";
import { JOB_STATUSES, groupJobsByStatus } from "../../lib/utils";
import Button from "../common/Button";
import JobCard from "./JobCard";

type KanbanBoardProps = {
  jobs: JobApplication[];
  onStatusChange: (jobId: string, status: JobStatus) => void;
  onCardClick: (job: JobApplication) => void;
  onEdit: (job: JobApplication) => void;
  onDelete: (job: JobApplication) => void;
  onAddApplication: () => void;
};

type ColumnProps = {
  status: JobStatus;
  jobs: JobApplication[];
  onCardClick: (job: JobApplication) => void;
  onEdit: (job: JobApplication) => void;
  onDelete: (job: JobApplication) => void;
};

function Column({ status, jobs, onCardClick, onEdit, onDelete }: ColumnProps) {
  return (
    <div className="min-h-[420px] rounded-3xl border border-white/10 bg-slate-900/55 p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{status}</h3>
          <p className="text-xs text-slate-400">{jobs.length} applications</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {jobs.length}
        </span>
      </div>

      <SortableContext items={jobs.map((job) => job.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => onCardClick(job)}
                onEdit={() => onEdit(job)}
                onDelete={() => onDelete(job)}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 px-4 py-10 text-center">
              <p className="text-sm text-slate-400">No applications in {status.toLowerCase()} yet.</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default function KanbanBoard({
  jobs,
  onStatusChange,
  onCardClick,
  onEdit,
  onDelete,
  onAddApplication,
}: KanbanBoardProps) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const groupedJobs = useMemo(() => groupJobsByStatus(jobs), [jobs]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const draggedJob = jobs.find((job) => job.id === String(active.id));
    if (!draggedJob) return;

    const overId = String(over.id);
    const targetStatus = JOB_STATUSES.find((status) => status === overId);

    if (targetStatus && draggedJob.status !== targetStatus) {
      onStatusChange(draggedJob.id, targetStatus);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Application pipeline</h2>
          <p className="mt-1 text-sm text-slate-400">
            Track every application from first submission to final outcome.
          </p>
        </div>

        <Button onClick={onAddApplication} leftIcon={<Plus size={16} />}>
          Add Application
        </Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-5 xl:grid-cols-5">
          {JOB_STATUSES.map((status) => (
            <div key={status} id={status}>
              <Column
                status={status}
                jobs={groupedJobs[status]}
                onCardClick={onCardClick}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}