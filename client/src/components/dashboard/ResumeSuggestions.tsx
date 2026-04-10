// client/src/components/dashboard/ResumeSuggestions.tsx

import { Copy, Sparkles } from "lucide-react";

type ResumeSuggestionsProps = {
  suggestions: string[];
};

export default function ResumeSuggestions({ suggestions }: ResumeSuggestionsProps) {
  if (!suggestions.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={16} className="text-violet-300" />
          <h3 className="text-sm font-semibold text-white">Resume suggestions</h3>
        </div>
        <p className="text-sm text-slate-400">Parse a job description to generate tailored resume bullet points.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles size={16} className="text-violet-300" />
        <h3 className="text-sm font-semibold text-white">Resume suggestions</h3>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={`${suggestion}-${index}`}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <p className="text-sm leading-7 text-slate-200">{suggestion}</p>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(suggestion)}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              <Copy size={14} />
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}