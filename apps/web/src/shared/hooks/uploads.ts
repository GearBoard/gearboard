import useSWRMutation from "swr/mutation";
import { client, unwrap } from "../libs/api-client";

export function useUploadAvatar() {
  return useSWRMutation("upload-avatar", async (_key: string, { arg }: { arg: File }) => {
    return unwrap(
      client.api.uploads.avatar.$post({
        form: { file: arg },
      })
    );
  });
}
