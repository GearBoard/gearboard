import type { Context } from "hono";
import { AppError } from "../errors/app-error.js";

export function resolveHttpError(error: unknown): { statusCode: number; message: string } {
  if (error instanceof AppError) {
    return { statusCode: error.statusCode, message: error.message };
  }
  console.error(error);
  return { statusCode: 500, message: "Internal server error" };
}

export function handleHttpError(c: Context, error: unknown): Response {
  const { statusCode, message } = resolveHttpError(error);
  return c.json({ success: false, message }, statusCode as Parameters<typeof c.json>[1]);
}
