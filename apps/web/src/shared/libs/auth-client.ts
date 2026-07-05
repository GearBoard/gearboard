import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../../../../api/src/config/auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL!,
  plugins: [inferAdditionalFields<typeof auth>()],
  fetchOptions: { credentials: "include" },
});

export const { useSession, signIn, signUp, signOut } = authClient;
