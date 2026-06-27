import { postRepository } from "../post.repository.js";
import { CreatePostOutputDTO, type CreatePostBody } from "./create-post.dto.js";

export async function createPostService(
  data: CreatePostBody,
  userId: string
): Promise<CreatePostOutputDTO> {
  const post = await postRepository.create(data, userId);
  return CreatePostOutputDTO.toDTO(post);
}
