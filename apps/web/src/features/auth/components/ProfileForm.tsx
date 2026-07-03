"use client";

import { useState, useRef } from "react";
import { User, Pencil } from "lucide-react";
import { Button, Input, Dropdown } from "@/shared/components";
import { Textarea } from "@/shared/components/ui/textarea";
import { DEPARTMENTS } from "../constants/departments";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/libs/utils";

// Inline SVG for the decorative gear to avoid extra files
function GearDecoration({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
    </svg>
  );
}

export default function ProfileForm() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    about: "",
  });
  
  // Avatar state
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const isFormValid = formData.username.trim().length > 0 && formData.department.length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setAvatar(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      // Simulate API call
      console.log("Submitting profile:", { ...formData, avatar });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to home after successful onboarding
      router.push("/");
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsLoading(false);
    }
  };

  const departmentOptions = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
  }));

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary-red p-4 md:p-8">
 
      {/* ── Card ── */}
      <div className="relative z-10 w-full sm:w-[353px] md:w-[480px] ">
        <div className="bg-white rounded-xl border-[1.5px] border-gray shadow-primary-red px-6 py-6 md:px-8 md:py-8 flex flex-col gap-4 md:gap-5 w-full">
          <div>
            <h1 className="text-[32px] md:text-4xl font-bold text-primary-red">
              กรอกข้อมูลผู้ใช้
            </h1>
          </div>

          <form id="profile-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Avatar Upload inline */}
            <div className="mt-2 mb-2 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="flex size-32 items-center justify-center overflow-hidden rounded-full bg-[#E5A599] text-white">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Avatar Preview"
                      className="size-full object-cover"
                    />
                  ) : (
                    <User className="size-16" strokeWidth={1.5} />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary-red text-white shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Upload profile picture"
                >
                  <Pencil className="size-4" strokeWidth={2.5} />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <Input
              label="ชื่อผู้ใช้"
              id="profile-username"
              placeholder="john.doe"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />

            <Dropdown
              label="ภาควิชา"
              placeholder="เลือกภาควิชา"
              options={departmentOptions}
              value={formData.department}
              onChange={(val) =>
                setFormData({ ...formData, department: val as string })
              }
              required
            />

            <Textarea
              label="เกี่ยวกับ"
              id="profile-about"
              placeholder="บอกเล่าเกี่ยวกับตัวคุณ..."
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="min-h-[120px]"
            />
          </form>

          <Button
            form="profile-form"
            type="submit"
            loading={isLoading}
            disabled={!isFormValid || isLoading}
            size="lg"
          >
            ยืนยัน
          </Button>
        </div>
      </div>
    </div>
  );
}
