import useSWR from "swr";
import { client, unwrap } from "../libs/api-client";

export type TagOption = {
  id: string;
  name: string;
  color: string;
  backgroundColor: string;
};

export function useGetTags() {
  return useSWR("tags", () => unwrap(client.api.tags.$get()));
}
