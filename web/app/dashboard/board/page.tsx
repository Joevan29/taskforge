"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, GripVertical } from "lucide-react";

const PRIORITY_STYLES: Record<string, string> = {
  Urgent: "bg-red-500/10 text-red-500 border-red-500/20",
  High: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Low: "bg-slate-500/10 text-slate-500 border-slate-500/20",
};

const INITIAL_TASKS = {
  todo: [
    { id: "t1", title: "Setup Supabase Schema", desc: "Buat semua tabel database sesuai schema final", priority: "High", assignee: "Ahmad", dueDate: "Aug 20" },
    { id: "t2", title: "Frontend Kanban Drag & Drop", desc: "Implementasi drag & drop task antar kolom", priority: "Medium", assignee: "Ahmad", dueDate: "Aug 25" },
    { id: "t3", title: "Write API Documentation", desc: "Dokumentasi semua endpoint REST API", priority: "Low", assignee: "Budi", dueDate: "Aug 28" },
  ],
  inprogress: [
    { id: "t4", title: "Build Auth UI", desc: "Login dan Register dengan dark mode premium", priority: "High", assignee: "Ahmad", dueDate: "Aug 15" },
    { id: "t5", title: "Implement SignalR Hub", desc: "Real-time broadcast ke semua member workspace", priority: "Urgent", assignee: "Ahmad", dueDate: "Aug 14" },
  ],
  review: [
    { id: "t6", title: "Landing Page Mockup", desc: "Final high-fidelity mockup untuk client review", priority: "High", assignee: "Siti", dueDate: "Aug 12" },
  ],
  done: [
    { id: "t7", title: "UX Research Complete", desc: "User flow, persona, dan wireframe awal", priority: "High", assignee: "Siti", dueDate: "Aug 5" },
    { id: "t8", title: "Color Palette Approved", desc: "Design tokens dan color system final", priority: "Medium", assignee: "Siti", dueDate: "Aug 7" },
  ],
};

const COLUMNS = [
  { id: "todo", label: "TO DO", dotColor: "bg-slate-400", badgeClass: "bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400" },
  { id: "inprogress", label: "IN PROGRESS", dotColor: "bg-blue-500", badgeClass: "bg-blue-500/10 text-blue-500" },
  { id: "review", label: "CLIENT REVIEW", dotColor: "bg-amber-500", badgeClass: "bg-amber-500/10 text-amber-500" },
  { id: "done", label: "DONE", dotColor: "bg-emerald-500", badgeClass: "bg-emerald-500/10 text-emerald-500" },
];

type TasksState = Record<string, { id: string; title: string; desc: string; priority: string; assignee: string; dueDate: string }[]>;

export default function BoardPage() {
  const [tasks, setTasks] = useState<TasksState>(INITIAL_TASKS);
  const [dragging, setDragging] = useState<{ id: string; from: string } | null>(null);

  const handleDragStart = (taskId: string, colId: string) => setDragging({ id: taskId, from: colId });
  const handleDrop = (toColId: string) => {
    if (!dragging || dragging.from === toColId) return;
    const task = tasks[dragging.from].find((t) => t.id === dragging.id);
    if (!task) return;
    setTasks((prev) => ({
      ...prev,
      [dragging.from]: prev[dragging.from].filter((t) => t.id !== dragging.id),
      [toColId]: [...prev[toColId], task],
    }));
    setDragging(null);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Kanban Workspace</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
            Tarik dan pindahkan tugas untuk kolaborasi real-time.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all">
          <Plus className="w-4 h-4" /> Add New Task
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
            className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-2xl border border-slate-200 dark:border-zinc-800/60 p-4 space-y-3 min-h-[400px] transition-all"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1">
              <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-200 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                {col.label}
              </h4>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${col.badgeClass}`}>
                {tasks[col.id]?.length || 0}
              </span>
            </div>

            {/* Tasks */}
            {tasks[col.id]?.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task.id, col.id)}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-3.5 cursor-grab active:cursor-grabbing hover:border-indigo-500/40 transition-all hover:shadow-lg group"
              >
                {/* Priority + Menu */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${PRIORITY_STYLES[task.priority]}`}>
                    {task.priority}
                  </span>
                  <button className="opacity-0 group-hover:opacity-100 text-slate-400 transition-opacity">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Title */}
                <p className="text-xs font-bold text-slate-800 dark:text-zinc-100 mb-1 leading-snug">{task.title}</p>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{task.desc}</p>
                {/* Footer */}
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-[8px] text-indigo-400 font-bold">{task.assignee[0]}</span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md">
                    {task.dueDate}
                  </span>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {tasks[col.id]?.length === 0 && (
              <div className="border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl p-6 text-center">
                <p className="text-[10px] text-slate-400 font-semibold">Drop tasks here</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
