import type { Department } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";

export type { Department };

export const departmentRepository = {
    async findAll(): Promise<Department[]> {
        return prisma.department.findMany({
            orderBy: {
                name: "asc",
            },
        });
    },
};