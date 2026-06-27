import { z } from "zod";
import { GetPostByIdOutputDTO } from "../get-post-by-id/get-post-by-id.dto.js";
import type { Post } from "../post.repository.js";

export const GetAllPostsQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .refine((v) => v === undefined || /^[1-9]\d*$/.test(v), {
      message: "Page must be a positive integer",
    })
    .transform((v) => (v ? parseInt(v, 10) : 1))
    .refine((n) => n >= 1, { message: "Page must be >= 1" }),
  limit: z
    .string()
    .optional()
    .refine((v) => v === undefined || /^[1-9]\d*$/.test(v), {
      message: "Limit must be a positive integer",
    })
    .transform((v) => (v ? parseInt(v, 10) : 10))
    .refine((n) => n >= 1 && n <= 100, { message: "Limit must be between 1 and 100" }),
  search: z.string().optional(),
  tag: z.string().optional(),
  userId: z.string().trim().min(1, { message: "userId must not be empty" }).optional(),
});

export type GetAllPostsQuery = z.infer<typeof GetAllPostsQuerySchema>;

export class GetAllPostsOutputDTO {
  data!: GetPostByIdOutputDTO[];
  total!: number;
  page!: number;
  limit!: number;
  totalPages!: number;

  static toDTO(posts: Post[], total: number, page: number, limit: number): GetAllPostsOutputDTO {
    return {
      data: posts.map(GetPostByIdOutputDTO.toDTO),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
