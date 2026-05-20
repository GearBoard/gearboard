import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";
import type { CreateCommentRequestDto, CreateReplyRequestDto } from "./comment.dto.js";
import type { CommentWithRelations } from "./comment.mapper.js";

const commentInclude = {
  images: true,
  user: true,
  replies: {
    where: {
      deletedAt: null,
    },
    include: {
      images: true,
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  },
} satisfies Prisma.CommentInclude;

export const commentRepository = {
  async findById(id: string): Promise<CommentWithRelations | null> {
    const comment = await prisma.comment.findUnique({
      where: { id, deletedAt: null },
      include: commentInclude,
    });

    return comment as CommentWithRelations | null;
  },

  async findManyByPostId(postId: string): Promise<CommentWithRelations[]> {
    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null, deletedAt: null },
      include: commentInclude,
      orderBy: { createdAt: "desc" },
    });

    return comments as CommentWithRelations[];
  },

  async create(
    userId: string,
    postId: string,
    data: CreateCommentRequestDto
  ): Promise<CommentWithRelations> {
    const comment = await prisma.comment.create({
      data: {
        userId,
        postId,
        content: data.content,
        images: data.images
          ? {
              create: { url: data.images },
            }
          : undefined,
      },
      include: commentInclude,
    });

    return comment as CommentWithRelations;
  },

  async createReply(
    userId: string,
    postId: string,
    parentId: string,
    data: CreateReplyRequestDto
  ): Promise<CommentWithRelations> {
    const comment = await prisma.comment.create({
      data: {
        userId,
        postId,
        parentId,
        content: data.content,
        images: data.images
          ? {
              create: { url: data.images },
            }
          : undefined,
      },
      include: commentInclude,
    });

    return comment as CommentWithRelations;
  },

  async softDelete(id: string): Promise<{ id: string } | null> {
    try {
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const deletedComment = await tx.comment.update({
          where: { id, deletedAt: null },
          data: { deletedAt: new Date() },
          select: { id: true },
        });

        await tx.comment.updateMany({
          where: { parentId: id, deletedAt: null },
          data: { deletedAt: new Date() },
        });

        return deletedComment;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },
};
