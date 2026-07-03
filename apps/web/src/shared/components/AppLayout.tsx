"use client";

import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/shared/libs/utils";

type ActivePage = "home" | "posts" | "saved";

interface AppLayoutProps {
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

        {/* Mobile sidebar drawer — slides in from left */}
        <div
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
