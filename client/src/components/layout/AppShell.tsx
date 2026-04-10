import type { ReactNode } from "react";
import Navbar from "./Navbar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-[1600px] px-6 py-6">{children}</main>
    </div>
  );
}