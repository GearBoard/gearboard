import { BadRequestError } from "../../../common/errors/app-error.js";
import { uploadToGCS } from "../../../common/services/gcsUploader.js";
import { UploadImageOutputDTO, type UploadImageForm } from "../dto/upload-image.dto.js";

export async function uploadImageService(
  file: UploadImageForm["file"]
): Promise<UploadImageOutputDTO> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadToGCS({
      file: buffer,
      filename: file.name,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
    });

    return UploadImageOutputDTO.toDTO(uploaded.url);
  } catch (error) {
    if (error instanceof Error && /empty|10MB|Unsupported MIME/.test(error.message)) {
      throw new BadRequestError(error.message);
    }
    throw error;
  }
}
