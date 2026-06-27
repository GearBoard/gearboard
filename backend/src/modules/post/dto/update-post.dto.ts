import { z } from "zod";
import { GetPostByIdOutputDTO } from "./get-post-by-id.dto.js";
import type { Post } from "../post.repository.js";

export const UpdatePostParamsInputDTO = z.object({
  id: z.string().trim().min(1, "Invalid post id"),
});

export const UpdatePostBodyInputDTO = z.object({
  title: z.string().trim().min(1, "Title is required").max(255, "Title too long").optional(),
  description: z.string().trim().min(1, "Description is required").optional(),
  tags: z
    .array(z.string().trim())
    .optional()
    .transform((tags) => (tags ? [...new Set(tags)] : undefined)),
  isClosed: z.boolean().optional(),
});

export type UpdatePostBody = z.infer<typeof UpdatePostBodyInputDTO>;

export class UpdatePostOutputDTO extends GetPostByIdOutputDTO {
  static toDTO(post: Post): UpdatePostOutputDTO {
    return GetPostByIdOutputDTO.toDTO(post);
  }
}
