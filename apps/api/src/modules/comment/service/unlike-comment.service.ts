import { NotFoundError } from "../../../common/errors/app-error.js";
import { commentRepository } from "../comment.repository.js";
import { LikeCommentOutputDTO } from "../dto/like-comment.dto.js";

export async function unlikeCommentService(
  commentId: string,
  userId: string
): Promise<LikeCommentOutputDTO> {
  const comment = await commentRepository.findById(commentId);
  if (!comment) throw new NotFoundError("Comment not found");

  const existingLike = await commentRepository.findLike(userId, commentId);
  if (!existingLike) throw new NotFoundError("Comment like not found");

  const likeCount = await commentRepository.unlike(userId, commentId);
  return LikeCommentOutputDTO.toDTO(commentId, false, likeCount);
}
