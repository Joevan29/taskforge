import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskForge — Premium SaaS Workspace",
  description:
    "Platform manajemen proyek real-time untuk tim lapangan dan kantor. Kolaborasi lintas platform dengan Flutter mobile dan Next.js web.",
  keywords: ["project management", "saas", "kanban", "team collaboration", "task management"],
  openGraph: {
    title: "TaskForge",
    description: "Unite, Manage, and Succeed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} font-sans antialiased bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
