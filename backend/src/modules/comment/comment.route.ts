import { Router } from "express";
import { validateBody, validateParams } from "../../common/middleware/validate.middleware.js";
import { requireAuth } from "../../common/middleware/auth.middleware.js";
import { commentController } from "./comment.controller.js";
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
  commentController.getComments.bind(commentController)
);

// POST /posts/:postId/comments — create a root-level comment (requires auth)
commentRoute.post(
  "/",
  requireAuth,
  validateParams(postIdParamsSchema),
  validateBody(createCommentSchema),
  commentController.createComment.bind(commentController)
);

commentRoute.post(
  "/:commentId/replies",
  validateParams(commentIdValidateSchema),
  validateBody(createReplySchema),
  commentController.createReply.bind(commentController)
);

commentRoute.delete(
  "/:commentId",
  validateParams(commentIdValidateSchema),
  commentController.deleteComment.bind(commentController)
);
