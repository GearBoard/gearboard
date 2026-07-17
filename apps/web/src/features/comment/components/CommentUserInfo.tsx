import type { CommentUserInfoProps } from "./types";

export default function CommentUserInfo({
  name,
  username,
}: CommentUserInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="md:text-sm text-xs font-medium font-satoshi">
        {name}
      </span>

      <span className="md:text-xs text-[10px] text-neutral-500 font-medium font-satoshi">
        @{username}
      </span>
    </div>
  );
}