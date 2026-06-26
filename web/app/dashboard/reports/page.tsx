import { TrendingUp, TrendingDown, CheckCircle, AlertCircle, Clock, Users } from "lucide-react";
import Image from "next/image";

const STATS = [
  { label: "Total Tasks", value: "86", trend: "+12%", up: true, icon: CheckCircle, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Completed", value: "62", trend: "+8%", up: true, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "In Progress", value: "18", trend: "+3%", up: true, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Overdue", value: "6", trend: "-2", up: false, icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
];

const TEAM_PERF = [
  { name: "Nader Ahmed", role: "Project Lead", pct: 80 },
  { name: "Siti Rahayu", role: "Designer", pct: 80 },
  { name: "Budi Santoso", role: "PM", pct: 75 },
  { name: "Rina Fieldwork", role: "Teknisi", pct: 75 },
  { name: "Ahmad Fauzi", role: "Dev", pct: 56 },
];

const BAR_DATA = [4, 7, 5, 9, 6, 8, 5];
const BAR_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxBar = Math.max(...BAR_DATA);

const TIMELINE = [
  { user: "Budi", action: "moved task to Done", target: "Build Auth UI", time: "5m ago", color: "bg-indigo-500" },
  { user: "Ahmad", action: "pushed commit", target: "feat/signalr-hub", time: "22m ago", color: "bg-blue-500" },
  { user: "Siti", action: "completed design for", target: "Landing Page", time: "1h ago", color: "bg-purple-500" },
  { user: "Rina", action: "submitted", target: "Field Report #14", time: "2h ago", color: "bg-emerald-500" },
];

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold tracking-tight">Reports & Analytics</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
          Ringkasan performa tim dan progres project secara keseluruhan.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon;
          const Trend = s.up ? TrendingUp : TrendingDown;
          return (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-[20px] border border-slate-200 dark:border-zinc-800 p-5 bento-glow transition-all hover:scale-[1.003]">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 ${s.bg} ${s.color} rounded-xl`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`flex items-center gap-0.5 text-[10px] font-bold ${s.up ? "text-emerald-500" : "text-red-500"}`}>
                  <Trend className="w-3 h-3" />{s.trend}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-800 dark:text-zinc-100">{s.value}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts + Timeline Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart — Tasks Completed Per Day */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800 p-6 bento-glow transition-all hover:scale-[1.003]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-4">
            Tasks Completed — Last 7 Days
          </span>
          <div className="flex items-end gap-3 h-36">
            {BAR_DATA.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[9px] font-bold text-slate-400">{val}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-400 transition-all duration-700"
                  style={{ height: `${(val / maxBar) * 100}%` }}
                />
                <span className="text-[9px] text-slate-400 font-bold">{BAR_DAYS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800 p-6 bento-glow transition-all hover:scale-[1.003]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-4">
            Activity Timeline
          </span>
          <div className="space-y-4">
            {TIMELINE.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-7 h-7 ${t.color} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-[9px] text-white font-bold">{t.user[0]}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-zinc-200 leading-snug">
                    <span className="font-bold">{t.user}</span> {t.action}{" "}
                    <span className="text-indigo-500">{t.target}</span>
                  </p>
                  <span className="text-[10px] text-slate-400">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance */}
      <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800 p-6 bento-glow transition-all hover:scale-[1.003]">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-5">
          Team Performance
        </span>
        <div className="space-y-4">
          {TEAM_PERF.map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`}
                alt={m.name} width={32} height={32}
                className="rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-200">{m.name}</span>
                  <span className="text-[10px] font-bold text-slate-400">{m.pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 font-semibold">{m.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
