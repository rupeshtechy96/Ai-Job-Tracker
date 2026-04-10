import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: ReactNode;
};

export default function Input({
  label,
  leftIcon,
  className,
  ...props
}: InputProps) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-slate-200">
          {label}
        </span>
      ) : null}

      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </span>
        ) : null}

        <input
          className={cn(
            "h-12 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20",
            leftIcon && "pl-11",
            className
          )}
          {...props}
        />
      </div>
    </label>
  );
}