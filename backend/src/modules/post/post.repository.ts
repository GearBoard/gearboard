import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";
import type { CreatePostRequestDto, UpdatePostRequestDto } from "./post.dto.js";
import type { PostWithRelations } from "./post.mapper.js";

const postInclude = {
  user: {
    select: {
      id: true,
      username: true,
      image: true,
    },
  },
  tags: {
    include: {
      tag: true,
    },
  },
  images: true,
};

export { postInclude };

export const postRepository = {
  async findById(id: string): Promise<PostWithRelations | null> {
    const post = await prisma.post.findUnique({
      where: { id, deletedAt: null },
      include: postInclude,
    });
    return post as PostWithRelations | null;
  },

  async findMany(options: {
    skip: number;
    take: number;
    search?: string;
    tagName?: string;
    userId?: string;
  }): Promise<{ posts: PostWithRelations[]; total: number }> {
    const { skip, take, search, tagName, userId } = options;

    const whereConditions: Prisma.PostWhereInput = { deletedAt: null };

    if (search) {
      whereConditions.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (tagName) {
      whereConditions.tags = {
        some: {
          tag: {
            name: {
              contains: tagName,
              mode: "insensitive",
            },
          },
        },
      };
    }

    if (userId) {
      whereConditions.userId = userId;
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: postInclude,
      }),
      prisma.post.count({
        where: whereConditions,
      }),
    ]);

    return {
      posts: posts as PostWithRelations[],
      total,
    };
  },

  async create(data: CreatePostRequestDto, userId: string): Promise<PostWithRelations> {
    const post = await prisma.post.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        tags: {
          create: data.tags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
        images: {
          create: data.images.map((url) => ({
            url,
          })),
        },
      },
      include: postInclude,
    });

    return post as PostWithRelations;
  },

  async update(id: string, data: UpdatePostRequestDto): Promise<PostWithRelations | null> {
    const updateData: Prisma.PostUpdateInput = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.isClosed !== undefined) updateData.isClosed = data.isClosed;

    try {
      return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        if (data.tags !== undefined) {
          await tx.postTag.deleteMany({
            where: { postId: id },
          });

          if (data.tags.length > 0) {
            await Promise.all(
              data.tags.map(async (tagName) => {
                await tx.postTag.create({
                  data: {
                    post: {
                      connect: { id },
                    },
                    tag: {
                      connectOrCreate: {
                        where: { name: tagName },
                        create: { name: tagName },
                      },
                    },
                  },
                });
              })
            );
          }
        }

        const updatedPost = await tx.post.update({
          where: { id, deletedAt: null },
          data: updateData,
          include: postInclude,
        });

        return updatedPost as PostWithRelations;
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },

  async softDelete(id: string): Promise<{ id: string } | null> {
    try {
      return await prisma.post.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
        select: { id: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },
};
