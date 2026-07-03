"use client";

import { LoginForm, RegistrationForm } from "@/features/auth";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<"register" | "login">("register");

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary-red flex items-center justify-center p-4 font-sans">
      <Image
        src="/auth-bg-gears.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="pointer-events-none hidden object-cover md:block"
      />

      <Link
        href="/"
        aria-label="กลับสู่หน้าแรก"
        className="absolute top-12 left-12 z-10 hidden h-[38px] w-[46px] items-center justify-center rounded-lg bg-white text-primary-red md:flex"
      >
        <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={2} />
      </Link>

      {currentView === "login" ? (
        <LoginForm onSwitchToRegister={() => setCurrentView("register")} />
      ) : (
        <RegistrationForm onSwitchToLogin={() => setCurrentView("login")} />
      )}
    </div>
  );
}
