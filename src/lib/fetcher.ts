import { ApiError } from './errors';

/**
 * A strongly-typed generic wrapper for executing fetch requests.
 * Parses the response as JSON and handles HTTP errors by throwing an ApiError.
 *
 * @param url The full URL of the resource to fetch
 * @param options Standard RequestInit configurations for fetch
 * @returns A promise resolving to the typed resource T
 */
export async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        try {
          payload = await response.text();
        } catch {
          payload = null;
        }
      }
      throw new ApiError(response.status, response.statusText, payload);
    }

    if (response.status === 204) {
      return null as T;
    }

    const data = await response.json();
    console.log("DATA", data);
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Unknown connection error';
    throw new Error(`Fetch request failed: ${message}`);
  }
}
