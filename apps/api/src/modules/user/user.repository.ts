import { Prisma } from "../../../generated/prisma/client.js";
import type { User } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";

type UpdateUserData = {
  username?: string;
  name?: string;
  image?: string | null;
  description?: string | null;
  departmentId?: string | null;
};

export const userRepository = {
  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { username, deletedAt: null } });
  },

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    return user;
  },

  async findMany(options: {
    skip: number;
    take: number;
    search?: string;
    role?: "USER" | "ADMIN";
    departmentId?: string;
  }): Promise<{ users: User[]; total: number }> {
    const { skip, take, search, role, departmentId } = options;

    const whereConditions: Prisma.UserWhereInput = { deletedAt: null };

    if (search) {
      whereConditions.OR = [
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      whereConditions.role = role;
    }

    if (departmentId) {
      whereConditions.departmentId = departmentId;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereConditions,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where: whereConditions }),
    ]);

    return { users, total };
  },

  async update(id: string, data: UpdateUserData): Promise<User> {
    const updateData: Prisma.UserUpdateInput = {};
    if (data.username !== undefined) updateData.username = data.username;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.departmentId !== undefined) {
      updateData.department =
        data.departmentId !== null ? { connect: { id: data.departmentId } } : { disconnect: true };
    }

    return prisma.user.update({
      where: { id, deletedAt: null },
      data: updateData,
    });
  },

  async softDelete(id: string): Promise<void> {
    await prisma.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  },
};
