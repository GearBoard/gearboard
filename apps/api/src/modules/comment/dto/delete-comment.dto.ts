import { z } from "zod";

export const DeleteCommentParamsInputDTO = z.object({
  commentId: z.string().trim().min(1, "Invalid comment id"),
});
