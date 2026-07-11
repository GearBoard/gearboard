import { ConflictError, NotFoundError } from "../../../common/errors/app-error.js";
import { postRepository } from "../post.repository.js";

export async function unsavePostService(
  postId: string,
  userId: string,
): Promise<void> {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  const alreadySaved = await postRepository.isSaved(postId, userId);

  if (!alreadySaved) {
    throw new ConflictError("Post is not saved");
  }

  await postRepository.unsavePost(postId, userId);
}
