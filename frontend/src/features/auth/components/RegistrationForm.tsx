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
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const router = useRouter();

  const clearErrors = () => setErrors({ username: "", email: "", password: "" });

  const mapError = (message: string) => {
    const msg = message.toLowerCase();
    if (msg.includes("username") || msg.includes("user already exists")) {
      setErrors((prev) => ({ ...prev, username: "ไม่สามารถใช้ชื่อนี้ได้" }));
    } else if (msg.includes("email")) {
      setErrors((prev) => ({ ...prev, email: "อีเมลนี้ถูกใช้ไปแล้ว" }));
    } else if (msg.includes("password")) {
      setErrors((prev) => ({ ...prev, password: "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัว" }));
    } else {
      setErrors((prev) => ({ ...prev, username: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" }));
    }
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    clearErrors();
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
          onError: (ctx: { error: { message: string } }) => {
            mapError(ctx.error.message);
          },
        }
      );
    } catch {
      setErrors((prev) => ({ ...prev, username: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      });
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
          errorMessage={errors.username}
          required
        />

        <Input
          label="อีเมล"
          id="register-email"
          type="email"
          placeholder="user@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          errorMessage={errors.email}
          required
        />

        <Input
          label="รหัสผ่าน"
          id="register-password"
          type="password"
          placeholder="กรอกรหัสผ่าน"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          errorMessage={errors.password}
          required
        />
      </form>

      <Button
        form="register-form"
        type="submit"
        loading={isLoading}
        disabled={isGoogleLoading}
        size="lg"
      >
        ลงทะเบียน
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
        className="h-12 w-full flex items-center justify-center gap-3 border-[1.5px] border-gray rounded-[10px] bg-white px-4 text-sm md:text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-dark-gray disabled:opacity-50 disabled:cursor-not-allowed"
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
