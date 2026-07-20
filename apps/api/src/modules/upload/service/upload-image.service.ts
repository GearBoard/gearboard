import { uploadToGCS } from "../../../common/services/gcsUploader.js";
import { BadRequestError } from "../../../common/errors/app-error.js";

export async function uploadImageService(file: File) {
  if (!file) {
    throw new BadRequestError("File is required");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return uploadToGCS({
    file: buffer,
    filename: file.name,
    mimeType: file.type,
    size: file.size,
  });
}
