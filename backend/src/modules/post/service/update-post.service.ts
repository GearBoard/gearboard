import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { postRepository } from "../post.repository.js";
import { UpdatePostOutputDTO, type UpdatePostBody } from "../dto/update-post.dto.js";

export async function updatePostService(
  id: string,
  data: UpdatePostBody,
  userId: string
): Promise<UpdatePostOutputDTO> {
  const post = await postRepository.findById(id);
  if (!post) throw new NotFoundError("Post not found");

  if (post.userId !== userId) throw new ForbiddenError("Forbidden");

  const updated = await postRepository.update(id, data);
  if (!updated) throw new NotFoundError("Post not found");

  return UpdatePostOutputDTO.toDTO(updated);
}
