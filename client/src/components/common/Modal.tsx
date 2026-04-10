import type { ReactNode } from "react";
import { X } from "lucide-react";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "md" | "lg" | "xl";
  footer?: ReactNode;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "lg",
  footer,
  children
}: ModalProps) {
  if (!isOpen) return null;

  const widthClass =
    size === "md"
      ? "max-w-2xl"
      : size === "xl"
      ? "max-w-5xl"
      : "max-w-3xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${widthClass} rounded-[28px] border border-white/10 bg-slate-900 shadow-2xl`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>

        {footer ? (
          <div className="border-t border-white/10 p-6">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}