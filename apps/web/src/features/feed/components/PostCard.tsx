"use client";

import Image from "next/image";
import { Heart, MessageCircle, Bookmark, MoreVertical } from "lucide-react";
import { cn, formatRelativeTime } from "@/shared/libs/utils";

export interface PostCardAuthor {
  id: string;
  name: string;
  image: string | null;
}

export interface PostCardProps {
  title: string;
  description: string;
  tags: string[];
  likeCount: number;
  commentCount: number;
  authorInfo: PostCardAuthor;
  createdAt: string;
  imageUrl?: string | null;
  isLiked?: boolean;
  isSaved?: boolean;
  isOwner?: boolean;
  className?: string;
  onClick?: () => void;
  onLikeClick?: () => void;
  onCommentClick?: () => void;
  onSaveClick?: () => void;
  onMenuClick?: () => void;
}

const TAG_COLOR_CLASSES = [
  "bg-[#44ADE2]/50 text-[#008ACF]",
  "bg-[#9533F0]/50 text-[#9755D5]",
  "bg-[#248F53]/50 text-[#248F53]",
];

export default function PostCard({
  title,
  description,
  tags,
  likeCount,
  commentCount,
  authorInfo,
  createdAt,
  imageUrl,
  isLiked = false,
  isSaved = false,
  isOwner = false,
  className,
  onClick,
  onLikeClick,
  onCommentClick,
  onSaveClick,
  onMenuClick,
}: PostCardProps) {
  const stop = (handler?: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <article
      onClick={onClick}
      className={cn(
        "bg-white rounded-lg flex flex-col gap-3 w-full px-5 py-4",
        "md:p-5 md:gap-4",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <div className="relative size-8 md:size-10 shrink-0 rounded-full overflow-hidden">
            <Image
              src={authorInfo.image || "/profile.svg"}
              alt={authorInfo.name}
              fill
              sizes="(min-width: 768px) 40px, 32px"
              className="object-cover"
              unoptimized={!!authorInfo.image}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-xs md:text-sm text-black truncate">
              {authorInfo.name}
            </span>
            <span className="font-medium text-2xs md:text-xs text-dark-gray truncate">
              @{authorInfo.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <time className="font-medium text-2xs md:text-xs text-dark-gray" dateTime={createdAt}>
            {formatRelativeTime(createdAt)}
          </time>
          {isOwner && (
            <button
              type="button"
              onClick={stop(onMenuClick)}
              className="text-dark-gray hover:text-black cursor-pointer"
              aria-label="ตัวเลือกเพิ่มเติม"
            >
              <MoreVertical className="size-4 md:size-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-black text-lg md:text-lg">{title}</h3>
        <p className="font-medium text-black text-sm md:text-base line-clamp-2">{description}</p>
      </div>

      {imageUrl && (
        <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="border-t border-gray pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={cn(
                "px-2 py-1 rounded-lg text-xs md:text-sm font-semibold",
                TAG_COLOR_CLASSES[i % TAG_COLOR_CLASSES.length]
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={stop(onLikeClick)}
            className={cn(
              "flex items-center gap-1 cursor-pointer transition-colors hover:text-primary-red",
              isLiked ? "text-primary-red" : "text-black"
            )}
            aria-label="ถูกใจ"
            aria-pressed={isLiked}
          >
            <Heart className="size-4 md:size-5" fill={isLiked ? "currentColor" : "none"} />
            <span className="font-semibold text-sm md:text-base">{likeCount}</span>
          </button>
          <button
            type="button"
            onClick={stop(onCommentClick)}
            className="flex items-center gap-1 text-black cursor-pointer transition-colors hover:text-primary-red"
            aria-label="แสดงความคิดเห็น"
          >
            <MessageCircle className="size-4 md:size-5" />
            <span className="font-semibold text-sm md:text-base">{commentCount}</span>
          </button>
          <button
            type="button"
            onClick={stop(onSaveClick)}
            className={cn(
              "cursor-pointer transition-colors hover:text-primary-red",
              isSaved ? "text-primary-red" : "text-black"
            )}
            aria-label="บันทึกโพสต์"
            aria-pressed={isSaved}
          >
            <Bookmark className="size-6" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
