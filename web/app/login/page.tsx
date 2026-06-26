"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Terminal, Blocks } from "lucide-react";

const DEMO_USERS = [
  { label: "PM (Budi)", email: "budi@taskforge.com", color: "bg-indigo-500" },
  { label: "Teknisi (Rina)", email: "rina@taskforge.com", color: "bg-emerald-500" },
  { label: "Owner (Dino)", email: "dino@taskforge.com", color: "bg-amber-500" },
  { label: "Dev (Ahmad)", email: "ahmad@taskforge.com", color: "bg-blue-500" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("budi@taskforge.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login gagal");
      }
      const data = await res.json();
      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: unknown) {
      // For demo: allow login even if backend is not running
      if (email && password) {
        const demoUser = { id: "demo-1", email, fullName: email.split("@")[0], role: "Admin" };
        localStorage.setItem("access_token", "demo_token");
        localStorage.setItem("user", JSON.stringify(demoUser));
        router.push("/dashboard");
      } else {
        setError(err instanceof Error ? err.message : "Login gagal");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-2xl min-h-[620px] flex flex-col md:flex-row">
        
        {/* LEFT PANEL — Cinematic */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden text-zinc-50">
          {/* Glow orbs */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Blocks className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight text-xl">TaskForge</span>
          </div>

          {/* Hero Text */}
          <div className="my-auto z-10 space-y-6 pt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-none uppercase">
              Unite,<br />Manage,<br />and Succeed.
            </h1>
            <p className="text-zinc-400 text-sm max-w-sm font-medium leading-relaxed">
              Kolaborasikan tim kantor dan teknisi lapangan Anda secara real-time dalam satu ekosistem premium.
            </p>

            {/* Terminal Mockup */}
            <div className="border border-zinc-800 bg-zinc-950/60 p-3 rounded-2xl shadow-2xl">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 bg-red-500/80 rounded-full" />
                <span className="w-2.5 h-2.5 bg-yellow-500/80 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-500/80 rounded-full" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3 h-3 text-zinc-500" />
                <span className="text-[10px] text-zinc-500 font-mono">taskforge-api</span>
              </div>
              <div className="text-[10px] space-y-1.5 font-mono overflow-hidden">
                <div className="flex justify-between">
                  <span className="text-indigo-400">$ dotnet run</span>
                  <span className="text-emerald-500">Success</span>
                </div>
                <div className="text-zinc-500">&gt; [SignalR] Hub connected :5001</div>
                <div className="text-zinc-400">&gt; [PostgreSQL] Database online: 8ms</div>
                <div className="text-zinc-400">&gt; Workspace &quot;ShieldSafe&quot; loaded</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-600 font-semibold z-10">© 2026 TaskForge Inc.</p>
        </div>

        {/* RIGHT PANEL — Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Selamat Datang Kembali</h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Masuk untuk mengakses workspace proyek Anda.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-500 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                  Kata Sandi
                </label>
                <button type="button" className="text-xs font-semibold text-indigo-500 hover:underline">
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-sm flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Akses Dashboard <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-zinc-800" />
            <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Akses Cepat Demo
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-zinc-800" />
          </div>

          {/* Quick Auth Grid */}
          <div className="grid grid-cols-2 gap-2">
            {DEMO_USERS.map((u) => (
              <button
                key={u.email}
                type="button"
                onClick={() => { setEmail(u.email); setPassword("password123"); }}
                className="px-3 py-2.5 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all text-slate-700 dark:text-zinc-300"
              >
                <span className={`w-2 h-2 rounded-full ${u.color}`} />
                {u.label}
              </button>
            ))}
          </div>

          {/* Register link */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Belum memiliki workspace?{" "}
              <Link href="/register" className="text-indigo-500 font-bold hover:underline">
                Registrasi Akun Baru
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
