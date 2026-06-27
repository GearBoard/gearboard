import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
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

  const updated = await userRepository.update(id, data);
  return UpdateUserOutputDTO.toDTO(updated);
}
