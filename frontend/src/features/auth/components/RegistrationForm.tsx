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
    <div className="bg-white rounded-xl border border-[#D9D9D9] shadow-[0px_0px_30px_rgba(38,38,38,0.05)] p-6 gap-4 md:p-8 md:gap-5 flex flex-col w-[353px] md:w-[480px]">
      <div>
        <h1 className="text-[32px] md:text-[36px] font-bold text-primary-red">ลงทะเบียน</h1>
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
        className="h-[38px] md:h-[46px]"
      >
        ลงทะเบียน
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-[#8B9096]" />
        <span className="text-sm md:text-base text-[#8B9096] whitespace-nowrap">
          หรือดำเนินการต่อด้วย
        </span>
        <div className="flex-1 border-t border-[#8B9096]" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
        className="h-[38px] md:h-12 w-full flex items-center justify-center gap-3 border-[1.5px] border-[#D9D9D9] rounded-[10px] bg-white px-4 text-sm md:text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-black/54 disabled:opacity-50 disabled:cursor-not-allowed"
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
