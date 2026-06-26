"use client";

import { useState } from "react";
import { Send, Paperclip, Smile, Search, Plus, Hash } from "lucide-react";
import Image from "next/image";

const CHANNELS = [
  { id: "general", name: "general", unread: 0 },
  { id: "shieldsafe-dev", name: "shieldsafe-dev", unread: 5, active: true },
  { id: "design-review", name: "design-review", unread: 2 },
  { id: "announcements", name: "announcements", unread: 0 },
];

const DM_USERS = [
  { name: "Budi Santoso", preview: "Let's finalize the board...", status: "online", time: "2m" },
  { name: "Rina Fieldwork", preview: "Field report uploaded ✓", status: "offline", time: "1h" },
  { name: "Ahmad Fauzi", preview: "Update approved!", status: "online", time: "5m" },
];

const MESSAGES = [
  { user: "Budi Santoso", text: "Halo semua! Update progress sprint minggu ini — Auth UI sudah 80% selesai.", time: "10:20 AM", isMe: false },
  { user: "Ahmad Fauzi", text: "Siap! Saya lagi handle SignalR Hub, estimasi selesai besok sore.", time: "10:23 AM", isMe: false },
  { user: "Siti Rahayu", text: "Design system sudah finalized ya. Color tokens dan spacing grid sudah ready di Figma.", time: "10:25 AM", isMe: false },
  { user: "Budi Santoso", text: "Bagus! Pastikan dark mode colors sudah sesuai spec ya. Ada feedback dari client soal kontrast.", time: "10:30 AM", isMe: false },
  { user: "Me", text: "Siap Pak Budi, saya sudah test WCAG AA — semua teks sudah 4.5:1 ratio. Sudah comply.", time: "10:35 AM", isMe: true },
  { user: "Ahmad Fauzi", text: "Hub connected! Test real-time ke Flutter client berhasil. Latency < 300ms 🎉", time: "11:02 AM", isMe: false },
];

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { user: "Me", text: message, time: "Now", isMe: true }]);
    setMessage("");
  };

  return (
    <div className="flex h-full">
      {/* Left: Channel List */}
      <div className="w-60 shrink-0 border-r border-slate-200 dark:border-zinc-800 flex flex-col bg-slate-50/50 dark:bg-zinc-950/20">
        <div className="p-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input placeholder="Search channels..." className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full text-[11px] font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all" />
          </div>
        </div>

        <div className="px-4 flex-1 overflow-y-auto scroll-hidden">
          {/* Channels */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Project Channels</span>
              <button className="text-slate-400 hover:text-indigo-500 transition-colors"><Plus className="w-3 h-3" /></button>
            </div>
            {CHANNELS.map((ch) => (
              <button key={ch.id} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium mb-0.5 transition-all ${
                ch.active ? "bg-indigo-500/10 text-indigo-500 font-bold" : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              }`}>
                <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" />{ch.name}</span>
                {ch.unread > 0 && <span className="w-4 h-4 bg-indigo-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">{ch.unread}</span>}
              </button>
            ))}
          </div>

          {/* DMs */}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Direct Messages</span>
            {DM_USERS.map((u) => (
              <button key={u.name} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all mb-0.5 text-left">
                <div className="relative shrink-0">
                  <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} alt={u.name} width={24} height={24} className="rounded-full" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white dark:border-zinc-950 ${ u.status === "online" ? "bg-emerald-500" : "bg-zinc-500" }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-slate-800 dark:text-zinc-100 truncate">{u.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{u.preview}</div>
                </div>
                <span className="text-[9px] text-slate-400 shrink-0">{u.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Conversation */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="h-14 border-b border-slate-200 dark:border-zinc-800 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-sm">shieldsafe-dev</span>
            <span className="text-[11px] text-slate-400 font-medium">5 members</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200 dark:bg-zinc-800" />
            <span className="text-[10px] text-slate-400 font-bold">Today</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-zinc-800" />
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 group ${ msg.isMe ? "flex-row-reverse" : "" }`}>
              {!msg.isMe && (
                <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}`} alt={msg.user} width={32} height={32} className="rounded-full shrink-0" />
              )}
              <div className={`max-w-[60%] ${ msg.isMe ? "items-end" : "items-start" } flex flex-col gap-1`}>
                {!msg.isMe && <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-300">{msg.user} <span className="font-normal text-slate-400">{msg.time}</span></span>}
                <div className={`px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.isMe ? "bg-indigo-500 text-white rounded-tr-sm" : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 rounded-tl-sm"
                }`}>
                  {msg.text}
                </div>
                {msg.isMe && <span className="text-[10px] text-slate-400">{msg.time}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl px-4 py-2">
            <button className="text-slate-400 hover:text-indigo-500 transition-colors"><Paperclip className="w-4 h-4" /></button>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Message #shieldsafe-dev..."
              className="flex-1 bg-transparent text-sm font-medium focus:outline-none placeholder:text-slate-400"
            />
            <button className="text-slate-400 hover:text-indigo-500 transition-colors"><Smile className="w-4 h-4" /></button>
            <button onClick={sendMessage} className="w-8 h-8 bg-indigo-500 hover:bg-indigo-600 rounded-xl flex items-center justify-center transition-all">
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
