import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { postRepository } from "../post.repository.js";

export async function deletePostService(id: string, userId: string): Promise<void> {
  const post = await postRepository.findById(id);
  if (!post) throw new NotFoundError("Post not found");
  if (post.userId !== userId) throw new ForbiddenError("Forbidden");

  const deleted = await postRepository.softDelete(id);
  if (!deleted) throw new NotFoundError("Post not found");
}
