import { useState } from "react";

import CommentActions from "./CommentActions";
import CommentAvatar from "./CommentAvatar";
import CommentInput from "./CommentInput";
import CommentUserInfo from "./CommentUserInfo";
import type { CommentComposerProps } from "./types";

export default function CommentComposer({
  user,
  onSubmit,
  placeholder = "เขียนความคิดเห็น...",
}: CommentComposerProps) {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = comment.trim().length > 0 || image !== null;

  const handleSubmit = async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        content: comment.trim(),
        image: image ?? undefined,
      });

      setComment("");
      setImage(null);
      setExpanded(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-5 md:py-4 py-2.5">
      {/* 
        โครงสร้างแบบสลับสถานะ (Conditional Layout)
      */}
      {!expanded ? (
        // 1. สถานะเริ่มต้น (Default): แสดง Avatar ขนานคู่ไปกับ Input ในแนวนอน
        <div className="flex items-center gap-2.5">
          <CommentAvatar
            src={user.avatar}
            alt={user.name}
            className="h-[24px] w-[24px] md:h-[28px] md:w-[28px]"
          />
          <div className="flex items-center">
            <CommentInput
              value={comment}
              onChange={setComment}
              onFocus={() => setExpanded(true)}
              placeholder={placeholder}
            />
          </div>
        </div>
      ) : (
        // 2. สถานะกดเปิด (Expanded): แยกการทำงานเป็น 2 แถวชัดเจนตามภาพดีไซน์
        <div className="flex flex-col gap-3">
          
          {/* แถวบน: Avatar คู่กับ User Info เสมอ */}
          <div className="flex flex-row items-center gap-2.5">
            <CommentAvatar 
              src={user.avatar}
              alt={user.name}
              className="h-[24px] w-[24px] md:h-[28px] md:w-[28px]"
             />
            <CommentUserInfo name={user.name} username={user.username} />
          </div>

          {/* แถวล่าง: กล่องกรอกข้อมูลชิ้นใหม่ที่มีทั้ง Input และ Image Upload Preview */}
          <div className="w-full md:pl-10">
            <div className="flex flex-col gap-3 rounded-lg">
              <CommentInput
                value={comment}
                onChange={setComment}
                onFocus={() => setExpanded(true)}
                placeholder={placeholder}
                //autoFocus={true}
              />

              <div className="border-t border-gray"></div>

              {/* ย้าย CommentActions เข้ามาอยู่ด้านในกล่อง Border นี้ */}
              <CommentActions
                onUpload={setImage}
                onSubmit={handleSubmit}
                disabled={!canSubmit}
                loading={isSubmitting}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}