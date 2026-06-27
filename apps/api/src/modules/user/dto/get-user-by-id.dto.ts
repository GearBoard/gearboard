import { z } from "zod";
import type { User } from "../../../../generated/prisma/client.js";
import { UserRole } from "../../../common/types/index.js";

export const GetUserByIdParamsInputDTO = z.object({
  id: z.string().trim().min(1, "Invalid user id"),
});

export class UserOutputDTO {
  id!: string;
  name!: string;
  email!: string;
  image!: string | null;
  description!: string | null;
  role!: UserRole;
  departmentId!: string | null;
  createdAt!: string;
  updatedAt!: string;

  static toDTO(user: User): UserOutputDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
      role: user.role,
      departmentId: user.departmentId ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
