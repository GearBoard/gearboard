import { client } from "../libs/api-client";

async function unwrap<T>(resPromise: Promise<{ ok: boolean; json(): Promise<T> }>) {
  const res = await resPromise;
  const body = await res.json();
  if (!res.ok)
    throw new Error((body as unknown as { message: string }).message ?? "Request failed");
  return (body as { data: unknown }).data as T extends { data: infer D } ? D : never;
}

export const commentsApi = {
  createReply: (commentId: string, data: { content: string; images?: string }) =>
    unwrap(client.api.comments[":commentId"].replies.$post({ param: { commentId }, json: data })),

  delete: (commentId: string) =>
    unwrap(client.api.comments[":commentId"].$delete({ param: { commentId } })),
};
