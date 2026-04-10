import type { ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  leftIcon?: ReactNode;
};

export default function Textarea({
  label,
  className,
  ...props
}: TextareaProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-slate-200">
          {label}
        </span>
      ) : null}

      <textarea
        className={cn(
          "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20",
          className
        )}
        {...props}
      />
    </label>
  );
}