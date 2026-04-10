// client/src/components/dashboard/JobCard.tsx

import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import type { JobApplication } from "../../types";
import { formatDisplayDate, getStatusBadgeClasses } from "../../lib/utils";

type JobCardProps = {
  job: JobApplication;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function JobCard({ job, onClick, onEdit, onDelete }: JobCardProps) {
  return (
    <div
      className="group rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-cyan-500/10"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
            {job.company}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-white">{job.role}</h3>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${getStatusBadgeClasses(
            job.status
          )}`}
        >
          {job.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-slate-400" />
          <span>{formatDisplayDate(job.dateApplied)}</span>
        </div>

        {job.location ? (
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-slate-400" />
            <span className="truncate">{job.location}</span>
          </div>
        ) : null}
      </div>

      {(job.requiredSkills?.length ?? 0) > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
            >
              {skill}
            </span>
          ))}
          {(job.requiredSkills?.length ?? 0) > 3 ? (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
              +{(job.requiredSkills?.length ?? 0) - 3}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className="mt-5 flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200 transition hover:border-rose-400/40 hover:bg-rose-500/15"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}