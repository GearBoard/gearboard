import { client } from "../libs/api-client";

async function unwrap<T>(resPromise: Promise<{ ok: boolean; json(): Promise<T> }>) {
  const res = await resPromise;
  const body = await res.json();
  if (!res.ok)
    throw new Error((body as unknown as { message: string }).message ?? "Request failed");
  return (body as { data: unknown }).data as T extends { data: infer D } ? D : never;
}

export const postsApi = {
  getById: (id: string) => unwrap(client.api.posts[":id"].$get({ param: { id } })),

  getAll: (query?: {
    page?: string;
    limit?: string;
    search?: string;
    tag?: string;
    userId?: string;
  }) => unwrap(client.api.posts.$get({ query: query ?? {} })),

  create: (data: { title: string; description: string; tags?: string[]; images?: string[] }) =>
    unwrap(client.api.posts.$post({ json: data })),

  update: (
    id: string,
    data: { title?: string; description?: string; tags?: string[]; isClosed?: boolean }
  ) => unwrap(client.api.posts[":id"].$patch({ param: { id }, json: data })),

  delete: (id: string) => unwrap(client.api.posts[":id"].$delete({ param: { id } })),

  getComments: (postId: string) =>
    unwrap(client.api.posts[":postId"].comments.$get({ param: { postId } })),

  createComment: (postId: string, data: { content: string; images?: string }) =>
    unwrap(client.api.posts[":postId"].comment.$post({ param: { postId }, json: data })),
};
