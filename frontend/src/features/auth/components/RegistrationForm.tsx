"use client";

import React, { useState } from "react";
import { Button, Input } from "@/shared/components";
import { GoogleIcon } from "@/shared/components/icons/GoogleIcon";
import type { RegistrationFormProps } from "../types/types";

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
    <div className="bg-white rounded-xl border-[1.5px] border-gray shadow-primary-red px-6 py-6 md:px-8 md:py-8 flex flex-col gap-4 md:gap-5 w-full">
      <div>
        <h1 className="text-[32px] md:text-4xl font-bold text-primary-red">ลงทะเบียน</h1>
        <p className="text-sm md:text-base text-dark-gray mt-1">
          ลงทะเบียนเพื่อเริ่มต้นกับ Gearboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

        <Button type="submit" loading={isLoading} size="lg">
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
          className="w-full flex items-center justify-center gap-3 border-[1.5px] border-gray rounded-[10px] px-3.75 py-2 md:py-3 text-base md:text-base font-medium hover:bg-light-gray transition-colors cursor-pointer text-black/54"
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
