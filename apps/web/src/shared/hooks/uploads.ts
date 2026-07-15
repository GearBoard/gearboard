import useSWRMutation from "swr/mutation";
import { client, unwrap } from "../libs/api-client";

export function useUploadImage() {
  return useSWRMutation("upload-image", (_key: string, { arg }: { arg: File }) =>
    unwrap(client.api.uploads.images.$post({ form: { file: arg } }))
  );
}
