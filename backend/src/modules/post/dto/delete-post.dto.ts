import { z } from "zod";

export const DeletePostParamsSchema = z.object({
  id: z.string().trim().min(1, "Invalid post id"),
});
