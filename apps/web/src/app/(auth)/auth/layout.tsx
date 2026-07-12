"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="relative z-0 min-h-screen overflow-hidden bg-primary-red flex items-center justify-center p-4 font-sans">
      <Image
        src="/auth-bg-gears.svg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="pointer-events-none -z-10 hidden object-cover md:block"
      />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label="กลับสู่หน้าแรก"
        className="cursor-pointer absolute top-12 left-12 z-10 hidden h-[38px] w-[46px] items-center justify-center rounded-lg bg-white text-primary-red md:flex"
      >
        <ArrowLeft aria-hidden="true" />
      </button>

      {children}
    </div>
  );
}
