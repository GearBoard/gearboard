import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./config/auth.js";
import { env } from "./config/env.js";
import { resolveHttpError } from "./common/utils/http-error.js";
import { postRoute } from "./modules/post/post.route.js";
import { commentRoute } from "./modules/comment/comment.route.js";
import { userRoute } from "./modules/user/user.route.js";

const app = new Hono();

app.use(
  cors({
    origin: env.BETTER_AUTH_TRUSTED_ORIGIN,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => c.text("Hello World!"));

app.route("/api/posts", postRoute);
app.route("/api/comments", commentRoute);
app.route("/api/users", userRoute);

app.onError((err, c) => {
  const { statusCode, message } = resolveHttpError(err);
  return c.json({ success: false, message }, statusCode as Parameters<typeof c.json>[1]);
});

export default app;
