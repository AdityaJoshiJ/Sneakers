/**
 * Custom error class representing an HTTP error returned by the API.
 */
export class ApiError extends Error {
  public status: number;
  public statusText: string;
  public payload: unknown;

  constructor(status: number, statusText: string, payload?: unknown) {
    super(`API Error ${status}: ${statusText || 'Unknown Error'}`);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.payload = payload;

    // Ensure correct prototype chain extension in ES5/TS environments
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Type guard to check if an unknown error is an instance of ApiError.
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
