import { NotFoundError } from "../../../common/errors/app-error.js";
import { commentRepository } from "../comment.repository.js";
import { CreateReplyOutputDTO, type CreateReplyBody } from "./create-reply.dto.js";

export async function createReplyService(
  commentId: string,
  userId: string,
  data: CreateReplyBody
): Promise<CreateReplyOutputDTO> {
  const parent = await commentRepository.findById(commentId);
  if (!parent) throw new NotFoundError("Comment doesn't exist");

  const comment = await commentRepository.createReply(userId, parent.postId, commentId, data);
  return CreateReplyOutputDTO.toDTO(comment);
}
