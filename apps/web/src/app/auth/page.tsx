"use client";

import { LoginForm, RegistrationForm } from "@/features/auth";
import { Suspense, useState } from "react";

function AuthForms() {
  const [currentView, setCurrentView] = useState<"register" | "login">("register");

  return currentView === "login" ? (
    <LoginForm onSwitchToRegister={() => setCurrentView("register")} />
  ) : (
    <RegistrationForm onSwitchToLogin={() => setCurrentView("login")} />
  );
}

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black/50 flex items-center justify-center p-4 font-sans backdrop-blur-sm">
      <Suspense fallback={null}>
        <AuthForms />
      </Suspense>
    </div>
  );
}
