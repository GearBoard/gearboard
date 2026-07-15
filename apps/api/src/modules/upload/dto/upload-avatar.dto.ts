import { z } from "zod";

export const UploadAvatarBodyInputDTO = z.object({
  file: z.instanceof(File, { message: "File is required and must be a valid file" }),
});
