"use client";

import { useEffect, useRef, useState } from "react";
import { Edit3, Globe, CheckCircle2, Compass, Code2, MoreHorizontal } from "lucide-react";

const PHASES = [
  {
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    title: "UX Research",
    desc: "User Flow, Persona, User Stories",
    badge: "Selesai",
    badgeClass: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: Compass,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-500/10",
    title: "Design System",
    desc: "Typography, Color Palette, Layout Grid",
    badge: "Berjalan",
    badgeClass: "text-indigo-500 bg-indigo-500/10 animate-pulse",
  },
  {
    icon: Code2,
    iconColor: "text-slate-400",
    iconBg: "bg-slate-400/10",
    title: "Frontend Development",
    desc: "Next.js 16 setup, Tailwind, Auth Flow",
    badge: "Antre",
    badgeClass: "text-slate-400 bg-slate-200 dark:bg-zinc-800",
  },
];

const ACTIVITIES = [
  { user: "Budi", action: "mengubah status task", target: "Build Auth UI", time: "2m", color: "bg-indigo-500" },
  { user: "Rina", action: "mengunggah laporan", target: "Field Report #12", time: "8m", color: "bg-emerald-500" },
  { user: "Ahmad", action: "berkomentar di", target: "SignalR Hub", time: "15m", color: "bg-blue-500" },
  { user: "Siti", action: "menyelesaikan", target: "Component Library", time: "1h", color: "bg-purple-500" },
  { user: "Nader", action: "membuat task baru", target: "API Documentation", time: "2h", color: "bg-amber-500" },
  { user: "Budi", action: "assign task ke", target: "Ahmad Fauzi", time: "3h", color: "bg-indigo-500" },
];

export default function OverviewPage() {
  const [progress] = useState(76);
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">ShieldSafe</h2>
          <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
            Workspace / Project Dashboard / Overview
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl">
          {["Overview", "Board", "Members"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition-all ${
                tab === "Overview"
                  ? "bg-white dark:bg-zinc-700 text-indigo-500 shadow-sm"
                  : "text-slate-500 dark:text-zinc-400 hover:text-indigo-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CARD A — Project Info (span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800/80 p-6 flex flex-col justify-between min-h-[300px] bento-glow relative overflow-hidden transition-all hover:scale-[1.003]">
          <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                Project Info
              </span>
              <button className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-400 transition-all">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-zinc-100">Project Description</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
              Mengembangkan situs promosi asuransi dan kalkulator risiko keselamatan kerja yang ramah pengguna, 
              berfokus pada visual premium, integrasi pelaporan data real-time, serta responsifitas penuh untuk 
              platform seluler teknisi lapangan.
            </p>
          </div>
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-zinc-800/80">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase">Tipe Proyek</span>
              <span className="text-xs font-bold text-indigo-500 mt-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Web Application
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase">Start Date</span>
              <span className="text-xs font-bold mt-1 text-slate-700 dark:text-zinc-300">1 Agustus 2023</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase">Deadline</span>
              <span className="text-xs font-bold mt-1 text-red-500">30 Agustus 2023</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase">Project Leader</span>
              <div className="flex items-center gap-1.5 mt-1">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
                  className="w-4 h-4 rounded-full"
                  alt="PM"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">Budi Santoso</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD B — Radial Progress */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800/80 p-6 flex flex-col justify-between min-h-[300px] bento-glow transition-all hover:scale-[1.003]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
              Overall Process
            </span>
            <span className="text-xs font-extrabold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              SaaS Live View
            </span>
          </div>

          {/* Radial Chart */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                  className="text-slate-100 dark:text-zinc-800" />
                <circle cx="50" cy="50" r="40" stroke="url(#grad)" strokeWidth="8"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  fill="transparent" strokeLinecap="round"
                  className="transition-all duration-1000" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold">{progress}%</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase">Completed</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/80">
            <div className="text-center w-1/3">
              <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase block">Created</span>
              <span className="text-sm font-extrabold text-slate-700 dark:text-zinc-200">28</span>
            </div>
            <div className="text-center w-1/3 border-x border-slate-100 dark:border-zinc-800">
              <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase block">Progress</span>
              <span className="text-sm font-extrabold text-blue-500">10</span>
            </div>
            <div className="text-center w-1/3">
              <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase block">Remaining</span>
              <span className="text-sm font-extrabold text-red-500 animate-pulse">4 Hari</span>
            </div>
          </div>
        </div>

        {/* CARD C — Phase Checklist (span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800/80 p-6 min-h-[320px] bento-glow transition-all hover:scale-[1.003]">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-4">
            Project Statistics & Checklist
          </span>
          <div className="space-y-3">
            {PHASES.map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-800/40">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 ${phase.iconBg} ${phase.iconColor} rounded-lg`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-200">{phase.title}</h4>
                      <p className="text-[10px] text-slate-400">{phase.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${phase.badgeClass}`}>
                    {phase.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD D — Recent Activity */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800/80 p-6 min-h-[320px] bento-glow transition-all hover:scale-[1.003] signalr-pulse">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 block mb-4">
            Recent Activity (SignalR)
          </span>
          <div className="space-y-4 max-h-[240px] overflow-y-auto scroll-hidden">
            {ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={`w-7 h-7 ${act.color} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-[10px] text-white font-bold">{act.user[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 dark:text-zinc-200 leading-snug">
                    <span className="font-bold">{act.user}</span> {act.action}{" "}
                    <span className="text-indigo-500">{act.target}</span>
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">{act.time} ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
