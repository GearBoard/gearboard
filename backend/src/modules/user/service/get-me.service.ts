import { NotFoundError } from "../../../common/errors/app-error.js";
import { userRepository } from "../user.repository.js";
import { UserOutputDTO } from "../dto/index.js";

export async function getMeService(userId: string): Promise<UserOutputDTO> {
  const user = await userRepository.findById(userId);
  if (!user) throw new NotFoundError("User not found");

  return UserOutputDTO.toDTO(user);
}
