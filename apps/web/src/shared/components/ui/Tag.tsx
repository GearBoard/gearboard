import { cn } from "@/shared/libs/utils";

export function Tag({
  label,
  color = "#008ACF",
  backgroundColor = "#44ADE280",
  className,
}: TagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-[8px]",
        "px-2 py-1",
        "font-satoshi",
        "font-semibold",
        "leading-[135%]",
        className
      )}
      style={{
        color,
        backgroundColor,
      }}
    >
      {label}
    </div>
  );
}

export interface TagProps {
  label: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
}