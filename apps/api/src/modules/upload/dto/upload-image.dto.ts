import { z } from "zod";

export const UploadImageFormInputDTO = z.object({
  file: z.custom<File>((value) => value instanceof File, "Image file is required"),
});

export type UploadImageForm = z.infer<typeof UploadImageFormInputDTO>;

export class UploadImageOutputDTO {
  url!: string;

  static toDTO(url: string): UploadImageOutputDTO {
    return { url };
  }
}
