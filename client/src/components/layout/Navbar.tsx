import { BriefcaseBusiness, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../lib/utils";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-500/15 p-3 text-cyan-300">
            <BriefcaseBusiness size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">AI Job Tracker</span>
              <Sparkles size={14} className="text-cyan-300" />
            </div>
            <p className="text-xs text-slate-400">
              Smart application workflow
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">{user?.name ?? "User"}</p>
            <p className="text-xs text-slate-400">{user?.email ?? ""}</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-sm font-semibold text-violet-200">
            {getInitials(user?.name ?? "U")}
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex h-10 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}