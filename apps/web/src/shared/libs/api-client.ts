import { hc } from "hono/client";
import type { AppType } from "../../../../api/src/routes";

// Ensure fetch includes credentials so browser cookies (Better Auth session)
// are sent with API requests (e.g., GET /api/users/me)
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!, {
  // Provide a fetch wrapper to ensure credentials are included with requests
  fetch: (input: string | URL | Request, init?: RequestInit) => {
    const initWithCreds = { ...(init ?? {}), credentials: "include" } as RequestInit;
    return fetch(input, initWithCreds);
  },
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
