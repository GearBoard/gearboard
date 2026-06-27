import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth, requireAdmin } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import { getAllUsersQuerySchema, getUserByIdSchema, updateUserSchema } from "./user.schema.js";
import { userService } from "./user.service.js";

export const userRoute = new Hono<{ Variables: AppVariables }>();

userRoute.get("/me", requireAuth, async (c) => {
  const user = c.get("user");
  const data = await userService.getById(user.id, user.id, user.role);
  return c.json(successResponse(data), 200);
});

userRoute.get(
  "/",
  requireAuth,
  requireAdmin,
  zValidator("query", getAllUsersQuerySchema, validationHook),
  async (c) => {
    const query = c.req.valid("query");
    const result = await userService.getAll(query);
    return c.json(successResponse(result), 200);
  }
);

userRoute.get(
  "/:id",
  requireAuth,
  zValidator("param", getUserByIdSchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const data = await userService.getById(id, user.id, user.role);
    return c.json(successResponse(data), 200);
  }
);

userRoute.patch(
  "/:id",
  requireAuth,
  zValidator("param", getUserByIdSchema, validationHook),
  zValidator("json", updateUserSchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const result = await userService.update(id, body, user.id, user.role);
    return c.json(successResponse(result, 200, "User updated"), 200);
  }
);

userRoute.delete(
  "/:id",
  requireAuth,
  zValidator("param", getUserByIdSchema, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    await userService.delete(id, user.id, user.role);
    return c.json(successResponse(null, 200, "User deleted successfully"), 200);
  }
);
