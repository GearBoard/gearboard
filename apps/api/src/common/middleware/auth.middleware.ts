import { createMiddleware } from "hono/factory";
import { auth } from "../../config/auth.js";
import { userRepository } from "../../modules/user/user.repository.js";
import type { AppVariables } from "../types/index.js";

export const requireAuth = createMiddleware<{ Variables: AppVariables }>(async (c, next) => {
  // Debug: log incoming cookie header to help trace Unauthorized issues
  try {
    const incomingCookie = c.req.raw.headers.get("cookie");
    console.debug("requireAuth: incoming cookie:", incomingCookie);
  } catch (e) {
    console.debug("requireAuth: failed to read cookie header", e);
  }

  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.debug("requireAuth: better-auth session:", session ? "present" : "missing");

  if (!session?.user) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  const dbUser = await userRepository.findById(session.user.id);
  if (!dbUser) {
    return c.json({ success: false, message: "Unauthorized" }, 401);
  }

  c.set("user", {
    id: dbUser.id,
    name: dbUser.name,
    image: dbUser.image ?? null,
    role: dbUser.role,
    email: dbUser.email,
  });

  await next();
});

export const requireAdmin = createMiddleware<{ Variables: AppVariables }>(async (c, next) => {
  const user = c.get("user");
  if (user?.role !== "ADMIN") {
    return c.json({ success: false, message: "Forbidden" }, 403);
  }
  await next();
});
