import { NotFoundError } from "../../../common/errors/app-error.js";
import { postRepository } from "../post.repository.js";
import { GetPostByIdOutputDTO } from "../dto/get-post-by-id.dto.js";

export async function getPostByIdService(id: string): Promise<GetPostByIdOutputDTO> {
  const post = await postRepository.findById(id);
  if (!post) throw new NotFoundError("Post not found");

  return GetPostByIdOutputDTO.toDTO(post);
}
