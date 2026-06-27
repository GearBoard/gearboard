import { z } from "zod";

export const DeleteCommentParamsSchema = z.object({
  commentId: z.string().trim().min(1, "Invalid comment id"),
});
