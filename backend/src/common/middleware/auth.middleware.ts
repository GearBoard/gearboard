import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../../config/auth.js";
import { errorResponse } from "../utils/response.js";

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.user) {
    res.status(401).json(errorResponse("Unauthorized"));
    return;
  }

  (req as Request & { user: { id: bigint } }).user = {
    id: BigInt(session.user.id),
  };

  next();
}
