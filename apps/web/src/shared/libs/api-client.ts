import { hc } from "hono/client";
import type { AppType } from "../../../../api/src/routes";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);

export async function unwrap<T extends { data: unknown }>(
  resPromise: Promise<{ ok: boolean; json(): Promise<T> }>
): Promise<T["data"]> {
  const res = await resPromise;
  const body = await res.json();
  if (!res.ok)
    throw new Error((body as unknown as { message: string }).message ?? "Request failed");
  return body.data;
}
