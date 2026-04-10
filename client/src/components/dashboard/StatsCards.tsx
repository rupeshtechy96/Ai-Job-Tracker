import { Briefcase, CircleCheckBig, CircleX, Phone, Users } from "lucide-react";
import { getApplicationStats } from "../../lib/utils";
import type { JobApplication } from "../../types";

type StatsCardsProps = {
  jobs: JobApplication[];
};

export default function StatsCards({ jobs }: StatsCardsProps) {
  const stats = getApplicationStats(jobs);

  const items = [
    {
      label: "Total Applications",
      value: stats.total,
      icon: <Briefcase size={18} />,
      tone: "text-cyan-300 bg-cyan-500/10 border-cyan-400/20"
    },
    {
      label: "Phone Screens",
      value: stats.phoneScreen,
      icon: <Phone size={18} />,
      tone: "text-amber-300 bg-amber-500/10 border-amber-400/20"
    },
    {
      label: "Interviews",
      value: stats.interview,
      icon: <Users size={18} />,
      tone: "text-violet-300 bg-violet-500/10 border-violet-400/20"
    },
    {
      label: "Offers",
      value: stats.offer,
      icon: <CircleCheckBig size={18} />,
      tone: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20"
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <CircleX size={18} />,
      tone: "text-rose-300 bg-rose-500/10 border-rose-400/20"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl"
        >
          <div
            className={`mb-4 inline-flex rounded-2xl border p-3 ${item.tone}`}
          >
            {item.icon}
          </div>
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
}