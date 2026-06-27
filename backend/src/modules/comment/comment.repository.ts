import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";

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

export type Comment = Prisma.CommentGetPayload<{ include: typeof commentInclude }>;

type CommentData = { content: string; images?: string | null };

export const commentRepository = {
  async findById(id: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({
      where: { id, deletedAt: null },
      include: commentInclude,
    });

    return comment as Comment | null;
  },

  async findManyByPostId(postId: string): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      where: { postId, parentId: null, deletedAt: null },
      include: commentInclude,
      orderBy: { createdAt: "desc" },
    });

    return comments as Comment[];
  },

  async create(userId: string, postId: string, data: CommentData): Promise<Comment> {
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

    return comment as Comment;
  },

  async createReply(
    userId: string,
    postId: string,
    parentId: string,
    data: CommentData
  ): Promise<Comment> {
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

    return comment as Comment;
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
