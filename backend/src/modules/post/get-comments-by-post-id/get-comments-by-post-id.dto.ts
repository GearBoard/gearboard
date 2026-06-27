import { z } from "zod";
import type { Comment } from "../../comment/comment.repository.js";

export const GetCommentsByPostIdParamsSchema = z.object({
  postId: z.string().trim().min(1, "Invalid post id"),
});

export class GetCommentsByPostIdOutputDTO {
  id!: string;
  postId!: string;
  userId!: string;
  parentId!: string | null;
  content!: string;
  images!: Array<{ id: string; url: string }>;
  author?: { id: string; username: string | null; image: string | null };
  replies?: GetCommentsByPostIdOutputDTO[];
  createdAt!: string;

  static toDTO(comment: Comment): GetCommentsByPostIdOutputDTO {
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
      replies: comment.replies?.map((r) =>
        GetCommentsByPostIdOutputDTO.toDTO(r as unknown as Comment)
      ),
      createdAt: comment.createdAt.toISOString(),
    };
  }
}
