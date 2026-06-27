export type SuccessResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export function successResponse<T>(data: T, statusCode = 200, message = "OK"): SuccessResponse<T> {
  return { success: true, statusCode, message, data };
}

export function errorResponse(message: string, statusCode: number): ErrorResponse {
  return { success: false, statusCode, message };
}
