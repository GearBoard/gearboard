import type { Tag } from "../../../../generated/prisma/client.js";

export class TagOutputDTO {
  id!: string;
  name!: string;
  color!: string;
  backgroundColor!: string;

  static toDTO(tag: Tag): TagOutputDTO {
    return {
      id: tag.id,
      name: tag.name,
      color: tag.color,
      backgroundColor: tag.backgroundColor,
    };
  }
}
