import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export default function Button({
  children,
  className,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20",
    secondary:
      "bg-violet-500 text-white hover:bg-violet-400 shadow-lg shadow-violet-500/20",
    ghost:
      "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
    danger:
      "bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-500/20"
  };

  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : leftIcon ? (
        leftIcon
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon ? rightIcon : null}
    </button>
  );
}