import { commentRepository } from "../../comment/comment.repository.js";
import {
  CreateCommentByPostIdOutputDTO,
  type CreateCommentBody,
} from "../dto/create-comment-by-post-id.dto.js";

export async function createCommentByPostIdService(
  userId: string,
  postId: string,
  data: CreateCommentBody
): Promise<CreateCommentByPostIdOutputDTO> {
  const comment = await commentRepository.create(userId, postId, data);

  return CreateCommentByPostIdOutputDTO.toDTO(comment);
}
