import { postRepository } from "../post.repository.js";
import { GetAllPostsOutputDTO, type GetAllPostsQuery } from "./get-all-posts.dto.js";
import { getSkipTake } from "../../../common/utils/pagination.js";

export async function getAllPostsService(query: GetAllPostsQuery): Promise<GetAllPostsOutputDTO> {
  const { skip, take } = getSkipTake(query.page, query.limit);
  const { posts, total } = await postRepository.findMany({
    skip,
    take,
    search: query.search,
    tagName: query.tag,
    userId: query.userId,
  });
  return GetAllPostsOutputDTO.toDTO(posts, total, query.page, query.limit);
}
