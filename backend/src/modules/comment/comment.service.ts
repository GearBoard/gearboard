import { ForbiddenError, NotFoundError } from "../../common/errors/app-error.js";
import { commentRepository } from "./comment.repository.js";
import { toDto } from "./comment.mapper.js";
import type {
  CommentResponseDto,
  CreateCommentRequestDto,
  CreateReplyRequestDto,
} from "./comment.dto.js";

export const commentService = {
  async getById(id: string): Promise<CommentResponseDto> {
    const comment = await commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    return toDto(comment);
  },

  async getByPostId(postId: string): Promise<CommentResponseDto[]> {
    const comments = await commentRepository.findManyByPostId(postId);
    return comments.map(toDto);
  },

  async createComment(
    userId: string,
    postId: string,
    data: CreateCommentRequestDto
  ): Promise<CommentResponseDto> {
    const comment = await commentRepository.create(userId, postId, data);
    return toDto(comment);
  },

  async createReply(
    userId: string,
    postId: string,
    parentId: string,
    data: CreateReplyRequestDto
  ): Promise<CommentResponseDto> {
    const comment = await commentRepository.createReply(userId, postId, parentId, data);
    return toDto(comment);
  },

  async createReplyFromParent(
    parentId: string,
    userId: string,
    data: CreateReplyRequestDto
  ): Promise<CommentResponseDto> {
    const parentComment = await commentRepository.findById(parentId);
    if (!parentComment) {
      throw new NotFoundError("Comment doesn't exist");
    }

    const comment = await commentRepository.createReply(
      userId,
      parentComment.postId,
      parentId,
      data
    );
    return toDto(comment);
  },

  async deleteComment(id: string, userId: string): Promise<void> {
    const comment = await commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundError("Comment not found");
    }

    if (comment.userId !== userId) {
      throw new ForbiddenError("Forbidden");
    }

    const deleted = await commentRepository.softDelete(id);
    if (!deleted) {
      throw new NotFoundError("Comment not found");
    }
  },
};
