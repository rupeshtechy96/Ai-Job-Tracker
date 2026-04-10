type LoaderProps = {
  text?: string;
  size?: "sm" | "md" | "lg";
};

export default function Loader({
  text = "Loading...",
  size = "md"
}: LoaderProps) {
  const sizeClass =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";

  return (
    <div className="flex items-center justify-center gap-3 text-slate-300">
      <span
        className={`${sizeClass} animate-spin rounded-full border-2 border-cyan-400 border-t-transparent`}
      />
      <span className="text-sm">{text}</span>
    </div>
  );
}