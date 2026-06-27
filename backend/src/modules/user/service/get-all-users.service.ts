import { userRepository } from "../user.repository.js";
import {
  toGetAllUsersOutputDTO,
  type GetAllUsersQuery,
  type GetAllUsersOutputDTO,
} from "../dto/index.js";
import { getSkipTake } from "../../../common/utils/pagination.js";

export async function getAllUsersService(query: GetAllUsersQuery): Promise<GetAllUsersOutputDTO> {
  const { skip, take } = getSkipTake(query.page, query.limit);
  const { users, total } = await userRepository.findMany({
    skip,
    take,
    search: query.search,
    role: query.role,
    departmentId: query.departmentId,
  });
  return toGetAllUsersOutputDTO(users, total, query.page, query.limit);
}
