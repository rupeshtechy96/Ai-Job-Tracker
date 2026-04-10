// client/src/components/dashboard/AddApplicationModal.tsx

import { useEffect, useMemo, useState } from "react";
import { Sparkles, Wand2, Briefcase, Link2, FileText, DollarSign, CalendarDays } from "lucide-react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import Loader from "../common/Loader";
import type { ApplicationFormData, JobApplication, JobStatus, ParsedJobData } from "../../types";
import { JOB_STATUSES } from "../../lib/utils";

type AddApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ApplicationFormData) => Promise<void>;
  onParseJobDescription: (jdText: string) => Promise<ParsedJobData>;
  editingJob?: JobApplication | null;
};

const emptyForm: ApplicationFormData = {
  company: "",
  role: "",
  jdText: "",
  jdLink: "",
  notes: "",
  dateApplied: new Date().toISOString().slice(0, 10),
  status: "Applied",
  salaryRange: "",
  requiredSkills: [],
  niceToHaveSkills: [],
  seniority: "",
  location: "",
  resumeSuggestions: [],
};

function skillsToString(skills: string[]) {
  return skills.join(", ");
}

function stringToSkills(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AddApplicationModal({
  isOpen,
  onClose,
  onSubmit,
  onParseJobDescription,
  editingJob,
}: AddApplicationModalProps) {
  const [form, setForm] = useState<ApplicationFormData>(emptyForm);
  const [requiredSkillsText, setRequiredSkillsText] = useState("");
  const [niceToHaveSkillsText, setNiceToHaveSkillsText] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = useMemo(() => Boolean(editingJob), [editingJob]);

  useEffect(() => {
    if (editingJob) {
      const nextForm: ApplicationFormData = {
        company: editingJob.company,
        role: editingJob.role,
        jdText: editingJob.jdText ?? "",
        jdLink: editingJob.jdLink ?? "",
        notes: editingJob.notes ?? "",
        dateApplied: editingJob.dateApplied,
        status: editingJob.status,
        salaryRange: editingJob.salaryRange ?? "",
        requiredSkills: editingJob.requiredSkills ?? [],
        niceToHaveSkills: editingJob.niceToHaveSkills ?? [],
        seniority: editingJob.seniority ?? "",
        location: editingJob.location ?? "",
        resumeSuggestions: editingJob.resumeSuggestions ?? [],
      };

      setForm(nextForm);
      setRequiredSkillsText(skillsToString(nextForm.requiredSkills));
      setNiceToHaveSkillsText(skillsToString(nextForm.niceToHaveSkills));
      setError("");
      return;
    }

    setForm(emptyForm);
    setRequiredSkillsText("");
    setNiceToHaveSkillsText("");
    setError("");
  }, [editingJob, isOpen]);

  const setField = <K extends keyof ApplicationFormData>(key: K, value: ApplicationFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleParse = async () => {
  if (!form.jdText.trim()) {
    setError("Please paste a job description first.");
    return;
  }

  try {
    setError("");
    setIsParsing(true);

    const parsed = await onParseJobDescription(form.jdText);

    setForm((prev) => ({
      ...prev,
      company: parsed.company || prev.company,
      role: parsed.role || prev.role,
      requiredSkills: parsed.requiredSkills ?? [],
      niceToHaveSkills: parsed.niceToHaveSkills ?? [],
      seniority: parsed.seniority || "",
      location: parsed.location || "",
      salaryRange: parsed.salaryRange || "",
      jdLink: parsed.jdLink || prev.jdLink,
      notes: parsed.notes || prev.notes,
      resumeSuggestions: parsed.resumeSuggestions ?? []
    }));

    setRequiredSkillsText((parsed.requiredSkills ?? []).join(", "));
    setNiceToHaveSkillsText((parsed.niceToHaveSkills ?? []).join(", "));
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to parse job description.");
  } finally {
    setIsParsing(false);
  }
};

  const handleSave = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.");
      return;
    }

    try {
      setError("");
      setIsSaving(true);

      await onSubmit({
        ...form,
        requiredSkills: stringToSkills(requiredSkillsText),
        niceToHaveSkills: stringToSkills(niceToHaveSkillsText),
      });

      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save application.");
    } finally {
      setIsSaving(false);
    }
  };

  const footer = (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button onClick={handleSave} isLoading={isSaving} leftIcon={<Briefcase size={16} />}>
        {isEditMode ? "Update Application" : "Save Application"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit application" : "Add application"}
      description="Paste a job description, parse it with AI, and save the application in one place."
      size="xl"
      footer={footer}
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-cyan-500/5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="text-cyan-300" size={18} />
            <h3 className="text-sm font-semibold text-white">AI job description parser</h3>
          </div>

          <Textarea
            label="Paste job description"
            placeholder="Paste the full JD here..."
            value={form.jdText}
            onChange={(event) => setField("jdText", event.target.value)}
            rows={7}
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              AI will extract role details and generate tailored resume bullet points.
            </p>
            <Button
              onClick={handleParse}
              isLoading={isParsing}
              leftIcon={isParsing ? <Loader size="sm" /> : <Wand2 size={16} />}
            >
              {isParsing ? "Parsing..." : "Parse with AI"}
            </Button>
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Company"
            placeholder="Google"
            value={form.company}
            onChange={(event) => setField("company", event.target.value)}
            leftIcon={<Briefcase size={16} />}
          />
          <Input
            label="Role"
            placeholder="Frontend Developer Intern"
            value={form.role}
            onChange={(event) => setField("role", event.target.value)}
            leftIcon={<FileText size={16} />}
          />
          <Input
            label="JD link"
            placeholder="https://company.com/jobs/..."
            value={form.jdLink}
            onChange={(event) => setField("jdLink", event.target.value)}
            leftIcon={<Link2 size={16} />}
          />
          <Input
            label="Salary range"
            placeholder="4 LPA - 6 LPA"
            value={form.salaryRange}
            onChange={(event) => setField("salaryRange", event.target.value)}
            leftIcon={<DollarSign size={16} />}
          />
          <Input
            label="Date applied"
            type="date"
            value={form.dateApplied}
            onChange={(event) => setField("dateApplied", event.target.value)}
            leftIcon={<CalendarDays size={16} />}
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Status</label>
            <select
              value={form.status}
              onChange={(event) => setField("status", event.target.value as JobStatus)}
              className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
            >
              {JOB_STATUSES.map((status) => (
                <option key={status} value={status} className="bg-slate-950">
                  {status}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Seniority"
            placeholder="Intern / Junior / Mid / Senior"
            value={form.seniority}
            onChange={(event) => setField("seniority", event.target.value)}
          />

          <Input
            label="Location"
            placeholder="Remote / Bengaluru / Hybrid"
            value={form.location}
            onChange={(event) => setField("location", event.target.value)}
          />

          <Input
            label="Required skills"
            placeholder="React, TypeScript, Tailwind"
            value={requiredSkillsText}
            onChange={(event) => setRequiredSkillsText(event.target.value)}
          />

          <Input
            label="Nice-to-have skills"
            placeholder="Node.js, Testing, CI/CD"
            value={niceToHaveSkillsText}
            onChange={(event) => setNiceToHaveSkillsText(event.target.value)}
          />
        </div>

        <Textarea
          label="Notes"
          placeholder="Add interview notes, company details, preparation plan..."
          value={form.notes}
          onChange={(event) => setField("notes", event.target.value)}
          rows={4}
        />
      </div>
    </Modal>
  );
}