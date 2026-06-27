import { z } from "zod";
import { GetPostByIdOutputDTO } from "../get-post-by-id/get-post-by-id.dto.js";
import type { Post } from "../post.repository.js";

export const CreatePostBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255, "Title too long"),
  description: z.string().trim().min(1, "Description is required"),
  tags: z
    .array(z.string().trim())
    .optional()
    .default([])
    .transform((tags) => [...new Set(tags)]),
  images: z.array(z.string().url("Invalid image URL")).optional().default([]),
});

export type CreatePostBody = z.infer<typeof CreatePostBodySchema>;

export class CreatePostOutputDTO extends GetPostByIdOutputDTO {
  static toDTO(post: Post): CreatePostOutputDTO {
    return GetPostByIdOutputDTO.toDTO(post);
  }
}
