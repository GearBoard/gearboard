"use client";

import { useState, useRef } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { Button, Input, Dropdown } from "@/shared/components";
import { Textarea } from "@/shared/components/ui/textarea";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";
import { useSession } from "@/shared/libs/auth-client";
import { useGetDepartments, useUpdateUser, useGetMe, useUploadAvatar } from "@/shared/hooks";

export default function ProfileForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: me } = useGetMe();
  const { data: departments = [], error: departmentsError } = useGetDepartments();
  const { trigger: updateUser, isMutating: isLoading } = useUpdateUser(session?.user.id);
  const { trigger: uploadAvatar, isMutating: isUploading } = useUploadAvatar();

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    department: "",
    about: "",
  });

  // Avatar state
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with user data
  useEffect(() => {
    if (me) {
      setFormData((prev) => ({
        username: prev.username || me.name || "",
        department: prev.department || me.departmentId || "",
        about: prev.about || me.description || "",
      }));
      if (me.image && !previewUrl) {
        setPreviewUrl(me.image);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Validation
  const isFormValid =
    formData.username.trim().length > 0 && formData.department.length > 0 && !departmentsError;


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setAvatar(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isFormValid || !session?.user.id) return;

    try {
      let imageUrl = me?.image;
      if (avatar) {
        const result = await uploadAvatar(avatar);
        imageUrl = result.url;
      }

      await updateUser({
        name: formData.username,
        departmentId: formData.department,
        description: formData.about,
        ...(imageUrl ? { image: imageUrl } : {}),
      });

      // Redirect to home after successful onboarding
      router.push("/");
    } catch (error) {
      console.error("Failed to update profile", error);
      setSubmitError("ไม่สามารถอัปเดตโปรไฟล์ได้ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const departmentOptions = departments.map((dept) => ({
    value: dept.id,
    label: dept.name,
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
          maxVisibleItems={5}
          required
          disabled={!!departmentsError}
        />

        {departmentsError ? (
          <p role="alert" className="text-sm text-primary-red">
            ไม่สามารถโหลดรายชื่อภาควิชาขณะนี้ โปรดลองใหม่อีกครั้ง
          </p>
        ) : null}

        <Textarea
          label="เกี่ยวกับ"
          id="profile-about"
          placeholder="บอกเล่าเกี่ยวกับตัวคุณ..."
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="min-h-[120px]"
        />
      </form>

      {submitError ? (
        <p role="alert" className="text-sm text-primary-red">
          {submitError}
        </p>
      ) : null}

      <Button
        form="profile-form"
        type="submit"
        loading={isLoading || isUploading}
        disabled={!isFormValid || isLoading || isUploading || !!departmentsError}
        size="lg"
      >
        ยืนยัน
      </Button>
    </div>
  );
}
