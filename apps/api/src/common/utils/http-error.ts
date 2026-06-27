import { AppError } from "../errors/app-error.js";

export function resolveHttpError(error: unknown): { statusCode: number; message: string } {
  if (error instanceof AppError) {
    return { statusCode: error.statusCode, message: error.message };
  }
  console.error(error);
  return { statusCode: 500, message: "Internal server error" };
}
