import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { UserRole } from "../../../common/types/index.js";
import { userRepository } from "../user.repository.js";
import { UserOutputDTO } from "../dto/index.js";

export async function getUserByIdService(
  id: string,
  requesterId: string,
  requesterRole: UserRole
): Promise<UserOutputDTO> {
  if (requesterId !== id && requesterRole !== UserRole.ADMIN) {
    throw new ForbiddenError("Forbidden");
  }

  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError("User not found");

  return UserOutputDTO.toDTO(user);
}
