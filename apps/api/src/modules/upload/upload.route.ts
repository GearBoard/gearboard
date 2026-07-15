import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import { UploadAvatarBodyInputDTO } from "./dto/index.js";
import { uploadAvatarService } from "./service/index.js";

export const uploadRoute = new Hono<{ Variables: AppVariables }>().post(
  "/avatar",
  requireAuth,
  zValidator("form", UploadAvatarBodyInputDTO, validationHook),
  async (c) => {
    const data = c.req.valid("form");
    const result = await uploadAvatarService(data.file);
    return c.json(successResponse(result, "Avatar uploaded successfully"), 201);
  }
);
