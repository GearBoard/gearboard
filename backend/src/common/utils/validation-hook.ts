import type { Context } from "hono";
import type { ZodError } from "zod";

export function validationHook(
  result: { success: boolean; error?: ZodError },
  c: Context
): Response | void {
  if (!result.success) {
    const message = result.error?.issues[0]?.message ?? "Validation error";
    return c.json({ success: false, statusCode: 400, message }, 400);
  }
}
