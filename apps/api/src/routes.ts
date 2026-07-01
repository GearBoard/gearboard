import { Hono } from "hono";
import { postRoute } from "./modules/post/post.route.js";
import { commentRoute } from "./modules/comment/comment.route.js";
import { userRoute } from "./modules/user/user.route.js";
import { departmentRoute } from "./modules/department/department.route.js";

export const apiRoutes = new Hono()
  .route("/api/posts", postRoute)
  .route("/api/comments", commentRoute)
  .route("/api/users", userRoute)
  .route("/api/departments", departmentRoute);

export type AppType = typeof apiRoutes;
