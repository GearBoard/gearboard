import { Prisma } from "../../../../generated/prisma/client.js";
import { ConflictError, ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { UserRole } from "../../../common/types/index.js";
import { userRepository } from "../user.repository.js";
import { UpdateUserOutputDTO, type UpdateUserBody } from "../dto/index.js";

export async function updateUserService(
  id: string,
  data: UpdateUserBody,
  requesterId: string,
  requesterRole: UserRole
): Promise<UpdateUserOutputDTO> {
  if (requesterId !== id && requesterRole !== UserRole.ADMIN) {
    throw new ForbiddenError("Forbidden");
  }
  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError("User not found");

  try {
    const updated = await userRepository.update(id, data);
    if (!updated) throw new NotFoundError("User not found");
    return UpdateUserOutputDTO.toDTO(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ConflictError("Username already taken");
    }
    throw error;
  }
}
