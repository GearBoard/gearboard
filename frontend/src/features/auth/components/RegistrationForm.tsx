"use client";

import { useState, useRef, ChangeEvent } from "react";
import {
  Camera,
  Loader2,
  ChevronDown,
  Eye,
  EyeOff,
  Check,
  GraduationCap,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/shared/lib/auth-client";
import { DEPARTMENTS } from "../constants/departments";
import type { ProfileFormData, RegistrationFormProps } from "../types/types";
import Image from "next/image";

export default function RegistrationForm({ onSwitchToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    department: "",
    password: "",
    profileImage: null,
  });

  const [emailError, setEmailError] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setEmailError("");
  };

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("");
      return true;
    }
    if (!email.endsWith("@student.chula.ac.th")) {
      setEmailError("กรุณาใช้อีเมลนิสิตจุฬาฯ (@student.chula.ac.th) เท่านั้น");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSelectDepartment = (dept: string) => {
    setFormData((prev) => ({ ...prev, department: dept }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return;

    setError("");
    setIsLoading(true);
    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          username: formData.email.split("@")[0],
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx: { error: { message: string } }) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social(
        { provider: "google", callbackURL: "/" },
        {
          onError: (ctx: { error: { message: string } }) => {
            setError(ctx.error.message);
          },
        }
      );
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-[450px] bg-white rounded-3xl shadow-2xl relative p-8 pt-10">
      <button
        type="button"
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
      >
        ✕
      </button>

      <div className="text-left mb-6">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-gray-400 text-sm mb-4 flex items-center hover:text-gray-600"
        >
          &lt; กลับสู่หน้าหลัก
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">สร้างบัญชีใหม่</h1>
        <p className="text-gray-500 text-sm">เข้าร่วมชุมชนการเรียนรู้ทางวิศวกรรมกับเรา</p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div
              role="button"
              tabIndex={0}
              onClick={handleImageClick}
              onKeyDown={(e) => e.key === "Enter" && handleImageClick()}
              className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-sm flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
            >
              {formData.profileImage ? (
                <Image
                  width={96}
                  height={96}
                  src={formData.profileImage}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute bottom-0 right-0 bg-[#8B0020] hover:bg-[#A00025] text-white p-2 rounded-full border-2 border-white shadow-md transition-colors"
            >
              <Camera size={14} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">ชื่อ-นามสกุล</label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="กรอกชื่อและนามสกุลของคุณ"
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-[#8B0020]/20 text-gray-900 placeholder:text-gray-400 text-sm transition-all outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">อีเมล</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={(e) => validateEmail(e.target.value)}
              required
              placeholder="example@student.chula.ac.th"
              className={`w-full pl-10 pr-4 py-3.5 bg-gray-50 rounded-xl border-none focus:bg-white focus:ring-2 text-gray-900 placeholder:text-gray-400 text-sm transition-all outline-none ${emailError ? "ring-2 ring-red-500 focus:ring-red-500 bg-red-50" : "focus:ring-[#8B0020]/20"}`}
            />
            <Mail
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 ${emailError ? "text-red-400" : "text-gray-400"}`}
            />
          </div>
          {emailError && (
            <p className="text-red-500 text-xs mt-1.5 ml-1 animate-pulse">* {emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">
            สาขาวิชา (ภาควิชา)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full pl-10 pr-10 py-3.5 text-left rounded-xl transition-all outline-none flex items-center justify-between ${isDropdownOpen ? "bg-white ring-2 ring-[#8B0020]/20" : "bg-gray-50 hover:bg-gray-100"}`}
            >
              <span
                className={`text-sm ${formData.department ? "text-gray-900" : "text-gray-400"}`}
              >
                {formData.department || "เลือกสาขาวิชาของคุณ"}
              </span>
              <ChevronDown
                className={`text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                size={20}
              />
            </button>
            <GraduationCap className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {DEPARTMENTS.map((dept) => (
                    <div
                      key={dept}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleSelectDepartment(dept)}
                      onKeyDown={(e) => e.key === "Enter" && handleSelectDepartment(dept)}
                      className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${formData.department === dept ? "bg-[#8B0020]/5 text-[#8B0020] font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-[#8B0020]"}`}
                    >
                      {dept}
                      {formData.department === dept && <Check size={16} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">รหัสผ่าน</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="ระบุรหัสผ่านของคุณ"
              className="w-full pl-10 pr-12 py-3.5 bg-gray-50 rounded-xl border-none focus:bg-white focus:ring-2 focus:ring-[#8B0020]/20 text-gray-900 placeholder:text-gray-400 text-sm transition-all outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-[#8B0020] hover:bg-[#6d0019] disabled:bg-gray-300 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg shadow-[#8B0020]/20 mt-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              กำลังลงทะเบียน...
            </>
          ) : (
            "สร้างบัญชีผู้ใช้งาน"
          )}
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
        สมัครสมาชิกด้วย Google
      </button>

      <div className="mt-6 text-center">
        <span className="text-gray-500 text-sm">มีบัญชีอยู่แล้ว? </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[#8B0020] font-bold text-sm hover:underline"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
