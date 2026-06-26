import { Mail, MessageSquare, UserPlus } from "lucide-react";
import Image from "next/image";

const MEMBERS = [
  { name: "Dino Prasetya", role: "Owner", email: "dino@taskforge.com", status: "online", roleColor: "bg-amber-500/10 text-amber-500", tasks: 5, done: 4, pct: 80 },
  { name: "Budi Santoso", role: "Admin / PM", email: "budi@taskforge.com", status: "online", roleColor: "bg-indigo-500/10 text-indigo-500", tasks: 12, done: 9, pct: 75 },
  { name: "Rina Fieldwork", role: "Teknisi Lapangan", email: "rina@taskforge.com", status: "offline", roleColor: "bg-emerald-500/10 text-emerald-500", tasks: 8, done: 6, pct: 75 },
  { name: "Ahmad Fauzi", role: "Frontend Dev", email: "ahmad@taskforge.com", status: "online", roleColor: "bg-blue-500/10 text-blue-500", tasks: 18, done: 10, pct: 56 },
  { name: "Siti Rahayu", role: "UI/UX Designer", email: "siti@taskforge.com", status: "online", roleColor: "bg-purple-500/10 text-purple-500", tasks: 10, done: 8, pct: 80 },
];

export default function MembersPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Team Members</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
            Daftar kolaborator aktif di workspace saat ini.
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition-all">
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEMBERS.map((m) => (
          <div key={m.email} className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-200 dark:border-zinc-800 p-6 bento-glow transition-all hover:scale-[1.003]">
            {/* Avatar + Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.name}`}
                  alt={m.name} width={56} height={56}
                  className="rounded-full ring-2 ring-indigo-500/20"
                />
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${
                  m.status === "online" ? "bg-emerald-500" : "bg-zinc-500"
                }`} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.roleColor}`}>{m.role}</span>
            </div>

            {/* Info */}
            <h4 className="font-bold text-base text-slate-800 dark:text-zinc-100">{m.name}</h4>
            <div className="flex items-center gap-1.5 mt-1 mb-4">
              <Mail className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] text-slate-400 font-medium truncate">{m.email}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-zinc-800 mb-4">
              {[
                { label: "Tasks", value: m.tasks },
                { label: "Done", value: m.done },
                { label: "Rate", value: `${m.pct}%` },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-extrabold text-sm text-slate-800 dark:text-zinc-100">{s.value}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl border border-indigo-500/30 text-indigo-500 text-xs font-bold hover:bg-indigo-500/10 transition-all">
                View Profile
              </button>
              <button className="flex-1 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-1">
                <MessageSquare className="w-3 h-3" /> Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
