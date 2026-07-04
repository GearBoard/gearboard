"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button, Input, Dropdown } from "@/shared/components";
import { Textarea } from "@/shared/components/ui/textarea";
import { DEPARTMENTS } from "../constants/departments";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";

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
    <div className="bg-white rounded-xl md:border-[1px] md:border-[1.5px] border-gray shadow-primary-red md:w-[480px] w-[353px] md:px-8 px-6 md:py-8 py-6 md:gap-5 gap-4 flex flex-col">
      <div className="md:gap-5 gap-4 flex flex-col items-center justify-center">
        <h1 className="md:w-[416px] w-[305px] md:h-[38px] h-[32px] md:text-[28px] text-[24px] font-satoshi-variable font-bold text-primary-red leading-[135%]">
          กรอกข้อมูลผู้ใช้
        </h1>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative block cursor-pointer"
          aria-label="อัปโหลดรูปโปรไฟล์"
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Avatar Preview"
              width={96}
              height={96}
              unoptimized
              className="size-24 object-cover rounded-full"
            />
          ) : (
            <Image
              src="/profile.svg"
              alt="Default Avatar"
              width={96}
              height={96}
              className="size-full object-cover"
            />
          )}
          <div className="absolute -bottom-1 -right-0.5 flex size-9 items-center justify-center rounded-full bg-primary-red text-white">
            <SquarePen className="size-4" />
          </div>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <form id="profile-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Avatar Upload inline */}

        <Input
          label="ชื่อผู้ใช้"
          id="profile-username"
          placeholder="john.doe"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />

        <Dropdown
          label="ภาควิชา"
          placeholder="เลือกภาควิชา"
          options={departmentOptions}
          value={formData.department}
          onChange={(val) => setFormData({ ...formData, department: val as string })}
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
  );
}
