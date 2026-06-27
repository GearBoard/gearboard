import { client } from "../libs/api-client";

async function unwrap<T>(resPromise: Promise<{ ok: boolean; json(): Promise<T> }>) {
  const res = await resPromise;
  const body = await res.json();
  if (!res.ok)
    throw new Error((body as unknown as { message: string }).message ?? "Request failed");
  return (body as { data: unknown }).data as T extends { data: infer D } ? D : never;
}

export const usersApi = {
  getMe: () => unwrap(client.api.users.me.$get()),

  getAll: (query?: {
    page?: string;
    limit?: string;
    search?: string;
    role?: "USER" | "ADMIN";
    departmentId?: string;
  }) => unwrap(client.api.users.$get({ query: query ?? {} })),

  getById: (id: string) => unwrap(client.api.users[":id"].$get({ param: { id } })),

  update: (
    id: string,
    data: {
      username?: string;
      name?: string;
      image?: string;
      description?: string;
      departmentId?: string | null;
    }
  ) => unwrap(client.api.users[":id"].$patch({ param: { id }, json: data })),

  delete: (id: string) => unwrap(client.api.users[":id"].$delete({ param: { id } })),
};
