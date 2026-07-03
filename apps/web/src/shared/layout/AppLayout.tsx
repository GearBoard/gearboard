"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/shared/components/Navbar";
import { Sidebar } from "@/shared/components/Sidebar";
import type { ActivePage } from "@/shared/components/Sidebar";
import { cn } from "@/shared/libs/utils";

export interface AppLayoutProps {
  children: React.ReactNode;
  isAuthenticated?: boolean;
  activePage?: ActivePage;
  user?: { name: string };
  onLogout?: () => void;
}

export const AppLayout = ({
  children,
  isAuthenticated,
  activePage,
  user,
  onLogout,
}: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close drawer on Escape key
  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isAuthenticated={isAuthenticated}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <div className="flex flex-1">
        {/* Desktop sidebar — always visible in normal flow */}
        <div className="hidden md:block shrink-0">
          <Sidebar
            isAuthenticated={isAuthenticated}
            activePage={activePage}
            user={user}
            onLogout={onLogout}
          />
        </div>

        {/* Mobile overlay — always in DOM so opacity transition works */}
        <div
          aria-hidden="true"
          className={cn(
            "fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300",
            isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Mobile sidebar drawer — slides in from left; inert when closed to remove from tab order */}
        <div
          inert={!isSidebarOpen || undefined}
          className={cn(
            "fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar
            isAuthenticated={isAuthenticated}
            activePage={activePage}
            user={user}
            onLogout={onLogout}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
