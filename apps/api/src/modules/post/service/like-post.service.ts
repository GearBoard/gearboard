import { ConflictError, NotFoundError } from "../../../common/errors/app-error.js";
import { postRepository } from "../post.repository.js";

export async function likePostService(
  postId: string,
  userId: string,
): Promise<void> {
  const post = await postRepository.findById(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  const alreadyLiked = await postRepository.isLiked(postId, userId);

  if (alreadyLiked) {
    throw new ConflictError("Post already liked");
  }

  await postRepository.likePost(postId, userId);
}
