import { UserRole } from "../../../generated/prisma/index.js";
export { UserRole };

export interface AuthenticatedUser {
  id: string;
  name: string;
  image: string | null;
  role: UserRole;
  email: string;
}

export type AppVariables = { user: AuthenticatedUser };
