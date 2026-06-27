import { z } from "zod";
import type { Post } from "../post.repository.js";

export const GetPostByIdParamsInputDTO = z.object({
  id: z.string().trim().min(1, "Invalid post id"),
});

export class GetPostByIdOutputDTO {
  id!: string;
  title!: string;
  description!: string;
  tags!: string[];
  images!: string[];
  likeCount!: number;
  commentCount!: number;
  isClosed!: boolean;
  authorInfo!: { id: string; username: string | null; image: string | null };
  createdAt!: string;
  updatedAt!: string;

  static toDTO(post: Post): GetPostByIdOutputDTO {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      tags: post.tags.map((pt) => pt.tag.name),
      images: post.images.map((pi) => pi.url),
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      isClosed: post.isClosed,
      authorInfo: {
        id: post.user.id,
        username: post.user.username,
        image: post.user.image,
      },
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    };
  }
}
