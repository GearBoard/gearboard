"use client";

import { useState } from "react";
import { Button, Input } from "@/shared/components";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";
import { useRouter } from "next/navigation";
import { authClient } from "@/shared/lib/auth-client";
import type { LoginFormProps } from "../types/types";

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authClient.signIn.email(
        { email: formData.email, password: formData.password },
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
        <h1 className="text-[32px] md:text-[36px] font-bold text-primary-red">เข้าสู่ระบบ</h1>
        <p className="text-sm md:text-base text-black font-medium mt-1">
          เข้าสู่ระบบเพื่อเริ่มต้นกับ Gearboard
        </p>
      </div>

      <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          id="login-email"
          type="email"
          label="อีเมล"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="รหัสผ่าน"
          id="login-password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </form>

      <Button
        form="login-form"
        type="submit"
        loading={isLoading}
        disabled={isGoogleLoading}
        size="md"
        className="h-[38px] md:h-[46px]"
      >
        เข้าสู่ระบบ
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
        className="h-[38px] md:h-12 w-full flex items-center justify-center gap-3 border-[1.5px] bg-white border-[#D9D9D9] rounded-[10px] px-4 text-sm md:text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-black/54 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        ดำเนินการต่อด้วย Google
      </button>

      <p className="text-center text-sm md:text-base">
        ยังไม่มีบัญชี ?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-primary-red underline font-medium cursor-pointer"
        >
          ลงทะเบียน
        </button>
      </p>
    </div>
  );
}
