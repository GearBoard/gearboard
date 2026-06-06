"use client";

import { useState } from "react";
import { Loader2, Eye, EyeOff, GraduationCap, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/shared/lib/auth-client";
import type { LoginFormProps } from "../types/types";

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await authClient.signIn.email(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx: { error: { message: string } }) => {
          setError(ctx.error.message);
        },
      }
    );
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);
    await authClient.signIn.social(
      { provider: "google", callbackURL: "/" },
      {
        onError: (ctx: { error: { message: string } }) => {
          setError(ctx.error.message);
          setIsGoogleLoading(false);
        },
      }
    );
  };

  return (
    <div className="w-[450px] min-h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden relative flex flex-col justify-center p-8 animate-in fade-in zoom-in-95 duration-300">
      <button type="button" className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
        ✕
      </button>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-[#8B0020] rounded-2xl flex items-center justify-center shadow-lg shadow-[#8B0020]/20 mb-6">
          <GraduationCap size={40} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับมา</h1>
        <p className="text-gray-500 text-sm">เข้าสู่ระบบเพื่อเริ่มเรียนรู้วิชาการยุคใหม่</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">อีเมล</label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="example@student.chula.ac.th"
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-[#8B0020]/20 text-gray-900 placeholder:text-gray-400 text-sm outline-none"
            />
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5 ml-1">
            <label className="text-xs font-bold text-gray-500">รหัสผ่าน</label>
            <a href="#" className="text-xs font-bold text-[#8B0020] hover:underline">
              ลืมรหัสผ่าน?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              placeholder="ระบุรหัสผ่านของคุณ"
              className="w-full pl-10 pr-12 py-3.5 bg-gray-50 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-[#8B0020]/20 text-gray-900 placeholder:text-gray-400 text-sm outline-none"
            />
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-[#8B0020] hover:bg-[#6d0019] disabled:bg-gray-300 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#8B0020]/20 mt-4 flex justify-center items-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "เข้าสู่ระบบ"}
        </button>
      </form>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">หรือ</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading || isGoogleLoading}
        className="w-full bg-white border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100 text-gray-700 font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-3"
      >
        {isGoogleLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden>
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
        )}
        เข้าสู่ระบบด้วย Google
      </button>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">ไม่มีบัญชีผู้ใช้งาน?</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <button
        type="button"
        onClick={onSwitchToRegister}
        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3.5 px-6 rounded-xl text-sm"
      >
        สมัครสมาชิกใหม่
      </button>
    </div>
  );
}
