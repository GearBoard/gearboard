import { tagRepository } from "../tag.repository.js";
import { TagOutputDTO } from "../dto/get-tags.dto.js";

export async function getTagsService() {
  const tags = await tagRepository.findAll();
  return tags.map((tag) => TagOutputDTO.toDTO(tag));
}
