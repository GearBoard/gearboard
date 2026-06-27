import { z } from "zod";
import { UserOutputDTO } from "./get-user-by-id.dto.js";
import type { User } from "../../../../generated/prisma/client.js";

export const UpdateUserParamsInputDTO = z.object({
  id: z.string().trim().min(1, "Invalid user id"),
});

export const UpdateUserBodyInputDTO = z.object({
  name: z.string().trim().min(1, "Name must not be empty").optional(),
  image: z
    .string()
    .url("Image must be a valid URL")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v !== undefined ? (v === "" ? null : v) : undefined)),
  description: z.string().optional().nullable(),
  departmentId: z.union([z.string().trim().min(1), z.null()]).optional(),
});

export type UpdateUserBody = z.infer<typeof UpdateUserBodyInputDTO>;

export class UpdateUserOutputDTO extends UserOutputDTO {
  static toDTO(user: User): UpdateUserOutputDTO {
    return UserOutputDTO.toDTO(user);
  }
}
