"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const EVENTS: Record<string, { title: string; color: string }[]> = {
  "2026-6-5":  [{ title: "ShieldSafe Kickoff", color: "bg-indigo-500" }],
  "2026-6-10": [{ title: "UX Research Done", color: "bg-emerald-500" }],
  "2026-6-15": [{ title: "Design Review", color: "bg-amber-500" }],
  "2026-6-18": [{ title: "Sprint Planning", color: "bg-indigo-500" }],
  "2026-6-23": [{ title: "Client Presentation", color: "bg-amber-500" }, { title: "Board Review", color: "bg-blue-500" }],
  "2026-6-30": [{ title: "🔴 Deadline v1", color: "bg-red-500" }],
};

const UPCOMING = [
  { title: "Sprint Planning", project: "ShieldSafe", date: "Jun 18, 09:00 AM", color: "border-indigo-500" },
  { title: "Client Presentation", project: "ShieldSafe", date: "Jun 23, 02:00 PM", color: "border-amber-500" },
  { title: "Deadline ShieldSafe v1", project: "ShieldSafe", date: "Jun 30, 05:00 PM", color: "border-red-500" },
];

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  return (
    <div className="p-8 flex gap-6 h-full">
      {/* Main Calendar */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Calendar</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">Jadwal dan deadline semua project.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 rounded-xl px-3 py-1.5">
              <button onClick={prev} className="text-slate-500 hover:text-indigo-500 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <span className="font-bold text-sm min-w-[120px] text-center">{MONTHS[month]} {year}</span>
              <button onClick={next} className="text-slate-500 hover:text-indigo-500 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
            <button className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-indigo-500/20 transition-all">
              <Plus className="w-3.5 h-3.5" /> Create Event
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-zinc-800">
            {DAYS.map((d) => (
              <div key={d} className="py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">{d}</div>
            ))}
          </div>
          {/* Day Cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const key = `${year}-${month + 1}-${day}`;
              const evts = day ? EVENTS[key] : [];
              const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
              return (
                <div key={i} className={`min-h-[90px] p-2 border-b border-r border-slate-100 dark:border-zinc-800/60 ${
                  !day ? "bg-slate-50/50 dark:bg-zinc-950/20" : "hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-colors"
                } ${ i % 7 === 0 || i % 7 === 6 ? "bg-slate-50/80 dark:bg-zinc-950/30" : "" }`}>
                  {day && (
                    <>
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mb-1 ${
                        isToday ? "bg-indigo-500 text-white" : "text-slate-700 dark:text-zinc-200"
                      }`}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {evts?.map((ev, ei) => (
                          <div key={ei} className={`${ev.color} text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate`}>
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Sidebar */}
      <div className="w-64 shrink-0">
        <h4 className="font-bold text-sm mb-4">Upcoming <span className="text-slate-400 font-medium text-xs">This Month</span></h4>
        <div className="space-y-3">
          {UPCOMING.map((ev, i) => (
            <div key={i} className={`bg-white dark:bg-zinc-900 border-l-2 ${ev.color} border border-slate-200 dark:border-zinc-800 rounded-xl p-3 bento-glow`}>
              <p className="font-bold text-xs text-slate-800 dark:text-zinc-100">{ev.title}</p>
              <span className="text-[10px] text-indigo-500 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded-full">{ev.project}</span>
              <p className="text-[10px] text-slate-400 mt-1.5 font-semibold">{ev.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
