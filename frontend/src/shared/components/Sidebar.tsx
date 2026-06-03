"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

export interface SidebarItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export interface SidebarAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface SidebarProps {
  avatarSrc?: string;
  greeting?: string;
  displayName: string;
  items: SidebarItem[];
  mobileActions?: SidebarAction[];
  className?: string;
}

export const Sidebar = ({
  avatarSrc,
  greeting = "สวัสดี !",
  displayName,
  items,
  mobileActions,
  className,
}: SidebarProps) => {
  const pathname = usePathname();

  const avatar = (size: number, className?: string) => (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0",
        className
      )}
    >
      {avatarSrc ? (
        <Image
          src={avatarSrc}
          alt={displayName}
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray" />
      )}
    </div>
  );

  const navLink = (item: SidebarItem) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg text-white text-base font-medium transition-colors",
          isActive ? "bg-darker-red" : "hover:bg-dark-red"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className={cn("w-60 shrink-0 bg-primary-red flex flex-col py-8 px-4", className)}>
      {/* Desktop: large avatar + greeting + name */}
      <div className="hidden md:flex flex-col items-center gap-3 mb-8">
        {avatar(80, "w-20 h-20")}
        <div className="text-center text-white">
          <p className="font-bold text-base">{greeting}</p>
          <p className="font-bold text-base">{displayName}</p>
        </div>
      </div>

      {/* Mobile: small avatar only */}
      <div className="md:hidden flex justify-center mb-4">{avatar(64, "w-16 h-16")}</div>

      {/* Mobile: account actions */}
      {mobileActions && mobileActions.length > 0 && (
        <div className="md:hidden flex flex-col gap-1 mb-6">
          {mobileActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white text-base font-medium transition-colors hover:bg-dark-red w-full text-left"
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Nav items */}
      <nav className="flex flex-col gap-1">{items.map(navLink)}</nav>
    </aside>
  );
};

export default Sidebar;
