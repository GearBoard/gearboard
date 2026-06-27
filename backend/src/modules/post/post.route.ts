import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import {
  GetPostByIdParamsSchema,
  GetAllPostsQuerySchema,
  CreatePostBodySchema,
  UpdatePostParamsSchema,
  UpdatePostBodySchema,
  DeletePostParamsSchema,
  GetCommentsByPostIdParamsSchema,
  CreateCommentParamsSchema,
  CreateCommentBodySchema,
} from "./dto/index.js";
import {
  getPostByIdService,
  getAllPostsService,
  createPostService,
  updatePostService,
  deletePostService,
  getCommentsByPostIdService,
  createCommentByPostIdService,
} from "./service/index.js";

export const postRoute = new Hono<{ Variables: AppVariables }>();

postRoute.get("/:id", zValidator("param", GetPostByIdParamsSchema, validationHook), async (c) => {
  const { id } = c.req.valid("param");
  const result = await getPostByIdService(id);
  return c.json(successResponse(result), 200);
});

postRoute.get("/", zValidator("query", GetAllPostsQuerySchema, validationHook), async (c) => {
  const query = c.req.valid("query");
  const result = await getAllPostsService(query);
  return c.json(successResponse(result), 200);
});

postRoute.post(
  "/",
  requireAuth,
  zValidator("json", CreatePostBodySchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");
    const result = await createPostService(data, user.id);
    return c.json(successResponse(result, 201, "Post created"), 201);
  }
);

postRoute.patch(
  "/:id",
  requireAuth,
  zValidator("param", UpdatePostParamsSchema, validationHook),
  zValidator("json", UpdatePostBodySchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const result = await updatePostService(id, data, user.id);
    return c.json(successResponse(result, 200, "Post updated"), 200);
  }
);

postRoute.delete(
  "/:id",
  requireAuth,
  zValidator("param", DeletePostParamsSchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    await deletePostService(id, user.id);
    return c.json(successResponse(null, 200, "Post deleted successfully"), 200);
  }
);

postRoute.get(
  "/:postId/comments",
  zValidator("param", GetCommentsByPostIdParamsSchema, validationHook),
  async (c) => {
    const { postId } = c.req.valid("param");
    const result = await getCommentsByPostIdService(postId);
    return c.json(successResponse(result), 200);
  }
);

postRoute.post(
  "/:postId/comment",
  requireAuth,
  zValidator("param", CreateCommentParamsSchema, validationHook),
  zValidator("json", CreateCommentBodySchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { postId } = c.req.valid("param");
    const data = c.req.valid("json");
    const result = await createCommentByPostIdService(user.id, postId, data);
    return c.json(successResponse(result, 201, "Comment created"), 201);
  }
);
