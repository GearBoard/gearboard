import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";

const postInclude = {
  user: {
    select: {
      id: true,
      name: true,
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
export const bookmarkInclude = {
  post: {
    include: postInclude,
  },
} satisfies Prisma.BookmarkInclude;

export type Post = Prisma.PostGetPayload<{ include: typeof postInclude }>;
export type Bookmark = Prisma.BookmarkGetPayload<{ include: typeof bookmarkInclude }>;

type CreatePostData = {
  title: string;
  description: string;
  tags: string[];
  images: string[];
};

type UpdatePostData = {
  title?: string;
  description?: string;
  tags?: string[];
  isClosed?: boolean;
};

export const postRepository = {
  async findById(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: { id, deletedAt: null },
      include: postInclude,
    });
    return post as Post | null;
  },

  async findMany(options: {
    skip: number;
    take: number;
    search?: string;
    tagName?: string;
    userId?: string;
  }): Promise<{ posts: Post[]; total: number }> {
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
      posts: posts as Post[],
      total,
    };
  },

  async create(data: CreatePostData, userId: string): Promise<Post> {
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
                create: {
                  name: tagName,
                  color: "#000000",
                  backgroundColor: "#ffffff",
                },
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

    return post as Post;
  },

  async update(id: string, data: UpdatePostData): Promise<Post> {
    const updateData: Prisma.PostUpdateInput = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.isClosed !== undefined) updateData.isClosed = data.isClosed;

    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      if (data.tags !== undefined) {
        await tx.postTag.deleteMany({ where: { postId: id } });

        if (data.tags.length > 0) {
          await Promise.all(
            data.tags.map((tagName) =>
              tx.postTag.create({
                data: {
                  post: { connect: { id } },
                  tag: {
                    connectOrCreate: {
                      where: { name: tagName },
                      create: {
                        name: tagName,
                        color: "#000000",
                        backgroundColor: "#ffffff", //who have to edit it GOOD LUCK
                      },
                    },
                  },
                },
              })
            )
          );
        }
      }

      return tx.post.update({
        where: { id, deletedAt: null },
        data: updateData,
        include: postInclude,
      }) as Promise<Post>;
    });
  },

  async softDelete(id: string): Promise<void> {
    await prisma.post.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  },

  async isLiked(postId: string, userId: string): Promise<boolean> {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  },

  async likePost(postId: string, userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.like.create({
        data: {
          userId,
          postId,
        },
      }),
      prisma.post.update({
        where: {
          id: postId,
          deletedAt: null,
        },
        data: {
          likeCount: {
            increment: 1,
          },
        },
      }),
    ]);
  },

  async unlikePost(postId: string, userId: string): Promise<void> {
    await prisma.$transaction([
      prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      }),
      prisma.post.update({
        where: {
          id: postId,
          deletedAt: null,
        },
        data: {
          likeCount: {
            decrement: 1,
          },
        },
      }),
    ]);
  },

  async isSaved(postId: string, userId: string): Promise<boolean> {
    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!bookmark;
  },

  async savePost(postId: string, userId: string): Promise<void> {
    await prisma.bookmark.create({
      data: {
        userId,
        postId,
      },
    });
  },

  async unsavePost(postId: string, userId: string): Promise<void> {
    await prisma.bookmark.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  },

  async getSavedPosts(userId: string): Promise<Post[]> {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          include: postInclude,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return bookmarks.map((bookmark : Bookmark) => bookmark.post);
  },
};