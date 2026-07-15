"use client";

import { RegistrationForm } from "@/features/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  return <RegistrationForm onSwitchToLogin={() => router.push("/auth/login")} />;
}
