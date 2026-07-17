import type { ChangeEvent } from "react";
import { Image } from "lucide-react"; // นำเข้าไอคอน Image จาก lucide-react
import type { CommentImageUploadProps } from "./types";

export default function CommentImageUpload({
  onUpload,
}: CommentImageUploadProps) {
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onUpload?.(file);
  };

  return (
    <label className="flex cursor-pointer items-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Image
        className="h-4 w-4 md:h-[18px] md:w-[18px]"
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </label>
  );
}