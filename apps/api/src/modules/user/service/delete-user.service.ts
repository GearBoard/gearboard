import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { UserRole } from "../../../common/types/index.js";
import { userRepository } from "../user.repository.js";

export async function deleteUserService(
  id: string,
  requesterId: string,
  requesterRole: UserRole
): Promise<void> {
  if (requesterId !== id && requesterRole !== UserRole.ADMIN) {
    throw new ForbiddenError("Forbidden");
  }
  const user = await userRepository.findById(id);
  if (!user) throw new NotFoundError("User not found");

  await userRepository.softDelete(id);
}
