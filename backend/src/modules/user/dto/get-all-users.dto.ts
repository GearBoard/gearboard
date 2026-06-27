import { z } from "zod";
import type { User } from "../../../../generated/prisma/client.js";
import type { PaginatedResult } from "../../../common/utils/pagination.js";
import { UserOutputDTO } from "./get-user-by-id.dto.js";

export const GetAllUsersQueryInputDTO = z.object({
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
  role: z.enum(["USER", "ADMIN"]).optional(),
  departmentId: z.string().trim().min(1).optional(),
});

export type GetAllUsersQuery = z.infer<typeof GetAllUsersQueryInputDTO>;

export type GetAllUsersOutputDTO = PaginatedResult<UserOutputDTO>;

export function toGetAllUsersOutputDTO(
  users: User[],
  total: number,
  page: number,
  limit: number
): GetAllUsersOutputDTO {
  return {
    data: users.map(UserOutputDTO.toDTO),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}
