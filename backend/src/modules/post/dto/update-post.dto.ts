import { z } from "zod";
import { GetPostByIdOutputDTO } from "./get-post-by-id.dto.js";
import type { Post } from "../post.repository.js";

export const UpdatePostParamsSchema = z.object({
  id: z.string().trim().min(1, "Invalid post id"),
});

export const UpdatePostBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255, "Title too long").optional(),
  description: z.string().trim().min(1, "Description is required").optional(),
  tags: z
    .array(z.string().trim())
    .optional()
    .transform((tags) => (tags ? [...new Set(tags)] : undefined)),
  isClosed: z.boolean().optional(),
});

export type UpdatePostBody = z.infer<typeof UpdatePostBodySchema>;

export class UpdatePostOutputDTO extends GetPostByIdOutputDTO {
  static toDTO(post: Post): UpdatePostOutputDTO {
    return GetPostByIdOutputDTO.toDTO(post);
  }
}
