import { useRef, type ChangeEvent } from "react";

import type { CommentInputProps } from "./types";

export default function CommentInput({
  value,
  onChange,
  onFocus,
  placeholder,
}: CommentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);

    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      placeholder={placeholder}
      rows={1}
      className="w-full md:text-md text-sm text-gray-800 font-medium font-noto outline-none resize-none leading-5"
    />
  );
}