import { Router } from "express";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { validateBody, validateParams } from "../../common/middleware/validate.middleware.js";
import { commentController } from "./comment.controller.js";
import { postController } from "../post/post.controller.js";
import {
  commentIdValidateSchema,
  createCommentSchema,
  createReplySchema,
  postIdParamsSchema,
} from "./comment.schema.js";

export const commentRoute = Router({ mergeParams: true });

// GET /posts/:postId/comments — list root-level comments for a post
commentRoute.get(
  "/",
  validateParams(postIdParamsSchema),
  postController.getComments.bind(postController)
);

// POST /posts/:postId/comments — create a root-level comment (requires auth)
commentRoute.post(
  "/",
  requireAuth,
  validateParams(postIdParamsSchema),
  validateBody(createCommentSchema),
  postController.createComment.bind(postController)
);

commentRoute.post(
  "/:commentId/replies",
  requireAuth,
  validateParams(commentIdValidateSchema),
  validateBody(createReplySchema),
  commentController.createReply.bind(commentController)
);

commentRoute.delete(
  "/:commentId",
  requireAuth,
  validateParams(commentIdValidateSchema),
  commentController.deleteComment.bind(commentController)
);
