import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import {
  GetPostByIdParamsInputDTO,
  GetAllPostsQueryInputDTO,
  CreatePostBodyInputDTO,
  UpdatePostParamsInputDTO,
  UpdatePostBodyInputDTO,
  DeletePostParamsInputDTO,
  GetCommentsByPostIdParamsInputDTO,
  CreateCommentParamsInputDTO,
  CreateCommentBodyInputDTO,
} from "./dto/index.js";
import {
  getPostByIdService,
  getAllPostsService,
  createPostService,
  updatePostService,
  deletePostService,
  getCommentsByPostIdService,
  createCommentByPostIdService,
  likePostService,
  unlikePostService,
  savePostService,
  unsavePostService,
} from "./service/index.js";

export const postRoute = new Hono<{ Variables: AppVariables }>()
  .get("/:id", zValidator("param", GetPostByIdParamsInputDTO, validationHook), async (c) => {
    const { id } = c.req.valid("param");
    const result = await getPostByIdService(id);
    return c.json(successResponse(result), 200);
  })
  .get("/", zValidator("query", GetAllPostsQueryInputDTO, validationHook), async (c) => {
    const query = c.req.valid("query");
    const result = await getAllPostsService(query);
    return c.json(successResponse(result), 200);
  })
  .post("/", requireAuth, zValidator("json", CreatePostBodyInputDTO, validationHook), async (c) => {
    const user = c.get("user");
    const data = c.req.valid("json");
    const result = await createPostService(data, user.id);
    return c.json(successResponse(result, "Post created"), 201);
  })
  .patch(
    "/:id",
    requireAuth,
    zValidator("param", UpdatePostParamsInputDTO, validationHook),
    zValidator("json", UpdatePostBodyInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");
      const result = await updatePostService(id, data, user.id);
      return c.json(successResponse(result, "Post updated"), 200);
    }
  )
  .delete(
    "/:id",
    requireAuth,
    zValidator("param", DeletePostParamsInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      await deletePostService(id, user.id);
      return c.json(successResponse(null, "Post deleted successfully"), 200);
    }
  )
  .post(
    "/:id/like",
    requireAuth,
    zValidator("param", GetPostByIdParamsInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      await likePostService(id, user.id);
      return c.json(successResponse(null, "Post liked"), 200);
    }
  )
  .delete(
    "/:id/like",
    requireAuth,
    zValidator("param", GetPostByIdParamsInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      await unlikePostService(id, user.id);
      return c.json(successResponse(null, "Post unliked"), 200);
    }
  )
  .post(
    "/:id/save",
    requireAuth,
    zValidator("param", GetPostByIdParamsInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      await savePostService(id, user.id);
      return c.json(successResponse(null, "Post saved"), 200);
    }
  )
  .delete(
    "/:id/save",
    requireAuth,
    zValidator("param", GetPostByIdParamsInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      await unsavePostService(id, user.id);
      return c.json(successResponse(null, "Post unsaved"), 200);
    }
  )
  .get(
    "/:postId/comments",
    zValidator("param", GetCommentsByPostIdParamsInputDTO, validationHook),
    async (c) => {
      const { postId } = c.req.valid("param");
      const result = await getCommentsByPostIdService(postId);
      return c.json(successResponse(result), 200);
    }
  )
  .post(
    "/:postId/comment",
    requireAuth,
    zValidator("param", CreateCommentParamsInputDTO, validationHook),
    zValidator("json", CreateCommentBodyInputDTO, validationHook),
    async (c) => {
      const user = c.get("user");
      const { postId } = c.req.valid("param");
      const data = c.req.valid("json");
      const result = await createCommentByPostIdService(user.id, postId, data);
      return c.json(successResponse(result, "Comment created"), 201);
    }
  );

  