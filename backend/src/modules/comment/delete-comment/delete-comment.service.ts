import { ForbiddenError, NotFoundError } from "../../../common/errors/app-error.js";
import { commentRepository } from "../comment.repository.js";

export async function deleteCommentService(commentId: string, userId: string): Promise<void> {
  const comment = await commentRepository.findById(commentId);
  if (!comment) throw new NotFoundError("Comment not found");
  if (comment.userId !== userId) throw new ForbiddenError("Forbidden");

  const deleted = await commentRepository.softDelete(commentId);
  if (!deleted) throw new NotFoundError("Comment not found");
}
