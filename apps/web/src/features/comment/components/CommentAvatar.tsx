import Image from "next/image";
import type { CommentAvatarProps } from "./types";

const avatarSize = {
  sm: 24,
  md: 28,
  lg: 48,
};

export default function CommentAvatar({
  src,
  alt = "Avatar",
  size = "md",
  className,
}: CommentAvatarProps) {
  const dimension = avatarSize[size];
  const wrapperClassName = [
    "overflow-hidden rounded-full bg-gray-200",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClassName}
      style={className ? undefined : { width: dimension, height: dimension }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          👤
        </div>
      )}
    </div>
  );
}