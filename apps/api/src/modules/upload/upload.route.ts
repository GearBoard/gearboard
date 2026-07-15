import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import { UploadImageFormInputDTO } from "./dto/upload-image.dto.js";
import { uploadImageService } from "./service/upload-image.service.js";

export const uploadRoute = new Hono<{ Variables: AppVariables }>().post(
  "/images",
  requireAuth,
  zValidator("form", UploadImageFormInputDTO, validationHook),
  async (c) => {
    const { file } = c.req.valid("form");
    const result = await uploadImageService(file);

    return c.json(successResponse(result, "Image uploaded"), 201);
  }
);
