import { z } from "zod";
import type { Comment } from "../comment.repository.js";

export const CreateReplyParamsInputDTO = z.object({
  commentId: z.string().trim().min(1, "Invalid comment id"),
});

export const CreateReplyBodyInputDTO = z.object({
  content: z.string().min(1, "Content of comment is required"),
  images: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : null)),
});

export type CreateReplyBody = z.infer<typeof CreateReplyBodyInputDTO>;

export class CreateReplyOutputDTO {
  id!: string;
  postId!: string;
  userId!: string;
  parentId!: string | null;
  content!: string;
  images!: Array<{ id: string; url: string }>;
  author?: { id: string; username: string | null; image: string | null };
  createdAt!: string;

  static toDTO(comment: Comment): CreateReplyOutputDTO {
    return {
      id: comment.id,
      postId: comment.postId,
      userId: comment.userId,
      parentId: comment.parentId ?? null,
      content: comment.content,
      images: comment.images.map((img) => ({ id: img.id, url: img.url })),
      author: comment.user
        ? { id: comment.user.id, username: comment.user.username, image: comment.user.image }
        : undefined,
      createdAt: comment.createdAt.toISOString(),
    };
  }
}
