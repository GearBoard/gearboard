import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppVariables } from "../../common/types/index.js";
import { requireAuth, requireAdmin } from "../../common/middleware/auth.middleware.js";
import { successResponse } from "../../common/utils/response.js";
import { validationHook } from "../../common/utils/validation-hook.js";
import {
  GetUserByIdParamsInputDTO,
  GetAllUsersQueryInputDTO,
  UpdateUserParamsInputDTO,
  UpdateUserBodyInputDTO,
  DeleteUserParamsInputDTO,
} from "./dto/index.js";
import {
  getMeService,
  getUserByIdService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
} from "./service/index.js";

export const userRoute = new Hono<{ Variables: AppVariables }>();

userRoute.get("/me", requireAuth, async (c) => {
  const user = c.get("user");
  const data = await getMeService(user.id);
  return c.json(successResponse(data), 200);
});

userRoute.get(
  "/",
  requireAuth,
  requireAdmin,
  zValidator("query", GetAllUsersQueryInputDTO, validationHook),
  async (c) => {
    const query = c.req.valid("query");
    const result = await getAllUsersService(query);
    return c.json(successResponse(result), 200);
  }
);

userRoute.get(
  "/:id",
  requireAuth,
  zValidator("param", GetUserByIdParamsInputDTO, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const data = await getUserByIdService(id, user.id, user.role);
    return c.json(successResponse(data), 200);
  }
);

userRoute.patch(
  "/:id",
  requireAuth,
  zValidator("param", UpdateUserParamsInputDTO, validationHook),
  zValidator("json", UpdateUserBodyInputDTO, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const result = await updateUserService(id, body, user.id, user.role);
    return c.json(successResponse(result, "User updated"), 200);
  }
);

userRoute.delete(
  "/:id",
  requireAuth,
  zValidator("param", DeleteUserParamsInputDTO, validationHook),
  async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");
    await deleteUserService(id, user.id, user.role);
    return c.json(successResponse(null, "User deleted successfully"), 200);
  }
);
