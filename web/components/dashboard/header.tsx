"use client";

import { useState } from "react";
import { Search, Bell, Sun, Moon } from "lucide-react";

export default function Header() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-zinc-800/80 px-8 flex items-center justify-between bg-white/50 dark:bg-zinc-950/10 backdrop-blur-sm shrink-0">
      {/* Search */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* SignalR Indicator */}
        <span className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-500/20">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          SignalR connected
        </span>

        {/* Notifications */}
        <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/50 relative text-slate-500 dark:text-zinc-400 transition-all">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5 border-2 border-white dark:border-zinc-900" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/50 text-slate-600 dark:text-zinc-300 hover:text-indigo-500 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
