import { z } from "zod";
import { GetCommentsByPostIdOutputDTO } from "../get-comments-by-post-id/get-comments-by-post-id.dto.js";
import type { Comment } from "../../comment/comment.repository.js";

export const CreateCommentParamsSchema = z.object({
  postId: z.string().trim().min(1, "Invalid post id"),
});

export const CreateCommentBodySchema = z.object({
  content: z.string().min(1, "Content of comment is required"),
  images: z
    .string()
    .url()
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : null)),
});

export type CreateCommentBody = z.infer<typeof CreateCommentBodySchema>;

export class CreateCommentByPostIdOutputDTO extends GetCommentsByPostIdOutputDTO {
  static toDTO(comment: Comment): CreateCommentByPostIdOutputDTO {
    return GetCommentsByPostIdOutputDTO.toDTO(comment);
  }
}
