"use client";

import { useState } from "react";
import { PostCard } from "@/features/feed";
import { CreatePostCard } from "@/features/post/components/CreatePostCard";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import { useDeletePost, useGetMe, useGetPostList, useUpdatePost } from "@/shared/hooks";

export default function MyPosts() {
  const { data: me } = useGetMe();
  const {
    data: postList,
    isLoading,
    mutate,
  } = useGetPostList(me?.id ? { userId: me.id } : undefined);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  const posts = postList?.data ?? [];

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full py-6">
      {isLoading ? (
        <p className="text-center text-dark-gray">กำลังโหลด...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-dark-gray">คุณยังไม่มีโพสต์</p>
      ) : (
        posts.map((post) =>
          editingPostId === post.id ? (
            <EditingPostCard
              key={post.id}
              post={post}
              onDone={() => {
                setEditingPostId(null);
                mutate();
              }}
              onCancel={() => setEditingPostId(null)}
            />
          ) : (
            <PostCard
              key={post.id}
              title={post.title}
              description={post.description}
              tags={post.tags}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              authorInfo={post.authorInfo}
              createdAt={post.createdAt}
              imageUrl={post.images[0] ?? null}
              isOwner
              onEditClick={() => setEditingPostId(post.id)}
              onDeleteClick={() => setDeletingPostId(post.id)}
            />
          )
        )
      )}

      <DeletePostConfirmModal
        postId={deletingPostId}
        onCancel={() => setDeletingPostId(null)}
        onDeleted={() => {
          setDeletingPostId(null);
          mutate();
        }}
      />
    </div>
  );
}

interface DeletePostConfirmModalProps {
  postId: string | null;
  onCancel: () => void;
  onDeleted: () => void;
}

function DeletePostConfirmModal({ postId, onCancel, onDeleted }: DeletePostConfirmModalProps) {
  const { trigger: deletePost, isMutating } = useDeletePost(postId ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setError(null);
    try {
      await deletePost();
      onDeleted();
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  }

  return (
    <ConfirmModal
      open={!!postId}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
      title="ลบโพสต์"
      message="คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้? การกระทำนี้ไม่สามารถย้อนกลับได้"
      confirmLabel="ลบ"
      cancelLabel="ยกเลิก"
      onConfirm={handleConfirm}
      onCancel={onCancel}
      isLoading={isMutating}
      errorMessage={error ?? undefined}
    />
  );
}

interface EditingPostCardProps {
  post: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    images: string[];
  };
  onDone: () => void;
  onCancel: () => void;
}

function EditingPostCard({ post, onDone }: EditingPostCardProps) {
  const { trigger: updatePost, isMutating } = useUpdatePost(post.id);

  return (
    <CreatePostCard
      mode="edit"
      initialTitle={post.title}
      initialDescription={post.description}
      initialTags={post.tags}
      initialImage={post.images[0] ?? null}
      loading={isMutating}
      onSubmit={async ({ title, description, tags }) => {
        await updatePost({ title, description, tags });
        onDone();
      }}
    />
  );
}
