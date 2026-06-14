"use client";

import React, { useState } from "react";
import { Button, Input } from "@/shared/components";
import type { RegistrationFormProps } from "../types/types";

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl border-[1.5px] border-gray shadow-primary-red px-6 py-6 md:px-8 md:py-8 flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-[32px] md:text-4xl font-bold text-primary-red">ลงทะเบียน</h1>
        <p className="text-sm md:text-base text-dark-gray mt-1">
          ลงทะเบียนเพื่อเริ่มต้นกับ Gearboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-medium">ชื่อผู้ใช้</label>
          <Input
            placeholder="กรอกชื่อผู้ใช้"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-medium">อีเมล</label>
          <Input
            type="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm md:text-base font-medium">รหัสผ่าน</label>
          <Input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <Button type="submit" loading={isLoading} className="w-full py-3 text-sm md:text-base">
          ลงทะเบียน
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-gray" />
          <span className="text-xs md:text-sm text-dark-gray whitespace-nowrap">
            หรือดำเนินการต่อด้วย
          </span>
          <div className="flex-1 border-t border-gray" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2.5 border-[1.5px] border-gray rounded-lg py-3 text-base md:text-lg font-medium hover:bg-light-gray transition-colors cursor-pointer"
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
      </form>
    </div>
  );
}
