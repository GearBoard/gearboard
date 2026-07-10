import { hc } from "hono/client";
import type { AppType } from "../../../../api/src/routes";

// Ensure fetch includes credentials so browser cookies (Better Auth session)
// are sent with API requests (e.g., GET /api/users/me, PATCH /api/users/:id).
// Hono's `hc` accepts an `init` option which is merged into `fetch` calls.
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, {
  init: { credentials: "include" },
});

export async function unwrap<T extends { data: unknown }>(
  resPromise: Promise<{ ok: boolean; json(): Promise<T> }>
): Promise<T["data"]> {
  const res = await resPromise;
  const body = await res.json();
  if (!res.ok)
    throw new Error((body as unknown as { message: string }).message ?? "Request failed");
  return body.data;
}
