// client/src/components/dashboard/ApplicationDetailModal.tsx

import { Briefcase, CalendarDays, Copy, Link2, MapPin, Pencil, Sparkles, Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import type { JobApplication } from "../../types";
import { formatDisplayDate, getStatusBadgeClasses } from "../../lib/utils";

type ApplicationDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  job: JobApplication | null;
  onEdit: (job: JobApplication) => void;
  onDelete: (job: JobApplication) => void;
};

export default function ApplicationDetailModal({
  isOpen,
  onClose,
  job,
  onEdit,
  onDelete,
}: ApplicationDetailModalProps) {
  if (!job) return null;

  const footer = (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <Button variant="ghost" onClick={onClose}>
        Close
      </Button>
      <Button variant="secondary" onClick={() => onEdit(job)} leftIcon={<Pencil size={16} />}>
        Edit
      </Button>
      <Button variant="danger" onClick={() => onDelete(job)} leftIcon={<Trash2 size={16} />}>
        Delete
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={job.role}
      description={job.company}
      size="xl"
      footer={footer}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClasses(job.status)}`}
          >
            {job.status}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <CalendarDays size={14} />
            {formatDisplayDate(job.dateApplied)}
          </span>
          {job.location ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              <MapPin size={14} />
              {job.location}
            </span>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Briefcase size={16} className="text-cyan-300" />
              <h3 className="text-sm font-semibold text-white">Application details</h3>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <div>
                <p className="text-slate-500">Company</p>
                <p className="mt-1 font-medium text-slate-100">{job.company}</p>
              </div>
              <div>
                <p className="text-slate-500">Role</p>
                <p className="mt-1 font-medium text-slate-100">{job.role}</p>
              </div>
              {job.seniority ? (
                <div>
                  <p className="text-slate-500">Seniority</p>
                  <p className="mt-1 font-medium text-slate-100">{job.seniority}</p>
                </div>
              ) : null}
              {job.salaryRange ? (
                <div>
                  <p className="text-slate-500">Salary range</p>
                  <p className="mt-1 font-medium text-slate-100">{job.salaryRange}</p>
                </div>
              ) : null}
              {job.jdLink ? (
                <div>
                  <p className="text-slate-500">JD link</p>
                  <a
                    href={job.jdLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-2 font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    <Link2 size={14} />
                    Open job description
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-violet-300" />
              <h3 className="text-sm font-semibold text-white">Skills overview</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Required skills</p>
                <div className="flex flex-wrap gap-2">
                  {(job.requiredSkills?.length ?? 0) > 0 ? (
                    job.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">No required skills added.</span>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                  Nice-to-have skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {(job.niceToHaveSkills?.length ?? 0) > 0 ? (
                    job.niceToHaveSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-100"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">No extra skills added.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {job.notes ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Notes</h3>
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">{job.notes}</p>
          </div>
        ) : null}

        {job.resumeSuggestions?.length ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <h3 className="mb-4 text-sm font-semibold text-white">AI resume suggestions</h3>
            <div className="space-y-3">
              {job.resumeSuggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion}-${index}`}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <p className="text-sm leading-7 text-slate-200">{suggestion}</p>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(suggestion)}
                    className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}