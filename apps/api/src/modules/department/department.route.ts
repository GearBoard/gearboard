import { Hono } from "hono";
import type { AppVariables } from "../../common/types/index.js";
import { successResponse } from "../../common/utils/response.js";
import { getDepartmentsService } from "./service/get-departments.service.js";

export const departmentRoute = new Hono<{ Variables: AppVariables }>().get(
    "/",
    async (c) => {
        const departments = await getDepartmentsService();

        return c.json(
            successResponse(departments),
            200,
        );
    },
);