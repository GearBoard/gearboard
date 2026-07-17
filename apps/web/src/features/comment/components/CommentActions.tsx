import { Send } from "lucide-react"; // นำเข้าไอคอน Send จาก lucide-react
import CommentImageUpload from "./CommentImageUpload";
import type { CommentActionsProps } from "./types";

export default function CommentActions({
  onUpload,
  onSubmit,
  disabled = false,
  loading = false,
}: CommentActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <CommentImageUpload onUpload={onUpload} />

      <button
        type="button"
        onClick={() => onSubmit?.()}
        disabled={disabled || loading}
        className="flex items-center justify-center md:w-[85px] md:h-[38px] w-[88px] h-[31px] gap-3 rounded-lg bg-primary-red md:text-md text-sm font-semi-bold text-white"
      >
        {loading ? (
          <span className="text-xs">กำลังส่ง...</span>
        ) : (
          <>
            {/* ไอคอน Send จาก lucide-react */}
            <Send size={16} strokeWidth={2.5} />
            <span>ส่ง</span>
          </>
        )}
      </button>
    </div>
  );
}