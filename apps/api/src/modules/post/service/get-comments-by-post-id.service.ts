import { commentRepository } from "../../comment/comment.repository.js";
import { GetCommentsByPostIdOutputDTO } from "../dto/get-comments-by-post-id.dto.js";

export async function getCommentsByPostIdService(
  postId: string
): Promise<GetCommentsByPostIdOutputDTO[]> {
  const comments = await commentRepository.findManyByPostId(postId);
  return comments.map(GetCommentsByPostIdOutputDTO.toDTO);
}
