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
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });
    setIsLoading(true);
    try {
      await authClient.signIn.email(
        { email: formData.email, password: formData.password },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx: { error: { message: string } }) => {
            const msg = ctx.error.message.toLowerCase();
            if (msg.includes("password")) {
              setErrors((prev) => ({ ...prev, password: "รหัสผ่านไม่ถูกต้อง" }));
            } else {
              setErrors((prev) => ({ ...prev, email: ctx.error.message }));
            }
          },
        }
      );
    } catch {
      setErrors((prev) => ({ ...prev, email: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" }));
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
        <h1 className="text-[32px] md:text-4xl font-bold text-primary-red">เข้าสู่ระบบ</h1>
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
          errorMessage={errors.email}
          required
        />

        <Input
          label="รหัสผ่าน"
          id="login-password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          errorMessage={errors.password}
          required
        />
      </form>

      <Button
        form="login-form"
        type="submit"
        loading={isLoading}
        disabled={isGoogleLoading}
        size="lg"
      >
        เข้าสู่ระบบ
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-dark-gray" />
        <span className="text-sm md:text-base text-dark-gray whitespace-nowrap">
          หรือดำเนินการต่อด้วย
        </span>
        <div className="flex-1 border-t border-dark-gray" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
        className="h-12 w-full flex items-center justify-center gap-3 border-[1.5px] bg-white border-gray rounded-[10px] px-4 text-sm md:text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-dark-gray disabled:opacity-50 disabled:cursor-not-allowed"
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
