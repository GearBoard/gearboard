"use client";

import { LoginForm, RegistrationForm } from "@/features/auth";
import { authClient } from "@/shared/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<"register" | "login">("register");
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [session, isPending, router]);

  if (isPending || session) return null;

  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4 font-sans backdrop-blur-sm">
      {currentView === "login" ? (
        <LoginForm onSwitchToRegister={() => setCurrentView("register")} />
      ) : (
        <RegistrationForm onSwitchToLogin={() => setCurrentView("login")} />
      )}
    </div>
  );
}
