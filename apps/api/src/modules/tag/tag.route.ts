import { Hono } from "hono";
import type { AppVariables } from "../../common/types/index.js";
import { successResponse } from "../../common/utils/response.js";
import { getTagsService } from "./service/get-tags.service.js";

export const tagRoute = new Hono<{ Variables: AppVariables }>().get(
  "/",
  async (c) => {
    const tags = await getTagsService();

    return c.json(successResponse(tags), 200);
  },
);
