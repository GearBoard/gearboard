import { z } from "zod";

export const DeleteUserParamsInputDTO = z.object({
  id: z.string().trim().min(1, "Invalid user id"),
});
