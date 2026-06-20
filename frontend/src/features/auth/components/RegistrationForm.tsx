"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/components";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";
import { useRouter } from "next/navigation";
import { authClient } from "@/shared/lib/auth-client";
import type { RegistrationFormProps } from "../types/types";

export default function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.username,
          username: formData.username,
        },
        {
          onSuccess: () => {
            router.push("/");
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border-[1.5px] border-gray shadow-primary-red px-6 py-6 md:px-8 md:py-8 flex flex-col gap-4 md:gap-5 w-full">
      <div>
        <h1 className="text-[32px] md:text-4xl font-bold text-primary-red">ลงทะเบียน</h1>
        <p className="text-sm md:text-base text-black font-medium mt-1">
          ลงทะเบียนเพื่อเริ่มต้นกับ Gearboard
        </p>
      </div>

      <form id="register-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          label="ชื่อผู้ใช้"
          id="register-username"
          placeholder="กรอกชื่อผู้ใช้"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />

        <Input
          label="อีเมล"
          id="register-email"
          type="email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="รหัสผ่าน"
          id="register-password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </form>

      <Button
        form="register-form"
        type="submit"
        loading={isLoading}
        disabled={isGoogleLoading}
        size="md"
        className="md:px-5 md:py-3 md:h-12 md:text-base md:gap-2"
      >
        ลงทะเบียน
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray" />
        <span className="text-sm md:text-base text-dark-gray whitespace-nowrap">
          หรือดำเนินการต่อด้วย
        </span>
        <div className="flex-1 border-t border-gray" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
        className="h-9.5 md:h-12 w-full flex items-center justify-center gap-3 border-[1.5px] border-gray rounded-[10px] bg-white px-3.75 py-2 md:py-3 text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-black/54 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        ดำเนินการต่อด้วย Google
      </button>

      <p className="text-center text-sm md:text-base">
        มีบัญชีอยู่แล้ว ?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-primary-red underline font-medium cursor-pointer"
        >
          เข้าสู่ระบบ
        </button>
      </p>
    </div>
  );
}
