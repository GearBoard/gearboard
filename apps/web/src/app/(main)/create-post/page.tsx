"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreatePostCard } from "@/features/post/components/CreatePostCard";
import { useCreatePost } from "@/shared/hooks";

export default function CreatePostPage() {
  const router = useRouter();
  const { trigger: createPost, isMutating: isCreatingPost } = useCreatePost();

  const handleCreatePost = async (input: {
    title: string;
    description: string;
    tags?: string[];
    images?: string[];
  }) => {
    await createPost(input);
    router.replace("/");
  };

  return (
    <div className="min-h-full bg-white md:bg-transparent">
      <div className="mx-auto w-full max-w-[640px] py-3 md:py-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1 px-5 py-2 text-sm font-medium text-black md:hidden"
        >
          <ArrowLeft className="size-4" />
          ย้อนกลับ
        </button>
        <CreatePostCard
          initialExpanded
          onSubmit={handleCreatePost}
          loading={isCreatingPost}
          className="rounded-none border-0 px-5 py-3 shadow-none md:rounded-xl md:border-[1.5px] md:p-6 md:shadow-sm"
        />
      </div>
    </div>
  );
}
