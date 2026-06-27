import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import {
  CreateReplyParamsSchema,
  CreateReplyBodySchema,
  DeleteCommentParamsSchema,
} from "./dto/index.js";
import { createReplyService, deleteCommentService } from "./service/index.js";

export const commentRoute = new Hono<{ Variables: AppVariables }>();

commentRoute.post(
  "/:commentId/replies",
  requireAuth,
  zValidator("param", CreateReplyParamsSchema, validationHook),
  zValidator("json", CreateReplyBodySchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { commentId } = c.req.valid("param");
    const data = c.req.valid("json");
    const result = await createReplyService(commentId, user.id, data);
    return c.json(successResponse(result, 201, "Reply created"), 201);
  }
);

commentRoute.delete(
  "/:commentId",
  requireAuth,
  zValidator("param", DeleteCommentParamsSchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { commentId } = c.req.valid("param");
    await deleteCommentService(commentId, user.id);
    return c.json(successResponse(null, 200, "Comment deleted successfully"), 200);
  }
);
