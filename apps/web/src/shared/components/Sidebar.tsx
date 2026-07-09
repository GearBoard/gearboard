"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { House, StickyNote, Bookmark, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import { cn } from "@/shared/libs/utils";

export type ActivePage = "home" | "posts" | "saved";

export interface SidebarProps {
  isAuthenticated?: boolean;
  activePage?: ActivePage;
  user?: {
    name: string;
  };
  onLogout?: () => void | Promise<void>;
  onClose?: () => void;
}

const NAV_ITEMS = [
  { id: "home" as ActivePage, label: "หน้าหลัก", icon: House, href: "/" },
  { id: "posts" as ActivePage, label: "โพสต์ของฉัน", icon: StickyNote, href: "/posts" },
  { id: "saved" as ActivePage, label: "ที่บันทึกไว้", icon: Bookmark, href: "/saved" },
];

export const Sidebar = ({
  isAuthenticated = false,
  activePage = "home",
  user,
  onLogout,
  onClose,
}: SidebarProps) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleConfirmLogout() {
    setIsLoggingOut(true);
    try {
      await onLogout?.();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
      onClose?.();
    }
  }

  return (
    <aside className="flex flex-col justify-between bg-white border-b border-l border-r border-gray w-60 md:w-80 px-3 pt-4 pb-9 md:px-4 md:py-9 h-full">
      {/* Top section — mobile includes logo, desktop is nav buttons only */}
      <div className="flex flex-col gap-6">
        {/* Logo — mobile only */}
        <Link href="/" onClick={onClose} className="flex items-center gap-2 md:hidden shrink-0">
          <Image
            src="/logo.svg"
            width={41}
            height={40}
            alt="GearBoard Logo"
            className="w-[41px] h-10"
          />
          <span className="font-black text-xl text-primary-red">gearboard</span>
        </Link>

        {/* Nav buttons */}
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon, href }) => {
            const isActive = activePage === id;
            const navClass = cn(
              "flex items-center gap-3 w-full rounded-lg text-left font-semibold transition-colors",
              "pl-6 pr-4 py-2 h-10 text-sm",
              "md:pl-8 md:pr-4 md:py-3 md:h-12 md:text-base",
              isActive
                ? "bg-primary-red text-white cursor-default"
                : "bg-white text-black cursor-pointer hover:bg-light-gray active:bg-gray"
            );

            if (isActive) {
              return (
                <button key={id} type="button" disabled aria-current="page" className={navClass}>
                  <Icon className="w-6 h-6 shrink-0" />
                  {label}
                </button>
              );
            }

            return (
              <Link key={id} href={href} onClick={onClose} className={navClass}>
                <Icon className="w-6 h-6 shrink-0" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom section */}
      {isAuthenticated ? (
        /* Authenticated: user pane + logout — desktop and mobile */
        <div className="flex flex-col gap-4">
          <hr className="border-gray" />

          {/* User pane — links to profile */}
          <Link
            href="/profile"
            onClick={onClose}
            className="flex items-center justify-between px-4 py-3 h-[60px] md:h-[72px] rounded-lg hover:bg-light-gray active:bg-gray transition-colors"
          >
            <div className="flex items-center gap-[10px]">
              {/* Avatar placeholder */}
              <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-avatar-red shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-medium text-black leading-[135%]">
                  {user?.name}
                </span>
                <span className="text-xs md:text-sm font-medium text-dark-gray leading-[135%]">
                  ดูโปรไฟล์
                </span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-dark-gray shrink-0" />
          </Link>

          {/* Logout button */}
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 w-full rounded-lg px-4 py-2 md:py-3 h-10 md:h-12 bg-red-tint text-logout-red font-semibold text-sm md:text-lg cursor-pointer hover:bg-red-tint-hover active:bg-red-tint-active transition-colors"
          >
            <LogOut className="w-6 h-6 shrink-0" />
            ออกจากระบบ
          </button>

          <ConfirmModal
            open={showLogoutConfirm}
            onOpenChange={setShowLogoutConfirm}
            title="ออกจากระบบ"
            message="คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ"
            confirmLabel="ออกจากระบบ"
            cancelLabel="ยกเลิก"
            onConfirm={handleConfirmLogout}
            isLoading={isLoggingOut}
          />
        </div>
      ) : (
        /* Unauthenticated: Log in + Sign up — mobile only, desktop has no bottom panel */
        <div className="flex flex-col gap-4 md:hidden">
          <hr className="border-gray" />
          <div className="flex flex-col gap-3">
            <Button variant="outline" color="red" className="w-full font-bold" asChild>
              <Link href="/login" onClick={onClose}>
                เข้าสู่ระบบ
              </Link>
            </Button>
            <Button color="red" className="w-full font-bold" asChild>
              <Link href="/register" onClick={onClose}>
                ลงทะเบียน
              </Link>
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
