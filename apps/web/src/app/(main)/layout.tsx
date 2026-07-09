"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/shared/components/Navbar";
import { Sidebar } from "@/shared/components/Sidebar";
import { authClient } from "@/shared/libs/auth-client";
import { cn } from "@/shared/libs/utils";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const user = session?.user ? { name: session.user.name } : undefined;

  async function handleLogout() {
    try {
      await authClient.signOut();
      router.push("/");
    } catch {
      // Sign-out failed; keep the user on the current page so they can retry.
    }
  }

  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <div className="hidden md:block shrink-0">
          <Sidebar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        </div>

        <div
          aria-hidden="true"
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
            isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          inert={!isSidebarOpen || undefined}
          className={cn(
            "fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
