"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Blocks, Activity, CheckSquare, LayoutDashboard, Kanban,
  MessageSquare, Calendar, Users, BarChart2, LogOut, ChevronRight
} from "lucide-react";

const PROJECTS = [
  { id: "shieldsafe", name: "ShieldSafe", color: "bg-indigo-500", progress: 76 },
  { id: "quantum", name: "Quantum", color: "bg-emerald-500", progress: 30 },
  { id: "aeroedge", name: "AeroEdgeSafe", color: "bg-amber-500", progress: 0 },
];

const NAV_WORKSPACE = [
  { href: "/dashboard/activity", icon: Activity, label: "Activity" },
  { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks", badge: "35" },
];

const NAV_VIEWS = [
  { href: "/dashboard/overview", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/board", icon: Kanban, label: "Board" },
  { href: "/dashboard/chat", icon: MessageSquare, label: "Chat" },
  { href: "/dashboard/calendar", icon: Calendar, label: "Calendar" },
  { href: "/dashboard/members", icon: Users, label: "Team Members" },
  { href: "/dashboard/reports", icon: BarChart2, label: "Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeProject, setActiveProject] = useState("shieldsafe");

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || '{"fullName":"User","email":"user@taskforge.com","role":"Admin"}')
    : { fullName: "User", email: "user@taskforge.com", role: "Admin" };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <aside className="w-[280px] shrink-0 bg-slate-50/50 dark:bg-zinc-950/40 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-full overflow-y-auto scroll-hidden">
      <div className="flex-1 p-6 space-y-8">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-sm text-slate-800 dark:text-zinc-100">TeamUnity</div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-semibold tracking-wider uppercase">Workspace SaaS</div>
            </div>
          </div>
          <button className="p-1 text-slate-400 hover:text-indigo-500 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold tracking-wider uppercase block px-3 mb-2">
            Workspace
          </span>
          {NAV_WORKSPACE.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}

          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold tracking-wider uppercase block px-3 pt-4 mb-2">
            Projects & Views
          </span>
          {NAV_VIEWS.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Project Switcher */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold tracking-wider uppercase block px-3">
            Active Projects
          </span>
          <div className="space-y-1">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeProject === proj.id
                    ? "bg-slate-100 dark:bg-zinc-800/40 text-slate-800 dark:text-zinc-100 border border-slate-200 dark:border-zinc-800/50 font-bold"
                    : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/40"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${proj.color}`} />
                  {proj.name}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{proj.progress}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="p-6 border-t border-slate-200 dark:border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`}
              alt="Avatar"
              width={36} height={36}
              className="rounded-full ring-2 ring-indigo-500/30"
            />
            <div>
              <div className="font-bold text-xs text-slate-800 dark:text-zinc-100 truncate max-w-[120px]">
                {user.fullName}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-semibold">{user.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800/50 hover:bg-red-500/15 hover:text-red-500 text-slate-400 transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavLink({ item, pathname }: { item: { href: string; icon: React.ElementType; label: string; badge?: string }; pathname: string }) {
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-slate-100 dark:bg-zinc-800 text-indigo-500 dark:text-indigo-400 font-bold"
          : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-zinc-100"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Icon className="w-4 h-4" />
        {item.label}
      </span>
      {item.badge && (
        <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
